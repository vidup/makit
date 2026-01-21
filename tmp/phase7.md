# Plan Détaillé - Phase 7 : Création de l'Executor

## Résumé

L'Executor implémente UN scope de package en respectant strictement les contraintes définies. C'est le gardien contre le scope creep.

---

## 1. Structure de l'agent `agents/ship-executor.md`

### Frontmatter

```yaml
---
name: ship-executor
description: "Exécute un scope de package en respectant strictement les contraintes définies."
model: opus
skills: ship-executing
user-invocable: false
---
```

### RÈGLE CRITIQUE : ANTI-SCOPE-CREEP

**Tu ne fais QUE ce qui est dans le scope courant. RIEN de plus.**

#### Ce que tu fais
- Implémenter les Truths (comportements observables) du scope courant
- Créer les Artifacts (fichiers/composants) listés dans le scope
- Établir les Key Links (connexions) spécifiées

#### Ce que tu ne fais JAMAIS
- Ajouter des fonctionnalités non listées, même si "ça serait mieux"
- Anticiper les besoins des scopes suivants
- Refactorer du code hors scope
- Implémenter des "améliorations" non demandées

#### Réponse à un scope creep demandé par l'utilisateur
1. Rappelle poliment que c'est hors scope
2. Cite la section "Not included" du package.md
3. Suggère d'ajouter ça dans un scope futur
4. Continue sur le scope courant

### Rôle

Casquettes : **Tech** (implémentation) + **QA** (auto-vérification)

### Inputs

- `.ship/packages/<nom>/package.md` : Document central avec les scopes
- `.ship/packages/<nom>/verification.md` : Critères de vérification
- `.ship/architecture.md` : Structure technique globale
- `.ship/requirements.md` : Exigences globales (référence)
- Codebase existante

### Outputs

- Code implémenté selon le scope
- Front-matter du package.md mis à jour (status: executing → executed)

### Workflow

1. **Lecture et validation** : Lire package.md, vérifier status = `shaped` ou `executing`
2. **Mise à jour du status** : `status: executing`
3. **Extraction du scope** : Truths, Artifacts, Key Links
4. **Vérification des prérequis** : Scopes précédents complétés ?
5. **Implémentation** : Créer/modifier les fichiers
6. **Auto-vérification** : Vérifier chaque Truth, Artifact, Key Link
7. **Mise à jour finale** : `status: executed`

---

## 2. Structure de la commande `commands/ship/execute.md`

### Frontmatter

```yaml
---
name: ship:execute
description: "Lance l'exécution d'un scope de package"
---
```

### Syntaxe

```
/ship:execute
```
Exécute le scope courant du package actif

```
/ship:execute .ship/packages/auth/package.md
```
Exécute le scope courant du package spécifié

```
/ship:execute .ship/packages/auth/package.md scope-2
```
Exécute un scope spécifique

### Détection du package actif

Si aucun package n'est spécifié :
1. Chercher les packages avec status `shaped` ou `executing`
2. Si un seul : l'utiliser
3. Si plusieurs : demander à l'utilisateur
4. Si aucun : suggérer /ship:shape

### Prerequisites

- Un package avec status `shaped`
- `current_scope` défini
- Scopes précédents complétés

---

## 3. Gestion du front-matter

### Structure cible

```yaml
---
status: pending | shaping | shaped | executing | executed | verifying | done
current_scope: scope-1
scopes_completed:
  - scope-0
---
```

### Machine à états

```
pending → shaping (shaper commence)
shaping → shaped (shaper termine)
shaped → executing (executor commence)
executing → executed (executor termine)
executed → verifying (verifier commence)
verifying → done (verifier valide)
verifying → executing (verifier échoue, retour executor)
```

### Transitions valides pour l'Executor

- `shaped` → `executing` : OK (démarrage)
- `executing` → `executed` : OK (fin)
- Autres : Refuser et alerter

---

## 4. Mécanisme anti-scope-creep

### Validation stricte des actions

Avant chaque action, l'executor doit :
1. Vérifier que l'action correspond à un Artifact listé
2. Vérifier que le comportement correspond à un Truth listé
3. Si ni l'un ni l'autre : **REFUSER**

### Checklist de scope

Au début de l'exécution :

```markdown
## Scope en cours : scope-1

### Truths (à vérifier)
- [ ] L'utilisateur peut se connecter avec email/password
- [ ] L'utilisateur voit un message d'erreur si credentials invalides

### Artifacts (à créer/modifier)
- [ ] src/auth/login.ts
- [ ] src/components/LoginForm.tsx

### Key Links
- [ ] LoginForm → authService.login()
```

### Réponse aux demandes hors scope

Template :

```
Cette demande est hors du scope actuel (scope-1).

**Ce qui est dans le scope actuel :**
- [Liste des Truths]

**Ce qui est explicitement exclus (Not Included) :**
- [Cite la section Not Included du package.md]

**Options :**
1. Continuer avec le scope actuel
2. Ajouter cette demande comme nouveau scope
3. Créer un nouveau package dédié

Que souhaites-tu faire ?
```

### Détection proactive

Détecter les demandes implicites de scope creep :
- "Tant qu'on y est, pourrait-on aussi..."
- "Il serait bien d'ajouter..."
- "On pourrait améliorer..."

→ Réponse automatique : rappel du scope + options

---

## 5. Interaction avec les autres agents

### Flux

```
SHAPER
   |
   v
package.md (status: shaped)
   |
   v
EXECUTOR ←────────────────┐
(status: executing→executed)  │
   |                          │
   v                          │ (si échec)
VERIFIER ─────────────────────┘
(status: verifying→done)
```

### Dépendances avec Phase 6 (Shaper)

L'executor attend du shaper un `package.md` avec :
1. Front-matter valide (`status: shaped`, `current_scope` défini)
2. Scopes avec Truths, Artifacts, Key Links
3. Section "Not Included" explicite

### Dépendances avec Phase 8 (Verifier)

L'executor prépare pour le verifier :
1. Front-matter à jour (`status: executed`)
2. Code implémenté prêt à vérifier
3. Tous les Artifacts créés

---

## 6. Tests de validation

### Test 1 : Exécution basique
1. Créer un package.md avec un scope simple
2. Lancer `/ship:execute`
3. Vérifier : code implémenté, front-matter mis à jour

### Test 2 : Anti-scope-creep
1. Pendant l'exécution, demander une fonctionnalité hors scope
2. Vérifier : l'executor refuse poliment et rappelle le scope

### Test 3 : Transition de status
1. Essayer d'exécuter un package avec `status: pending`
2. Vérifier : l'executor refuse

### Test 4 : Prérequis de scope
1. Essayer d'exécuter scope-2 sans scope-1 complété
2. Vérifier : l'executor détecte et alerte

---

## 7. Fichiers à créer

| Fichier | Description |
|---------|-------------|
| `agents/ship-executor.md` | Agent principal |
| `commands/ship/execute.md` | Commande /ship:execute |
| `skills/ship-executing/SKILL.md` | Skill (optionnel) |
