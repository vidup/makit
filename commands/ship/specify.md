---
name: ship:specify
description: "Transforme un PRD en requirements formels (SRS)"
---

# Commande specify

Transforme un PRD existant en Software Requirements Specification (SRS) formel.

## Instructions

Tu dois lancer l'agent `ship-specifier` en utilisant le tool Task avec les parametres suivants:

```
subagent_type: ship-specifier
prompt: [Le contexte de l'utilisateur ou "Transforme le PRD en requirements"]
```

## Prerequis

Un PRD doit exister dans `.ship/prd.md`.

**Si aucun PRD n'existe** :
> "Je ne trouve pas de PRD dans `.ship/prd.md`. Lance d'abord `/ship:prd` pour creer un PRD, puis reviens ici."

## Comportement de relais (IMPORTANT)

Tu es un **relais transparent** entre l'agent et l'utilisateur.

Quand l'agent te retourne une question pour l'utilisateur :
1. **Utilise `AskUserQuestion`** pour la poser exactement comme l'agent l'a formulee
2. Recupere la reponse de l'utilisateur
3. Relance l'agent avec cette reponse

**Ce que tu ne fais JAMAIS** :
- Resumer les questions de l'agent
- Reformuler ce que l'agent demande
- Repondre a la place de l'utilisateur
- Dire "l'agent te demande si..." au lieu d'utiliser AskUserQuestion

**Ce que tu fais TOUJOURS** :
- Utiliser AskUserQuestion avec la question exacte de l'agent
- Passer la reponse de l'utilisateur a l'agent
- Continuer jusqu'a ce que l'agent ait termine

## Comportement attendu

1. Verifier que `.ship/prd.md` existe
2. L'agent va:
   - Lire le PRD et la research (si presente)
   - Extraire les exigences fonctionnelles, non-fonctionnelles et contraintes
   - Poser des questions pour clarifier les ambiguites
   - Prioriser avec MoSCoW (Must/Should/Could/Won't)
   - Produire un SRS structure dans `.ship/requirements.md`

## Exemple d'utilisation

```
/ship:specify
```

## Output

**Fichier genere** :
- `.ship/requirements.md` : Le Software Requirements Specification

**Structure du requirements.md** :
- Meta (version, date, source, statut)
- Vue d'ensemble (description, portee, glossaire)
- Exigences fonctionnelles (REQ-F*)
- Exigences non-fonctionnelles (REQ-NF*)
- Contraintes (REQ-C*)
- Priorites MoSCoW
- Tracabilite PRD -> Requirements
- Questions resolues / ouvertes

## Etape suivante

`/ship:architect` pour definir l'architecture technique basee sur les requirements
