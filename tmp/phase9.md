# Plan Détaillé - Phase 9 : Mise à jour des commandes help et status

## Résumé

Mettre à jour `help.md` pour documenter les 11 commandes et `status.md` pour détecter l'état du projet avec la nouvelle structure.

---

## 1. Structure du nouveau help.md

### Front-matter

```yaml
---
name: ship:help
description: "Affiche la liste des commandes ship disponibles"
---
```

### Contenu structuré

**A. Introduction**
- Description courte de ship v2
- Philosophie (pragmatisme, contrôle humain, shaping avant coding)

**B. Tableau des commandes par phase**

**Phase 1 - Idéation**
| Commande | Description |
|----------|-------------|
| `/ship:brainstorm` | Transforme une idée vague en brief structuré |
| `/ship:prd` | Creuse le brief en Product Requirements Document |

**Phase 2 - Spécification**
| Commande | Description |
|----------|-------------|
| `/ship:specify` | Transforme le PRD en exigences (SRS) |
| `/ship:architect` | Propose ou valide l'architecture technique |
| `/ship:split` | Découpe en packages livrables |

**Phase 3 - Exécution**
| Commande | Description |
|----------|-------------|
| `/ship:shape` | Planifie UN package en scopes |
| `/ship:execute` | Implémente le scope courant |
| `/ship:verify` | Vérifie l'implémentation |

**Orchestration**
| Commande | Description |
|----------|-------------|
| `/ship:flow` | Enchaîne les étapes automatiquement |
| `/ship:status` | Affiche l'état du projet |
| `/ship:help` | Affiche cette aide |

**C. Diagramme du flow**
```
BRAINSTORM → PRD → SPECIFY → ARCHITECT → SPLIT
                                          ↓
                    ┌─────────────────────┘
                    ↓
              Pour CHAQUE package:
              SHAPE → EXECUTE ←→ VERIFY
```

**D. Structure des fichiers**
```
.ship/
├── brief.md                      # Output brainstormer
├── research.md                   # Output brainstormer (optionnel)
├── prd.md                        # Output brainstormer-prd
├── requirements.md               # Output specifier (SRS)
├── architecture.md               # Output architect
└── packages/
    ├── mapping.md                # Output splitter
    └── <nom>/
        ├── package.md            # Output shaper
        └── verification.md       # Output shaper
```

**E. Les 8 agents**
- ship-brainstormer
- ship-brainstormer-prd
- ship-specifier
- ship-architect
- ship-splitter
- ship-shaper
- ship-executor
- ship-verifier

**F. Pour commencer**
- `/ship:brainstorm` pour démarrer
- `/ship:status` pour voir où on en est

---

## 2. Structure du nouveau status.md

### Front-matter

```yaml
---
name: ship:status
description: "Affiche l'état du projet ship et recommande l'étape suivante"
---
```

### Logique de détection

**Étape 1 : Fichiers globaux**
```
.ship/brief.md        → Brainstorm terminé
.ship/research.md     → Research effectuée (optionnel)
.ship/prd.md          → PRD terminé
.ship/requirements.md → Spécification terminée
.ship/architecture.md → Architecture définie
.ship/packages/mapping.md → Split terminé
```

**Étape 2 : Packages**
Pour chaque package dans mapping.md :
- Vérifier si le dossier existe
- Lire le front-matter de package.md

---

## 3. Algorithme de détection de l'état

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

---

## 4. Lecture des front-matter

### Format dans package.md

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

---

## 5. Format de sortie du status

```
==========================================
        SHIP STATUS - Mon Projet
==========================================

FICHIERS GLOBAUX
----------------
  [OK] brief.md          Brief du projet
  [OK] research.md       Recherche domaine (optionnel)
  [OK] prd.md            Product Requirements
  [OK] requirements.md   Spécifications (SRS)
  [OK] architecture.md   Architecture technique
  [OK] packages/mapping.md   Mapping des packages

PACKAGES (3)
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

---

## 6. Recommandations contextualisées

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
| Tout done | "Tous les packages sont terminés !" |

---

## 7. Fichiers à modifier

| Fichier | Action |
|---------|--------|
| `commands/ship/help.md` | Documenter les 11 commandes et 8 agents |
| `commands/ship/status.md` | Nouvelle logique de détection complète |

---

## 8. Points d'attention

1. **Front-matter** : Robuste si absent ou malformé
2. **Performance** : Ne pas lister tous les fichiers, juste vérifier l'existence
3. **Messages** : Clairs, actionnables
4. **Cohérence avec Phase 10** : La commande flow utilise la même logique de détection
