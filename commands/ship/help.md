---
name: ship:help
description: "Affiche la liste des commandes ship disponibles"
---

# Commandes ship

Affiche cette aide pour l'utilisateur.

## Commandes disponibles

| Commande | Description |
|----------|-------------|
| `/ship:help` | Affiche cette aide |
| `/ship:brainstorm` | Lance une session de brainstorming interactive |
| `/ship:shape` | Lance le shaping d'un brief en packages Shape Up |
| `/ship:status` | Affiche l'état du projet ship |

## Architecture ship

ship utilise une architecture à 3 couches:

```
┌─────────────────────────────────────────────────────────────┐
│ COMMANDS (workflow explicite)                               │
│ L'utilisateur tape /ship:xxx pour lancer un workflow       │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ AGENTS (exécuteurs spécialisés)                             │
│ Reçoivent des instructions + ont accès à des skills         │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│ SKILLS (connaissance + outils réutilisables)                │
│ Techniques, méthodologies, scripts - partagés entre agents  │
└─────────────────────────────────────────────────────────────┘
```

## Agents disponibles

- **ship-brainstormer**: Transforme une idée vague en brief structuré
- **ship-shaper**: Transforme un brief en packages Shape Up avec research, stack et requirements
- **ship-planner**: Planifie l'implémentation (à venir)
- **ship-verifier**: Vérifie la qualité (à venir)

## Skills disponibles

- **ship-brainstorming**: Techniques de brainstorming (5 Whys, SCAMPER, Mind Mapping, etc.)
- **ship-shaping**: Templates et guidelines pour le shaping de packages Shape Up
- **ship-writing**: Guidelines de style markdown

## Pour commencer

Lance `/ship:brainstorm` pour démarrer une session de brainstorming sur ton idée.
