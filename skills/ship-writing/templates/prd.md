# Template : PRD (Product Requirements Document)

> Output du Brainstormer PRD - Input du Specifier

**Chemin** : `.ship/prd.md`

---

```markdown
# PRD : [Nom du projet]

> [L'idée en une phrase - reprise du brief]

---

## Vue d'ensemble

### Problème

[Description du problème que le produit résout]

### Solution

[Description de la solution proposée - vision produit]

### Objectifs

- [Objectif 1 - mesurable si possible]
- [Objectif 2]

### Utilisateurs cibles

| Persona     | Description   | Besoin principal |
| ----------- | ------------- | ---------------- |
| [Persona 1] | [Description] | [Besoin]         |

---

## Fonctionnalités

### [Feature 1 : Nom descriptif]

**Description** : [Ce que fait cette feature]

**Utilisateur** : [Qui l'utilise et dans quel contexte]

**Valeur** : [Pourquoi cette feature, quelle valeur]

**Comportements clés** :

- L'utilisateur peut [action 1]
- Quand [condition], le système [réaction]

**Edge cases** :

- Si [cas limite], alors [comportement]

**Priorité** : Must / Should / Nice-to-have

---

## Hors scope (explicite)

- [Fonctionnalité exclue 1]
- [Fonctionnalité exclue 2]

---

## Contraintes connues

- [Contrainte 1]
- [Contrainte 2]

---

## Questions résolues

| #   | Question            | Réponse           | Source         |
| --- | ------------------- | ----------------- | -------------- |
| Q1  | [Question du brief] | [Réponse obtenue] | Discussion PRD |

---

## Questions ouvertes (à résoudre par le Specifier/Architect)

- [Question technique à approfondir]

---

_Généré par Brainstormer PRD le [date]_
_Basé sur : `.ship/brief.md`_
```
