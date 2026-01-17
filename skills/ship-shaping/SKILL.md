---
name: ship-shaping
description: "Templates et guidelines pour le shaping de packages Shape Up"
user-invocable: false
---

# Skill: Shaping

Ce skill fournit les templates et guidelines pour la phase de shaping : transformer un brief en research, stack et requirements qui serviront de base au Planner.

## Ce que produit le Shaper

Le Shaper prépare le terrain pour le Planner. Il produit :

```
.ship/packages/<nom-package>/
├── research.md      # État de l'art, do's/don'ts, insights
├── stack.md         # Décisions techniques, justifications
└── requirements.md  # Exigences fonctionnelles et non-fonctionnelles
```

**Le Planner viendra ensuite** découper les requirements en scopes exécutables.

## Templates disponibles

| Template | Description | Fichier |
|----------|-------------|---------|
| **Research** | Recherche technique et fonctionnelle | [research.md](templates/research.md) |
| **Stack** | Choix de stack et justifications | [stack.md](templates/stack.md) |
| **Requirements** | Exigences structurées | [requirements.md](templates/requirements.md) |

## Principes de shaping

### 1. Délimité (Bounded)

Le périmètre du package a des **frontières claires** :
- On sait ce qui est inclus
- On sait ce qui est exclu (out of scope)

### 2. Évalué (Evaluated)

Les **risques et la faisabilité** sont identifiés :
- Les rabbit holes potentiels sont listés
- Les dépendances externes sont identifiées
- Les zones d'incertitude sont explicites

### 3. Flexible (Flexible)

On définit le **"quoi"** pas le **"comment"** :
- Les requirements décrivent le besoin, pas la solution
- L'implémentation reste libre pour le Planner/Executor
- On laisse de la place à l'adaptation

## Bonnes pratiques

### Pour la research

- Chercher l'état de l'art avant de décider
- Lister les solutions existantes avec leurs pros/cons
- Identifier les patterns et anti-patterns du domaine
- Ne pas ignorer la concurrence

### Pour la stack

- Justifier chaque choix technique
- Préférer les technologies déjà présentes dans le projet
- Évaluer les risques d'intégration
- Considérer la maintenabilité long-terme

### Pour les requirements

- Utiliser des checkboxes pour faciliter le suivi
- Séparer fonctionnel / non-fonctionnel / contraintes
- Prioriser avec Must / Should / Nice-to-have
- Garder trace des questions résolues et ouvertes

## Workflow de shaping

```
Brief
  │
  ▼
┌─────────────────────────────────────────┐
│ 1. DÉCOUPAGE                            │
│    Un brief = 1 ou N packages           │
│    Validation utilisateur               │
└─────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────┐
│ 2. RESEARCH (autonome)                  │
│    WebSearch + exploration codebase     │
│    → research.md + stack.md             │
└─────────────────────────────────────────┘
  │
  ▼
┌─────────────────────────────────────────┐
│ 3. REQUIREMENTS (interactif)            │
│    Questions basées sur la research     │
│    → requirements.md                    │
└─────────────────────────────────────────┘
  │
  ▼
Prêt pour le Planner
```

## Utilisation

L'agent qui utilise ce skill peut :

1. **Lire les templates** pour structurer ses outputs
2. **Appliquer les principes** pour valider la qualité du shaping
3. **Suivre le workflow** pour ne rien oublier
4. **Référencer les bonnes pratiques** pour guider ses décisions
