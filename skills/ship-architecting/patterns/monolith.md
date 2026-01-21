# Pattern: Monolithe

## Description

Une application unique qui contient toute la logique metier, deployee comme un seul artefact.

## Quand l'utiliser

- **MVP / Prototypage** : Time-to-market court, validation d'idee
- **Petite equipe** : < 5 developpeurs, coordination simple
- **Domaine simple** : Peu de sous-domaines distincts
- **Budget limite** : Infrastructure simple, moins de couts ops

## Quand l'eviter

- **Grande equipe** : Conflits de merge frequents, deployments bloques
- **Scaling independant** : Besoin de scaler differentes parties differemment
- **Domaines tres distincts** : Frontiere metier claire entre modules
- **Technologies heterogenes** : Besoin de stacks differents par module

## Structure typique

```
monolith/
├── src/
│   ├── api/           # Controllers / Routes
│   ├── services/      # Business logic
│   ├── repositories/  # Data access
│   ├── models/        # Domain entities
│   └── utils/         # Helpers
├── tests/
├── config/
└── migrations/
```

## Diagramme

```
+--------------------------------------------------+
|                    MONOLITHE                      |
|  +----------+  +----------+  +--------------+    |
|  |   API    |->| Services |->| Repositories |    |
|  +----------+  +----------+  +--------------+    |
|                                     |            |
+-------------------------------------|------------+
                                      v
                               +-------------+
                               |   Database  |
                               +-------------+
```

## Avantages

- **Simplicite** : Une seule codebase, un seul deploy
- **Debug facile** : Stack trace complete, pas de reseau interne
- **Performance** : Pas de latence reseau entre modules
- **Transactions** : ACID simple avec une seule DB

## Inconvenients

- **Scaling** : Tout scale ensemble, meme les parties peu sollicitees
- **Deploys** : Un changement = redeploy complet
- **Couplage** : Risque de spaghetti code si pas discipline
- **Technologie** : Stack unique impose

## Mitigation des risques

| Risque | Mitigation |
|--------|------------|
| Couplage fort | Modularisation stricte (modules/packages internes) |
| Code spaghetti | Clean Architecture, bounded contexts internes |
| Scaling limite | Caching agressif, optimisation DB |
| Deploys longs | CI/CD optimise, feature flags |

## Evolution

Le monolithe bien structure peut evoluer vers :

1. **Monolithe modulaire** : Modules avec interfaces claires
2. **Extraction progressive** : Un service a la fois vers microservices
3. **Strangler pattern** : Nouveau service devant, migration progressive

## Technologies typiques

| Categorie | Options courantes |
|-----------|------------------|
| Backend | Node.js/Express, Rails, Django, Spring Boot, Laravel |
| Database | PostgreSQL, MySQL, SQLite (dev) |
| Cache | Redis, In-memory |
| Deploy | Docker, VM, PaaS (Heroku, Render) |

## Exemple de choix

> "On part sur un monolithe car :
> - Equipe de 3 devs, domaine bien compris
> - MVP a sortir rapidement
> - Pas de besoin de scaling differentie
> - Budget infra limite
>
> On structure en modules internes pour faciliter une eventuelle extraction future."
