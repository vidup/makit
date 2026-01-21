# Phase 2 : Création du Brainstormer PRD

> Transformer un brief en Product Requirements Document (PRD) via une session interactive.

---

## 1. Structure de l'agent

### Fichier : `agents/ship-brainstormer-prd.md`

### Frontmatter

```yaml
---
name: ship-brainstormer-prd
description: "Transforme un brief en PRD structuré via une session interactive."
model: opus
skills: ship-writing
user-invocable: false
---
```

### Sections principales

1. **Règle d'autonomie** : 100% autonome, ne s'arrête que quand `prd.md` est écrit
2. **Règle de regroupement des questions** : Max 4 questions simultanées
3. **Rôle** : Casquette **Product** (comprendre le besoin, détailler les fonctionnalités)

### Ce que l'agent fait

1. Lire le brief (`.ship/brief.md`)
2. Lire la research si elle existe (`.ship/research.md`)
3. Analyser les "Premières idées / Directions" du brief
4. Analyser les "Questions ouvertes" du brief
5. Poser des questions pour clarifier et approfondir
6. Creuser chaque fonctionnalité identifiée
7. Produire un PRD structuré

### Ce que l'agent ne fait PAS

- Parler de technique/code/architecture (c'est pour l'Architect)
- Produire des specs techniques
- Décider à la place de l'utilisateur
- Définir des exigences non-fonctionnelles (c'est pour le Specifier)

### Workflow

1. **Lecture du brief** : noter idée, objectifs, utilisateurs, contraintes, directions, questions ouvertes
2. **Lecture de la research** (si présente) : noter état de l'art, do's/don'ts, références
3. **Résoudre les questions ouvertes** : poser les questions du brief via `AskUserQuestion`
4. **Creuser les fonctionnalités** : pour chaque direction, clarifier définition, utilisateur, valeur, comportement, edge cases, priorité
5. **Identifier les fonctionnalités manquantes** : proposer des compléments, demander validation
6. **Produire le PRD** : générer `.ship/prd.md`

---

## 2. Structure de la commande

### Fichier : `commands/ship/prd.md`

### Frontmatter

```yaml
---
name: ship:prd
description: "Transforme un brief en PRD structuré"
---
```

### Syntaxe

```
/ship:prd
```

### Prerequisites

- Un brief doit exister (`.ship/brief.md`)
- Si aucun brief n'existe, suggérer `/ship:brainstorm`

### Output

`.ship/prd.md`

### Étape suivante

`/ship:specify` pour transformer le PRD en exigences techniques (SRS)

---

## 3. Format du fichier prd.md

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

| Persona | Description | Besoin principal |
|---------|-------------|------------------|
| [Persona 1] | [Description] | [Besoin] |

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

| # | Question | Réponse | Source |
|---|----------|---------|--------|
| Q1 | [Question du brief] | [Réponse obtenue] | Discussion PRD |

---

## Questions ouvertes (à résoudre par le Specifier/Architect)

- [Question technique à approfondir]

---

_Généré par Brainstormer PRD le [date]_
_Basé sur : `.ship/brief.md`_
```

---

## 4. Questions types à poser

### Clarification des features

- "Tu mentionnes [feature X] - peux-tu me décrire concrètement ce que l'utilisateur fait avec ?"
- "Pour [feature X], quelles sont les limites ? Qu'est-ce qu'elle ne fait PAS ?"
- "Il y a plusieurs façons de faire [feature X]. Tu vois ça plutôt comme [option A] ou [option B] ?"

### Comportements et edge cases

- "Quel est le parcours typique d'un utilisateur avec [feature X] ?"
- "Que se passe-t-il si [cas d'erreur] ?"
- "Y a-t-il des limites (nombre, taille, fréquence) pour [feature X] ?"

### Priorités

- "Si tu devais lancer demain avec une seule feature, ce serait laquelle ?"
- "Entre [feature A] et [feature B], laquelle est la plus importante ?"
- "Y a-t-il des features qui seraient bien mais pas essentielles au lancement ?"

### Utilisateurs

- "Tu mentionnes [type d'utilisateur] - peux-tu me décrire un utilisateur typique ?"
- "Dans quel contexte [persona] utilise [feature] ?"

### Regroupement type (exemple)

```
AskUserQuestion avec 3 questions :
1. "Tu mentionnes [feature X]. Concrètement, comment l'utilisateur interagit avec ?"
2. "Pour cette feature, quels sont les cas d'erreur possibles ?"
3. "C'est une feature essentielle au lancement ou plutôt un 'nice-to-have' ?"
```

---

## 5. Critères de complétion du PRD

### Le PRD est COMPLET quand :

| Critère | Vérification |
|---------|--------------|
| Toutes les questions ouvertes du brief sont résolues | Section "Questions résolues" remplie |
| Chaque direction du brief est devenue une feature | Pas de "première idée" non traitée |
| Chaque feature a un comportement clé documenté | Au moins 2-3 comportements par feature |
| Les priorités sont définies | Chaque feature a Must/Should/Nice-to-have |
| Le hors scope est explicite | Section "Hors scope" non vide |
| Les personas sont identifiés | Tableau des utilisateurs rempli |

### Checklist avant validation

- [ ] Toutes les "Questions ouvertes" du brief ont une réponse
- [ ] Chaque "Première direction" du brief est devenue une feature
- [ ] Chaque feature a : description, utilisateur, valeur, comportements, priorité
- [ ] Le hors scope est documenté
- [ ] Le fichier est enregistré dans `.ship/prd.md`

---

## 6. Dépendances

### Inputs

- `.ship/brief.md` (OBLIGATOIRE)
- `.ship/research.md` (optionnel, enrichit les questions)

### Output

- `.ship/prd.md`

### Étape précédente

- Phase 1 : Brainstormer

### Étape suivante

- Phase 3 : Specifier

---

## 7. Points d'attention

### Pas de skill dédié

Le Brainstormer PRD n'a pas besoin de skill dédié car :
- Il n'utilise pas de techniques spécifiques (contrairement au brainstormer)
- Il suit une méthodologie linéaire
- Le skill `ship-writing` suffit

### Gestion de la research optionnelle

1. Vérifier si `.ship/research.md` existe
2. Si oui : l'intégrer dans les questions ("La research montre que... qu'en penses-tu ?")
3. Si non : continuer sans, le PRD reste valide

### Transition avec le Specifier

Le PRD doit faciliter le travail du Specifier :
- Les comportements clés → exigences fonctionnelles
- Les priorités → conservées (Must/Should/Nice-to-have)
- Les contraintes → reprises et enrichies
- Les questions ouvertes techniques → transmises

---

## 8. Fichiers à créer

| Fichier | Description |
|---------|-------------|
| `agents/ship-brainstormer-prd.md` | Agent principal |
| `commands/ship/prd.md` | Commande /ship:prd |
