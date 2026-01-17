---
name: ship:status
description: "Affiche l'état du projet ship"
---

# Commande status

Affiche l'état actuel du projet ship en vérifiant les fichiers dans `.ship/`.

## Instructions

1. Vérifie si le dossier `.ship/` existe
2. Liste les fichiers présents:
   - `.ship/brief.md` - Le brief du projet
   - `.ship/research/` - Les recherches effectuées
   - `.ship/packages/` - Les packages Shape Up (à venir)
   - `.ship/plan.md` - Le plan d'implémentation (à venir)

3. Affiche un résumé de l'état:
   - ✅ si le fichier existe
   - ⬜ si le fichier n'existe pas encore

## Format de sortie

```
📊 État du projet ship

Fichiers:
  [✅|⬜] .ship/brief.md        Brief du projet
  [✅|⬜] .ship/research/       Recherches
  [✅|⬜] .ship/packages/       Packages Shape Up
  [✅|⬜] .ship/plan.md         Plan d'implémentation

Prochaine étape recommandée: [selon l'état]
```

## Recommandations

- Si rien n'existe: "Lance `/ship:brainstorm` pour démarrer"
- Si brief existe: "Lance `/ship:shape` pour découper en packages" (à venir)
- Si packages existent: "Lance `/ship:plan` pour planifier" (à venir)
