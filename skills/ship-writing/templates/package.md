# Package : [Nom du package]

---
status: pending
current_scope: ~
---

## Vision

[Rappel du "quoi" et du "pourquoi" - extrait du PRD. Une ou deux phrases qui expliquent la valeur apportée par ce package.]

## Exigences couvertes

- REQ-F001 : [Description de l'exigence fonctionnelle]
- REQ-NF001 : [Description de l'exigence non-fonctionnelle]

---

## Scopes

### Scope 1 : [Nom du scope]

> [Description courte - ce que l'utilisateur peut faire après ce scope]

**Truths** (comportements observables) :
- [ ] L'utilisateur peut [action 1]
- [ ] Le système [comportement 1]

**Artifacts** (fichiers/composants) :
- `path/to/file1.ts` - [Description du rôle]
- `path/to/file2.ts` - [Description du rôle]

**Key links** (connexions critiques) :
- [Composant A] → [Composant B] : [Nature de la connexion]

---

### Scope 2 : [Nom du scope]

> [Description courte]

**Truths** :
- [ ] [Truth 1]
- [ ] [Truth 2]

**Artifacts** :
- `path/to/file.ts` - [Description]

**Key links** :
- [A] → [B] : [Nature]

---

## Not included

Ce qui est explicitement HORS PÉRIMÈTRE de ce package :

- [Fonctionnalité X] : sera dans le package Y
- [Aspect Z] : hors scope du projet
- [Optimisation W] : reportée à une phase ultérieure

---

## Dépendances

### Ce package dépend de :
- [Package X] : [Raison de la dépendance]

### Dépendants de ce package :
- [Package Y] : [Ce qu'il utilise de ce package]

---

_Généré par Shaper le [date]_
