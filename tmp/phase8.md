# Plan Détaillé - Phase 8 : Création du Verifier

## Résumé

Le Verifier vérifie l'implémentation d'un package contre ses critères de vérification. Il gère les vérifications automatiques et manuelles, et décide si le package est terminé ou doit retourner à l'executor.

---

## 1. Structure de l'agent `agents/ship-verifier.md`

### Frontmatter

```yaml
---
name: ship-verifier
description: "Vérifie l'implémentation d'un package contre ses critères de vérification."
model: opus
skills: ship-verifying, ship-writing
user-invocable: false
---
```

### Rôle

Casquettes : **QA** (qualité) + **Objectivité** (faits, pas opinions)

### Ce que l'agent fait

1. Lire le package.md (scope en cours)
2. Lire verification.md (critères à vérifier)
3. Pour chaque critère :
   - Si type=auto : exécuter la vérification (tests, linter, etc.)
   - Si type=manual : déclencher AskUserQuestion
4. Mettre à jour le statut de chaque critère dans verification.md
5. Mettre à jour le front-matter du package.md :
   - Tous passed → status: done
   - Au moins un failed → status: executing (retour à l'executor)
6. Produire un rapport synthétique

### Ce que l'agent ne fait PAS

- Corriger le code (remonte seulement)
- Interpréter subjectivement les critères
- Sauter des critères
- Modifier les critères définis

### Workflow

1. **Lecture des inputs** : package.md (status = executed), verification.md
2. **Tri des critères** : auto vs manual, blocking vs warning vs info
3. **Vérifications automatiques** : exécuter et enregistrer résultats
4. **Vérifications manuelles** : AskUserQuestion avec contexte clair
5. **Mise à jour des fichiers** : statuts, front-matter, rapport

### Logique de décision

```
Si TOUS les critères blocking = passed :
    Si TOUS les critères warning = passed :
        → status: done (succès complet)
    Sinon :
        → status: done + warnings dans rapport
Sinon :
    → status: executing (retour executor)
    → rapport avec failed criteria + diagnostic
```

---

## 2. Structure de la commande `commands/ship/verify.md`

### Frontmatter

```yaml
---
name: ship:verify
description: "Lance la vérification d'un package implémenté"
---
```

### Syntaxe

```
/ship:verify
```
Vérifie le package en cours (détecte via front-matter)

```
/ship:verify auth
```
Vérifie le package spécifié

### Prerequisites

- Le package doit être implémenté (status: executed)
- verification.md doit exister avec des critères

### Output

- verification.md mis à jour avec statuts
- package.md front-matter mis à jour
- Rapport de vérification affiché

---

## 3. Format du rapport de vérification

### Structure de verification.md

```markdown
# Vérification : [Nom du package]

## Scope : [Nom du scope]

### Critères de vérification

```yaml
criteria:
  - id: VER-001
    description: "Les tests unitaires passent"
    type: auto          # auto | manual
    level: blocking     # blocking | warning | info
    status: pending     # pending | passed | failed
    command: "pnpm test"
    result: null

  - id: VER-002
    description: "L'UI est conforme à la maquette"
    type: manual
    level: blocking
    status: pending
    context: "Comparer avec maquette Figma: [URL]"
    result: null
    user_response: null

  - id: VER-003
    description: "Le code coverage est > 80%"
    type: auto
    level: warning
    status: pending
    command: "pnpm coverage"
    threshold: 80
    result: null
```

---

## Rapport de vérification

**Scope** : [Nom du scope]
**Date** : [Date]
**Résultat global** : [PASS | FAIL | PASS_WITH_WARNINGS]

### Résumé

| Niveau | Total | Passed | Failed |
|--------|-------|--------|--------|
| Blocking | X | Y | Z |
| Warning | X | Y | Z |

### Passed

- [x] **VER-001** : Les tests unitaires passent

### Failed

- [ ] **VER-002** : L'UI est conforme à la maquette
  - **Action requise** : Corriger l'alignement

### Warnings

- [!] **VER-003** : Code coverage > 80% (78%)
```

---

## 4. Types de vérifications

### Vérifications automatiques (`type: auto`)

| Catégorie | Exemples | Commande type |
|-----------|----------|---------------|
| Tests | Unitaires, intégration, e2e | `pnpm test` |
| Linting | Code style | `pnpm lint` |
| Types | Type checking | `tsc --noEmit` |
| Build | Compilation | `pnpm build` |
| Coverage | Seuil de couverture | `pnpm coverage` |
| Security | Audit dependencies | `pnpm audit` |

### Vérifications manuelles (`type: manual`)

| Catégorie | Exemples | Contexte à fournir |
|-----------|----------|-------------------|
| UI/UX | Conformité maquette | URL maquette |
| Accessibilité | Navigation clavier | Instructions |
| Flow utilisateur | Parcours complet | Étapes |
| Edge cases | Comportements limites | Scénarios |

### Critères de choix

```
type: auto SI :
  - Résultat binaire (pass/fail)
  - Exécutable par commande
  - Ne dépend pas de jugement subjectif

type: manual SI :
  - Nécessite interprétation humaine
  - Concerne l'expérience utilisateur
  - Dépend du contexte visuel
```

### Niveaux de blocage

```
level: blocking
  - Échec = retour à l'executor
  - Le package ne peut pas être "done"

level: warning
  - Échec = note dans rapport
  - Le package peut être "done" avec warnings

level: info
  - Informatif seulement
  - Pas d'impact sur le status
```

---

## 5. Gestion des échecs et boucle de correction

### Flux

```
EXECUTOR (status: executed)
    │
    ▼
VERIFIER
    │
    ├── Vérifications auto
    ├── Vérifications manuelles (AskUserQuestion)
    │
    └── Décision
        │
        ├── Tous blocking PASS → status: done → FIN
        │
        └── Au moins 1 blocking FAIL
            │
            ▼
            status: executing
            RETOUR EXECUTOR (avec rapport)
```

### Comportement en cas d'échec

1. **Mise à jour package.md** :
   ```yaml
   ---
   status: executing
   current_scope: auth-login
   last_verification:
     date: 2024-01-21
     result: FAIL
     failed_criteria: [VER-003]
   ---
   ```

2. **Diagnostic dans verification.md** :
   - Critères qui ont échoué
   - Message d'erreur ou réponse utilisateur
   - Suggestion de correction

3. **Limite de tentatives** :
   ```yaml
   verification_attempts: 3
   max_attempts: 5
   ```
   Si atteint : alerter utilisateur, proposer options

### Message de retour à l'executor

```markdown
## Action requise : Correction

Le scope `auth-login` a échoué (tentative 2/5).

### Critères en échec

1. **VER-003** (blocking) : L'UI est conforme à la maquette
   - Problème : Bouton mal aligné sur mobile
   - Fichier probable : `src/components/LoginButton.tsx`

### Prochaine étape

L'executor doit corriger puis relancer `/ship:verify`.
```

---

## 6. Fichiers à créer

| Fichier | Description |
|---------|-------------|
| `agents/ship-verifier.md` | Agent principal |
| `commands/ship/verify.md` | Commande /ship:verify |
| `skills/ship-verifying/SKILL.md` | Skill avec guidelines |
| `skills/ship-verifying/templates/verification.md` | Template |

---

## 7. Dépendances

### Prérequis

- **Phase 6** (Shaper) : produit verification.md avec critères
- **Phase 7** (Executor) : met `status: executed`

### Impact sur autres phases

- **Phase 9** : Ajouter /ship:verify dans help
- **Phase 10** : Intégrer dans la boucle execute → verify
