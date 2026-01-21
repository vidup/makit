# Plan Détaillé - Phase 6 : Refactoring du Shaper existant

## Résumé

Le Shaper passe d'un rôle "tout-en-un" (research + stack + requirements) à un rôle focalisé : **planifier UN package en scopes indépendants avec critères de vérification**.

---

## 1. Analyse de l'agent actuel (v1)

### Rôle actuel
Prend un **brief** et produit :
- `research.md` - État de l'art
- `stack.md` - Choix techniques
- `requirements.md` - Exigences structurées

### Problèmes pour la v2
1. **Research** : fait en amont par le brainstormer
2. **Requirements** : viennent du specifier (niveau global)
3. **Stack** : fusionné dans `architecture.md` (fait par l'architect)
4. **Pas de scopes** : pas de découpage en livrables indépendants
5. **Pas de verification.md** : nouveau livrable en v2

---

## 2. Changements à apporter

### Inputs (AVANT vs APRÈS)

| AVANT (v1) | APRÈS (v2) |
|------------|------------|
| `.ship/brief.md` | `.ship/packages/mapping.md` |
| - | `.ship/prd.md` |
| - | `.ship/architecture.md` |
| - | `.ship/requirements.md` |

### Outputs (AVANT vs APRÈS)

| AVANT (v1) | APRÈS (v2) |
|------------|------------|
| `packages/<nom>/research.md` | **SUPPRIMÉ** |
| `packages/<nom>/stack.md` | **SUPPRIMÉ** |
| `packages/<nom>/requirements.md` | **SUPPRIMÉ** |
| `packages/index.md` | **SUPPRIMÉ** |
| - | `packages/<nom>/package.md` |
| - | `packages/<nom>/verification.md` |

### Responsabilités (AVANT vs APRÈS)

| AVANT (v1) | APRÈS (v2) |
|------------|------------|
| Lancer la research | **RETIRÉ** |
| Produire les requirements | **RETIRÉ** |
| Définir la stack | **RETIRÉ** |
| Découper en packages | **RETIRÉ** |
| - | **AJOUTÉ** : Définir les scopes d'UN package |
| - | **AJOUTÉ** : Générer les critères de vérification |
| - | **AJOUTÉ** : Expliciter le "not included" |

---

## 3. Nouvelle structure de l'agent

### Frontmatter

```yaml
---
name: ship-shaper
description: "Planifie UN package en scopes indépendants avec critères de vérification."
model: opus
skills: ship-shaping, ship-writing
user-invocable: false
---
```

### Rôle

Casquettes : **Product** (définir le "quoi") + **Tech** (planifier le "comment")

### Workflow v2

1. Lire le mapping.md pour identifier le package à shaper
2. Lire les inputs globaux (prd.md, architecture.md, requirements.md)
3. Extraire les exigences pertinentes pour CE package
4. Définir les scopes (livrables indépendants) - **validation utilisateur**
5. Pour chaque scope, définir les must-haves :
   - Truths : comportements observables
   - Artifacts : fichiers/composants
   - Key links : connexions critiques
6. Définir les critères de vérification
7. Expliciter ce qui est "not included"
8. Générer package.md et verification.md

### Règles

- **UN package à la fois** : relancer pour chaque package
- **Interactif pour les scopes** : validation humaine obligatoire
- **Ne s'arrête jamais** : tant que les deux fichiers ne sont pas écrits

---

## 4. Format du fichier package.md

```markdown
# Package : [Nom du package]

---
status: pending | shaping | shaped | executing | executed | verifying | done
current_scope: <nom-du-scope-en-cours>
---

## Vision

[Rappel du "quoi" et du "pourquoi" - extrait du PRD]

## Exigences couvertes

- REQ-F001 : [Description]
- REQ-F002 : [Description]

---

## Scopes

### Scope 1 : [Nom du scope]

> [Description courte - ce que l'utilisateur peut faire après ce scope]

**Truths** (comportements observables) :
- [ ] L'utilisateur peut [action 1]
- [ ] Le système [comportement 1]

**Artifacts** (fichiers/composants) :
- `path/to/file1.ts` - [Description]

**Key links** (connexions critiques) :
- [Composant A] → [Composant B] : [Nature]

---

### Scope 2 : [Nom du scope]

[Même structure]

---

## Not included

Ce qui est explicitement HORS PÉRIMÈTRE :

- [Fonctionnalité X] : sera dans le package Y
- [Aspect Z] : hors scope du projet

---

## Dépendances

### Ce package dépend de :
- [Package X] : [Raison]

### Dépendants de ce package :
- [Package Y] : [Raison]

---

_Généré par Shaper le [date]_
```

---

## 5. Format du fichier verification.md

```markdown
# Vérification : [Nom du package]

## Structure des critères

```yaml
criteria:
  - id: VER-001
    scope: scope-1
    description: "Description du critère"
    decision: auto | manual      # auto = vérifiable par l'agent
    blocking: blocking | warning | info
    status: pending | passed | failed
    notes: "Notes optionnelles"
```

---

## Critères par scope

### Scope 1 : [Nom du scope]

```yaml
criteria:
  - id: VER-S1-001
    scope: scope-1
    description: "[Critère fonctionnel 1]"
    decision: auto
    blocking: blocking
    status: pending

  - id: VER-S1-002
    scope: scope-1
    description: "[Critère UI - vérification manuelle]"
    decision: manual
    blocking: blocking
    status: pending
```

---

## Résumé des critères

| Scope | Total | Auto | Manual | Blocking | Status |
|-------|-------|------|--------|----------|--------|
| scope-1 | 2 | 1 | 1 | 2 | pending |

---

## Log de vérification

| Date | Scope | Critère | Result | Notes |
|------|-------|---------|--------|-------|
| - | - | - | - | - |

---

_Généré par Shaper le [date]_
```

---

## 6. Modifications des fichiers skills

### Fichiers à SUPPRIMER

- `skills/ship-shaping/templates/research.md`
- `skills/ship-shaping/templates/stack.md`
- `skills/ship-shaping/templates/requirements.md`

### Fichiers à CRÉER

- `skills/ship-shaping/templates/package.md`
- `skills/ship-shaping/templates/verification.md`

### Fichier à MODIFIER

- `skills/ship-shaping/SKILL.md` : nouveaux templates, principes, workflow

---

## 7. Modifications de la commande shape.md

1. Vérifier que mapping.md existe (au lieu de brief.md)
2. Vérifier que prd.md, architecture.md, requirements.md existent
3. Demander quel package shaper si non spécifié
4. Adapter les outputs attendus

---

## 8. Séquence d'implémentation

1. Créer les nouveaux templates : `package.md`, `verification.md`
2. Mettre à jour `SKILL.md` de ship-shaping
3. Modifier l'agent `ship-shaper.md`
4. Modifier la commande `shape.md`
5. Supprimer les anciens templates

---

## 9. Points d'attention

### Compatibilité avec les autres agents

- Le **splitter** produit un mapping.md compatible
- Le **executor** lit package.md
- Le **verifier** lit/met à jour verification.md

### Validation humaine

- Le découpage en scopes est CRITIQUE
- Les critères `manual` déclenchent des `AskUserQuestion`

### Front-matter YAML

- Le status dans package.md permet le tracking
- Le verifier met à jour ce status

---

## 10. Fichiers impactés

| Fichier | Action |
|---------|--------|
| `agents/ship-shaper.md` | Modifier |
| `commands/ship/shape.md` | Modifier |
| `skills/ship-shaping/SKILL.md` | Modifier |
| `skills/ship-shaping/templates/package.md` | Créer |
| `skills/ship-shaping/templates/verification.md` | Créer |
| `skills/ship-shaping/templates/research.md` | Supprimer |
| `skills/ship-shaping/templates/stack.md` | Supprimer |
| `skills/ship-shaping/templates/requirements.md` | Supprimer |
