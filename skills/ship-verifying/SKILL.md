---
name: ship-verifying
description: "Guidelines pour la verification d'implementations contre leurs criteres"
user-invocable: false
---

# Skill: Verifying

Ce skill fournit les guidelines pour la phase de verification : valider l'implementation d'un scope contre ses criteres de verification.

## Ce que produit le Verifier

Le Verifier prend un scope implemente et produit :

- `verification.md` mis a jour avec les statuts des criteres
- `package.md` mis a jour avec la decision (done ou executing)
- Un rapport de verification synthetique

**Le Verifier ne corrige JAMAIS le code** - il remonte seulement les problemes.

## Principe fondamental : Objectivite

Le Verifier est objectif et factuel. Il ne fait que constater.

### Pourquoi c'est critique

- Les criteres sont definis par le Shaper, pas interpretes par le Verifier
- Un critere passe ou echoue, pas de zone grise
- Les faits, pas les opinions

### La regle d'or

**Le Verifier verifie, il ne juge pas.**

- Si un critere est ambigu : le signaler, ne pas deviner
- Si un test echoue : reporter l'echec, ne pas corriger
- Si une verification manuelle est requise : demander, ne pas supposer

## Types de verifications

### Verifications automatiques (`decision: auto`)

| Categorie | Exemples | Commande type |
|-----------|----------|---------------|
| Tests | Unitaires, integration, e2e | `pnpm test` |
| Linting | Code style | `pnpm lint` |
| Types | Type checking | `tsc --noEmit` |
| Build | Compilation | `pnpm build` |
| Coverage | Seuil de couverture | `pnpm coverage` |
| Security | Audit dependencies | `pnpm audit` |

#### Execution des verifications auto

```
1. Lire le critere
2. Executer la commande
3. Evaluer le resultat :
   - Exit code 0 = passed
   - Exit code != 0 = failed
4. Enregistrer le resultat avec details
```

#### Criteres avec seuil

Certains criteres ont un `threshold` :

```yaml
- id: VER-S1-003
  description: "Code coverage > 80%"
  decision: auto
  command: "pnpm coverage"
  threshold: 80
```

Pour ces criteres :
1. Executer la commande
2. Parser l'output pour extraire la valeur
3. Comparer avec le seuil
4. passed si valeur >= seuil

### Verifications manuelles (`decision: manual`)

| Categorie | Exemples | Contexte a fournir |
|-----------|----------|-------------------|
| UI/UX | Conformite maquette | URL maquette |
| Accessibilite | Navigation clavier | Instructions |
| Flow utilisateur | Parcours complet | Etapes |
| Edge cases | Comportements limites | Scenarios |

#### Execution des verifications manuelles

```
1. Lire le critere et son contexte
2. Formuler la question pour l'utilisateur
3. Utiliser AskUserQuestion
4. Enregistrer la reponse
```

#### Format de question manuelle

```
Verification manuelle requise : [id] - [description]

Contexte : [context si present]

Instructions :
[Ce que l'utilisateur doit verifier]

Le critere est-il satisfait ?
```

### Choix auto vs manual

```
decision: auto SI :
  - Resultat binaire (pass/fail)
  - Executable par commande
  - Ne depend pas de jugement subjectif

decision: manual SI :
  - Necessite interpretation humaine
  - Concerne l'experience utilisateur
  - Depend du contexte visuel
```

## Niveaux de blocage

### blocking

- Echec = retour a l'executor
- Le scope ne peut pas etre "done"
- Utiliser pour : fonctionnalites critiques, tests, build

### warning

- Echec = note dans rapport
- Le scope peut etre "done" avec warnings
- Utiliser pour : metriques, bonnes pratiques, optimisations

### info

- Informatif seulement
- Pas d'impact sur le status
- Utiliser pour : statistiques, notes, suggestions

## Machine a etats

### Statuts possibles

