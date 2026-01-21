---
name: ship:brainstorm
description: "Lance une session de brainstorming interactive"
---

# Commande brainstorm

Lance l'agent ship-brainstormer pour transformer une idée vague en brief structuré.

## Instructions

Tu dois lancer l'agent `ship-brainstormer` en utilisant le tool Task avec les paramètres suivants:

```
subagent_type: ship-brainstormer
prompt: [Le contexte de l'utilisateur ou "Démarre une nouvelle session de brainstorming"]
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

1. Si l'utilisateur a fourni une idée avec la commande, passe-la à l'agent
2. Si aucune idée n'est fournie, l'agent demandera à l'utilisateur de décrire son idée
3. L'agent va:
   - Proposer une recherche sur le domaine (optionnel)
   - Recommander une technique de brainstorming
   - Mener une session interactive
   - Produire un brief structuré dans `.ship/brief.md`

## Exemple d'utilisation

```
/ship:brainstorm J'ai une idée d'app pour aider les gens à mieux dormir
```

ou simplement:

```
/ship:brainstorm
```

## Output

**Fichiers générés** :
- `.ship/brief.md` : Le brief structuré
- `.ship/research.md` : Research domaine métier (optionnel, si demandé)

**Structure du brief** :
- L'idée en une phrase
- Contexte
- Objectifs
- Utilisateurs cibles
- Contraintes connues
- Premières idées / Directions
- Questions ouvertes
- Research (référence vers `.ship/research.md` si effectuée)
