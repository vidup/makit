# Plan Détaillé - Phase 10 : Création de la commande flow

## Résumé

La commande `/ship:flow` orchestre le workflow complet avec validation humaine entre chaque étape.

### Flow v2 cible
```
brainstorm → prd → specify → architect → split → shape → execute → verify
```

### Fichiers .ship/ à détecter
```
.ship/
  brief.md              # Output brainstorm
  research.md           # Output brainstorm (optionnel)
  prd.md                # Output prd
  requirements.md       # Output specify
  architecture.md       # Output architect (ou fourni)
  packages/
    mapping.md          # Output split
    <nom>/
      package.md        # Output shape (avec front-matter status)
      verification.md   # Output shape + verify
```

---

## 1. Structure de la commande flow

```markdown
---
name: ship:flow
description: "Orchestre le workflow complet ou reprend là où on en était"
---

# Commande flow

Orchestre le workflow ship complet avec validation humaine entre chaque étape.

## Instructions

1. Détecter l'état actuel du projet
2. Proposer l'étape suivante (ou demander confirmation)
3. Exécuter l'étape via le sous-agent approprié
4. Répéter jusqu'à completion ou interruption utilisateur
```

---

## 2. Détection de l'état actuel

### Matrice de détection

| Fichier | Existe | Front-matter status | Étape complétée |
|---------|--------|---------------------|-----------------|
| `.ship/brief.md` | oui | - | brainstorm |
| `.ship/prd.md` | oui | - | prd |
| `.ship/requirements.md` | oui | - | specify |
| `.ship/architecture.md` | oui | - | architect |
| `.ship/packages/mapping.md` | oui | - | split |
| `.ship/packages/<nom>/package.md` | oui | `status: shaped` | shape |
| `.ship/packages/<nom>/package.md` | oui | `status: executed` | execute |
| `.ship/packages/<nom>/package.md` | oui | `status: done` | verify |

### Algorithme de détection

```
1. Vérifier .ship/ existe
2. Pour chaque fichier du flow (dans l'ordre inverse) :
   - Si le fichier n'existe pas : étape précédente est la dernière complète
3. Pour les packages :
   - Lire le front-matter de chaque package.md
   - Identifier le package en cours selon son status
4. Retourner : { etape_courante, packages_status, next_step }
```

### Front-matter package.md

```yaml
---
status: pending | shaping | shaped | executing | executed | verifying | done
current_scope: <nom-du-scope>
---
```

---

## 3. Gestion des transitions

### Mapping étapes → agents

| Étape | Agent | Output |
|-------|-------|--------|
| brainstorm | ship-brainstormer | brief.md |
| prd | ship-brainstormer-prd | prd.md |
| specify | ship-specifier | requirements.md |
| architect | ship-architect | architecture.md |
| split | ship-splitter | mapping.md |
| shape | ship-shaper | package.md |
| execute | ship-executor | code |
| verify | ship-verifier | verification.md |

### Logique de transition

```
function getNextStep(state):
    if not exists(.ship/brief.md):
        return 'brainstorm'
    if not exists(.ship/prd.md):
        return 'prd'
    if not exists(.ship/requirements.md):
        return 'specify'
    if not exists(.ship/architecture.md):
        return 'architect' # peut être skippé
    if not exists(.ship/packages/mapping.md):
        return 'split'

    # Phase packages : boucle shape → execute → verify
    for package in getPackages():
        if package.status == 'pending':
            return 'shape:' + package.name
        if package.status == 'shaped':
            return 'execute:' + package.name
        if package.status == 'executed':
            return 'verify:' + package.name

    return 'complete'
```

### Validation humaine entre étapes

Format de la question de transition :

```
L'étape [X] est complète.

Résumé :
- [points clés produits]

Prochaine étape recommandée : [Y]

Options :
1. Continuer avec [Y]
2. Skip [Y] (j'ai déjà le fichier ou je le fournis)
3. Arrêter ici (je reprendrai plus tard)
4. Choisir une autre étape
```

---