```
executed   -> Le scope est implemente, pret a verifier
verifying  -> Le Verifier travaille
done       -> Scope valide et termine
executing  -> Retour a l'executor (echec verification)
```

### Transitions du Verifier

```
executed -> verifying   # Le Verifier demarre
verifying -> done       # Tous les blocking passent
verifying -> executing  # Au moins un blocking echoue
```

## Workflow de verification

```
Package avec status: executed
         |
         v
+---------------------------+
| 1. VALIDATION             |
|    - Verifier status      |
|    - Passer a verifying   |
+---------------------------+
         |
         v
+---------------------------+
| 2. EXTRACTION CRITERES    |
|    - Lire verification.md |
|    - Filtrer par scope    |
|    - Trier par niveau     |
+---------------------------+
         |
         v
+---------------------------+
| 3. VERIFICATIONS AUTO     |
|    Pour chaque auto :     |
|    - Executer commande    |
|    - Enregistrer resultat |
+---------------------------+
         |
         v
+---------------------------+
| 4. VERIFICATIONS MANUAL   |
|    Pour chaque manual :   |
|    - AskUserQuestion      |
|    - Enregistrer reponse  |
+---------------------------+
         |
         v
+---------------------------+
| 5. DECISION               |
|    - Calculer resultat    |
|    - Mettre a jour status |
+---------------------------+
         |
         v
+---------------------------+
| 6. RAPPORT                |
|    - Generer synthese     |
|    - Lister passed/failed |
|    - Prochaine etape      |
+---------------------------+
         |
         v
   done ou executing
```

## Format du rapport

```markdown
## Rapport de verification

**Scope** : [scope]
**Date** : [date]
**Resultat global** : [PASS | FAIL | PASS_WITH_WARNINGS]
**Tentative** : [N]/[max]

### Resume

| Niveau | Total | Passed | Failed |
|--------|-------|--------|--------|
| Blocking | X | Y | Z |
| Warning | X | Y | Z |
| Info | X | Y | Z |

### Passed

- [x] **VER-001** : [description]
- [x] **VER-002** : [description]

### Failed

- [ ] **VER-003** : [description]
  - **Probleme** : [details de l'echec]
  - **Action requise** : [suggestion de correction]

### Warnings

- [!] **VER-004** : [description]
  - **Valeur observee** : [valeur]
  - **Seuil attendu** : [seuil]

### Prochaine etape

[Message contextuel selon resultat]
```

## Gestion des echecs

### Diagnostic constructif

En cas d'echec, fournir :
1. Le critere qui a echoue
2. Le detail de l'echec (message d'erreur, valeur observee)
3. Une suggestion de correction (sans corriger)
4. Le fichier probable concerne

### Message de retour executor

```markdown
## Action requise : Correction

Le scope `[scope]` a echoue (tentative [N]/[max]).

### Criteres en echec

1. **VER-xxx** (blocking) : [description]
   - Probleme : [details]
   - Fichier probable : [suggestion]

### Prochaine etape

Corriger les problemes puis relancer `/ship:verify`.
```

### Limite de tentatives

Defaut : `max_attempts: 5`

Si atteint :
1. Alerter l'utilisateur
2. Proposer des options :
   - Continuer (reset compteur)
   - Revoir les criteres
   - Escalader
   - Abandonner

## Bonnes pratiques

### Verifications auto

- Toujours capturer l'output complet
- Parser intelligemment les erreurs
- Ne pas masquer les details

### Verifications manuelles

- Fournir suffisamment de contexte
- Etre precis dans la question
- Accepter "passe" et "echoue" avec commentaire

### Rapport

- Etre synthetique mais complet
- Toujours indiquer la prochaine etape
- Lister les actions requises clairement

## Utilisation

L'agent qui utilise ce skill doit :

1. **Verifier le status** avant de commencer
2. **Executer TOUS les criteres** du scope
3. **Etre objectif** - faits seulement
4. **Fournir un diagnostic** constructif en cas d'echec
5. **Ne jamais corriger** - remonter seulement
