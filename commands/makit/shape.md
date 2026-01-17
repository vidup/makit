---
name: makit:shape
description: "Lance le shaping d'un brief en packages Shape Up"
---

# Commande shape

Lance l'agent makit-shaper pour transformer un brief en packages Shape Up.

## Instructions

Tu dois lancer l'agent `makit-shaper` en utilisant le tool Task avec les paramètres suivants:

```
subagent_type: makit-shaper
prompt: [Le chemin du brief ou "Utilise le brief par défaut .makit/brief.md"]
```

## Comportement attendu

1. **Vérifier que le brief existe** :
   - Si un chemin est fourni, vérifie qu'il existe
   - Sinon, vérifie que `.makit/brief.md` existe
   - Si aucun brief n'existe, suggère `/makit:brainstorm` pour en créer un

2. **Lancer l'agent makit-shaper** qui va :
   - Lire le brief
   - Proposer un découpage en packages
   - Mener la recherche (autonome)
   - Poser des questions pour les requirements (interactif)
   - Produire les documents du package

## Syntaxe

```
/makit:shape
```

Utilise le brief par défaut `.makit/brief.md`

```
/makit:shape path/to/brief.md
```

Utilise le brief spécifié

## Exemple d'utilisation

```
/makit:shape
```

Lance le shaping avec le brief par défaut.

```
/makit:shape .makit/briefs/feature-x.md
```

Lance le shaping avec un brief spécifique.

## Output

Le package sera créé dans `.makit/packages/<nom-package>/` avec :
- `research.md` : Recherche technique et fonctionnelle
- `stack.md` : Choix de stack justifiés
- `requirements.md` : Exigences structurées et priorisées

L'index des packages sera mis à jour dans `.makit/packages/index.md`.

## Prérequis

- Un brief doit exister (créé par `/makit:brainstorm` ou manuellement)
- Si aucun brief n'existe, lance d'abord `/makit:brainstorm`