## 4. Skip d'étapes

### Étapes skippables

| Étape | Skippable | Condition | Action si skip |
|-------|-----------|-----------|----------------|
| brainstorm | oui | brief.md existe | vérifier format minimal |
| prd | oui | prd.md existe | vérifier format minimal |
| specify | oui | requirements.md existe | vérifier format minimal |
| architect | oui | dev fournit l'archi | demander le fichier |
| split | oui | mapping.md existe | vérifier format minimal |
| shape | oui | package.md existe | vérifier format minimal |
| execute | non | - | - |
| verify | non | - | - |

### Formats de validation minimaux

| Fichier | Validation minimale |
|---------|---------------------|
| brief.md | Sections "L'idée en une phrase", "Contexte", "Objectifs" |
| prd.md | Au moins une fonctionnalité décrite |
| requirements.md | Au moins un REQ-* identifié |
| architecture.md | Sections "Vue d'ensemble", "Composants" |
| mapping.md | Au moins un package défini |
| package.md | Front-matter avec status, Section "Scopes" |

---

## 5. Interactions utilisateur

### Début de session

```
"Je détecte l'état suivant :
- [fichiers existants]
- [packages et leurs status]

Voulez-vous :
1. Reprendre depuis [next_step]
2. Recommencer depuis [étape]
3. Voir le détail du status"
```

### Après chaque étape

```
"[Étape X] terminée.

Résumé :
- [outputs produits]
- [décisions prises]

Prochaine étape : [Y]
Voulez-vous continuer ?"
```

### Choix de package

```
"Packages détectés dans mapping.md :
1. auth (status: pending)
2. dashboard (status: pending)

Lequel voulez-vous traiter en premier ?"
```

### Fin de flow

```
"Tous les packages sont terminés !

Résumé du projet :
- [X] packages implémentés
- [Y] scopes vérifiés

Le projet ship est complet. Bravo !"
```

---

## 6. Exemple de session

```
Utilisateur: /ship:flow

Flow: "Je détecte :
- brief.md existe (brainstorm fait)
- prd.md existe (prd fait)
- requirements.md n'existe pas

Prochaine étape : specify (créer requirements.md)
Continuer ? [Oui/Skip/Stop]"

Utilisateur: "Oui"

Flow: [Lance ship-specifier via Task]
...
"Specify terminé. requirements.md créé.

Prochaine étape : architect
Continuer ? [Oui/Skip/Stop]"

Utilisateur: "Skip, j'ai déjà l'archi"

Flow: "OK, je vérifie architecture.md...
Format valide.

Prochaine étape : split
Continuer ?"
```

---

## 7. Challenges et solutions

### Cohérence des front-matter

**Problème** : Les agents doivent tous écrire/lire le front-matter de manière cohérente.

**Solution** : Définir clairement dans chaque agent le format exact et les transitions autorisées.

### Gestion des erreurs

**Problème** : Que faire si un agent échoue en cours d'étape ?

**Solution** :
- Le front-matter garde le status "in_progress"
- Le flow détecte cet état et propose de reprendre ou recommencer

### Packages multiples

**Problème** : Quand plusieurs packages existent, l'ordre et le parallélisme.

**Solution** :
- L'utilisateur choisit l'ordre via les questions du flow
- Un seul package à la fois (pas de parallélisme)
- Le mapping.md suggère un ordre, mais l'utilisateur décide

### Reprise après interruption

**Problème** : L'utilisateur ferme la session en cours d'étape.

**Solution** :
- Les fichiers intermédiaires persistent (.ship/)
- Le front-matter marque l'état en cours
- Au relancement, flow détecte et propose de reprendre

---

## 8. Dépendances

La commande flow dépend de toutes les phases précédentes (agents 2-8) et doit être cohérente avec la commande status (Phase 9).

## 9. Fichiers à créer/modifier

| Fichier | Action |
|---------|--------|
| `commands/ship/flow.md` | Créer |
| `commands/ship/status.md` | Modifier pour partager la logique de détection |
