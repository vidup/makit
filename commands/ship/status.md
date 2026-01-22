---
name: ship:status
description: "Affiche l'état du projet ship et recommande l'étape suivante"
---

# Commande status

Affiche l'état actuel du projet ship et recommande la prochaine étape.

## Instructions

### Étape 1 : Vérifier les fichiers globaux

Vérifie l'existence de chaque fichier dans l'ordre:

1. `.ship/` - Le dossier ship existe-t-il?
2. `.ship/brief.md` - Brief du projet (output brainstormer)
3. `.ship/research.md` - Recherche domaine (optionnel)
4. `.ship/prd.md` - Product Requirements Document
5. `.ship/requirements.md` - Spécifications (SRS)
6. `.ship/architecture.md` - Architecture technique
7. `.ship/packages/mapping.md` - Mapping des packages

### Étape 2 : Analyser les packages

Si `mapping.md` existe, lire son contenu pour identifier les packages.

Pour chaque package listé:
1. Vérifier si le dossier `.ship/packages/<nom>/` existe
2. Lire le front-matter de `package.md` pour obtenir le status et current_scope

### Algorithme de détection

```
1. SI .ship/ n'existe pas
   → État: "Non initialisé"
   → Recommandation: /ship:brainstorm

2. SI .ship/brief.md n'existe pas
   → Recommandation: /ship:brainstorm

3. SI .ship/prd.md n'existe pas
   → Recommandation: /ship:prd

4. SI .ship/requirements.md n'existe pas
   → Recommandation: /ship:specify

5. SI .ship/architecture.md n'existe pas
   → Recommandation: /ship:architect

6. SI .ship/packages/mapping.md n'existe pas
   → Recommandation: /ship:split

7. SINON analyser les packages par leur front-matter
```

### Front-matter des packages

Format attendu dans `package.md`:

```yaml
---
status: pending | shaping | shaped | executing | executed | verifying | done
current_scope: scope-1-auth-basic
---
```

### États possibles d'un package

| Status | Description | Recommandation |
|--------|-------------|----------------|
| `pending` | Non commencé | /ship:shape <package> |
| `shaping` | Shaping en cours | /ship:shape <package> |
| `shaped` | Shape terminé | /ship:execute <package> |
| `executing` | Exécution en cours | /ship:execute <package> |
| `executed` | Exécution terminée | /ship:verify <package> |
| `verifying` | Vérification en cours | /ship:verify <package> |
| `done` | Package terminé | Passer au suivant |

## Format de sortie

```
==========================================
        SHIP STATUS - [Nom Projet]
==========================================

FICHIERS GLOBAUX
----------------
  [OK] brief.md          Brief du projet
  [OK] research.md       Recherche domaine (optionnel)
  [OK] prd.md            Product Requirements
  [OK] requirements.md   Spécifications (SRS)
  [OK] architecture.md   Architecture technique
  [OK] packages/mapping.md   Mapping des packages

PACKAGES (N)
------------
  [DONE]      auth           Scope 3/3 - Terminé
  [EXECUTING] dashboard      Scope 2/5 - En cours: scope-2-widgets
  [PENDING]   notifications  Scope 0/4 - Non commencé

==========================================
PROCHAINE ÉTAPE RECOMMANDÉE:
  /ship:execute dashboard

  Continuer l'implémentation du scope "scope-2-widgets"
==========================================
```

## Recommandations contextualisées

| Situation | Message |
|-----------|---------|
| Rien n'existe | "Lance `/ship:brainstorm` pour démarrer" |
| Brief seul | "Lance `/ship:prd` pour créer le PRD" |
| PRD présent | "Lance `/ship:specify` pour définir les exigences" |
| Requirements présents | "Lance `/ship:architect` pour définir l'architecture" |
| Architecture présente | "Lance `/ship:split` pour découper en packages" |
| Mapping présent, aucun package shapé | "Lance `/ship:shape <premier-package>`" |
| Package executing | "Continue avec `/ship:execute <package>` (scope: <name>)" |
| Package executed | "Lance `/ship:verify <package>`" |
| Vérification failed | "Corrige puis `/ship:execute <package>`" |
| Tout done | "Tous les packages sont terminés!" |

## Notes

- Si un front-matter est absent ou malformé, considérer le package comme `pending`
- Ne pas lister tous les fichiers, juste vérifier l'existence
- Les messages doivent être clairs et actionnables
