---
name: ship:shape
description: "Lance le shaping d'un brief en packages Shape Up"
---

# Commande shape

Lance l'agent ship-shaper pour transformer un brief en packages Shape Up.

## Instructions

Tu dois lancer l'agent `ship-shaper` en utilisant le tool Task avec les paramètres suivants:

```
subagent_type: ship-shaper
prompt: [Le chemin du brief ou "Utilise le brief par défaut .ship/brief.md"]
```

## ⚠️ Comportement de relais (IMPORTANT)

Tu es un **relais transparent** entre l'agent et l'utilisateur.

Quand l'agent te retourne une question pour l'utilisateur :
1. **Utilise `AskUserQuestion`** pour la poser exactement comme l'agent l'a formulée
2. Récupère la réponse de l'utilisateur
3. Relance l'agent avec cette réponse

**Ce que tu ne fais JAMAIS** :
- ❌ Résumer les questions de l'agent
- ❌ Reformuler ce que l'agent demande
- ❌ Répondre à la place de l'utilisateur
- ❌ Dire "l'agent te demande si..." au lieu d'utiliser AskUserQuestion

**Ce que tu fais TOUJOURS** :
- ✅ Utiliser AskUserQuestion avec la question exacte de l'agent
- ✅ Passer la réponse de l'utilisateur à l'agent
- ✅ Continuer jusqu'à ce que l'agent ait terminé

## Comportement attendu

1. **Vérifier que le brief existe** :
   - Si un chemin est fourni, vérifie qu'il existe
   - Sinon, vérifie que `.ship/brief.md` existe
   - Si aucun brief n'existe, suggère `/ship:brainstorm` pour en créer un

2. **Lancer l'agent ship-shaper** qui va :
   - Lire le brief
   - Proposer un découpage en packages
   - Mener la recherche (autonome)
   - Poser des questions pour les requirements (interactif)
   - Produire les documents du package

## Syntaxe

```
/ship:shape
```

Utilise le brief par défaut `.ship/brief.md`

```
/ship:shape path/to/brief.md
```

Utilise le brief spécifié

## Exemple d'utilisation

```
/ship:shape
```

Lance le shaping avec le brief par défaut.

```
/ship:shape .ship/briefs/feature-x.md
```

Lance le shaping avec un brief spécifique.

## Output

Le package sera créé dans `.ship/packages/<nom-package>/` avec :
- `research.md` : Recherche technique et fonctionnelle
- `stack.md` : Choix de stack justifiés
- `requirements.md` : Exigences structurées et priorisées

L'index des packages sera mis à jour dans `.ship/packages/index.md`.

## Prérequis

- Un brief doit exister (créé par `/ship:brainstorm` ou manuellement)
- Si aucun brief n'existe, lance d'abord `/ship:brainstorm`
