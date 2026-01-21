# Pattern: Layered (Clean Architecture / Hexagonal)

## Description

Architecture en couches avec separation stricte des responsabilites. Chaque couche ne depend que des couches inferieures, jamais des superieures. La logique metier est au centre, independante des details d'implementation.

> **Note** : Ce pattern est aussi connu sous le nom d'**Architecture Hexagonale** (Ports & Adapters).
> Clean Architecture, Hexagonal, Onion Architecture = meme famille, terminologies differentes.
> Le principe fondamental est identique : **les dependances pointent vers le domaine**.

## Quand l'utiliser

- **Maintenabilite** : Codebase qui va durer et evoluer
- **Testabilite** : Besoin de tests unitaires isoles
- **Equipe moyenne** : Structure claire pour onboarding
- **Domaine complexe** : Logique metier importante a proteger
- **Choix par defaut** : Quand aucun autre pattern ne s'impose

## Quand l'eviter

- **MVP rapide** : Over-engineering pour un prototype
- **CRUD simple** : Pas de logique metier complexe
- **Petite application** : Overhead de structure non justifie

## Structure typique

```
src/
├── presentation/          # Couche Presentation (API)
│   ├── controllers/       # HTTP handlers
│   ├── middleware/        # Auth, validation, logging
│   ├── dto/              # Data Transfer Objects
│   └── routes/           # Route definitions
│
├── application/          # Couche Application (Use Cases)
│   ├── services/         # Application services
│   ├── commands/         # Command handlers (write)
│   └── queries/          # Query handlers (read)
│
├── domain/               # Couche Domaine (Business Logic)
│   ├── entities/         # Business entities
│   ├── value-objects/    # Immutable value types
│   ├── repositories/     # Repository interfaces
│   └── services/         # Domain services
│
└── infrastructure/       # Couche Infrastructure
    ├── database/         # DB implementations
    ├── external/         # External API clients
    ├── messaging/        # Queue implementations
    └── config/           # Configuration
```

## Diagramme

```
┌─────────────────────────────────────────────────────┐
│                   PRESENTATION                       │
│    Controllers, Routes, Middleware, DTOs            │
└─────────────────────────┬───────────────────────────┘
                          │ depends on
                          ▼
┌─────────────────────────────────────────────────────┐
│                   APPLICATION                        │
│         Use Cases, Services, Commands, Queries      │
└─────────────────────────┬───────────────────────────┘
                          │ depends on
                          ▼
┌─────────────────────────────────────────────────────┐
│                     DOMAIN                           │
│     Entities, Value Objects, Repository Interfaces  │
└─────────────────────────────────────────────────────┘
                          ▲
                          │ implements
┌─────────────────────────┴───────────────────────────┐
│                  INFRASTRUCTURE                      │
│        Database, External APIs, Messaging           │
└─────────────────────────────────────────────────────┘

Dependency Rule: Dependencies point INWARD (toward Domain)
```

## Terminologie Hexagonale (Ports & Adapters)

En terminologie hexagonale, on distingue :

| Terme Hexagonal | Equivalent Layered | Description |
|-----------------|-------------------|-------------|
| **Port** | Interface dans Domain | Contrat defini par le domaine |
| **Adapter** | Implementation dans Infra | Implementation concrete du contrat |
| **Driving Adapter** | Presentation (Controllers) | Pilote l'application (API, CLI, Events) |
| **Driven Adapter** | Infrastructure (DB, APIs) | Pilote par l'application (DB, services externes) |

```
[Driving Adapter] --> [Application] --> [Domain]
  (API, CLI)           (Use Cases)      (Entities)
                            |
                      implements Port
                            |
                     [Driven Adapter] --> [External]
                       (DB, APIs)
```

## Couches detaillees

### Presentation

- **Responsabilite** : Interface avec l'exterieur (HTTP, CLI, GraphQL)
- **Contient** : Controllers, DTOs, validation input, serialization
- **Ne contient PAS** : Logique metier, acces direct DB

### Application

- **Responsabilite** : Orchestration des use cases
- **Contient** : Services applicatifs, command/query handlers
- **Ne contient PAS** : Regles metier complexes, details d'infra

### Domain

- **Responsabilite** : Logique metier pure
- **Contient** : Entities, Value Objects, interfaces repositories
- **Ne contient PAS** : Frameworks, DB, APIs externes

### Infrastructure

- **Responsabilite** : Details techniques d'implementation
- **Contient** : Implementations DB, clients API, config
- **Implemente** : Les interfaces definies dans Domain

## Avantages

- **Testabilite** : Domain testable sans DB ni frameworks
- **Maintenabilite** : Changements isoles par couche
- **Flexibilite** : Changer d'infra sans toucher au domain
- **Onboarding** : Structure previsible et documentee
- **Separation** : Chaque couche a une responsabilite claire

## Inconvenients

- **Verbeux** : Plus de fichiers et de mapping
- **Overhead** : Overkill pour des CRUDs simples
- **Mapping** : Conversion entre DTOs, Entities, etc.
- **Courbe d'apprentissage** : Equipe doit comprendre le pattern

## Regles strictes

1. **Dependency Rule** : Les dependances pointent vers l'interieur (vers Domain)
2. **Domain pur** : Aucune dependance framework dans Domain
3. **Interfaces dans Domain** : Repositories definis dans Domain, implementes dans Infra
4. **DTOs en presentation** : Ne pas exposer les Entities directement

## Mitigation des risques

| Risque | Mitigation |
|--------|------------|
| Over-engineering | Commencer simple, ajouter des couches si besoin |
| Mapping verbeux | Utiliser des libs comme AutoMapper ou class-transformer |
| Rigidite | Autoriser des raccourcis pour les CRUDs simples |
| Complexite | Documentation claire, exemples pour l'equipe |

## Technologies typiques

| Categorie | Options courantes |
|-----------|------------------|
| DI Container | InversifyJS, tsyringe, NestJS built-in |
| Validation | Zod, Joi, class-validator |
| ORM | TypeORM, Prisma, Drizzle |
| Testing | Jest, Vitest avec mocks |

## Exemple de choix

> "On part sur une Clean Architecture car :
> - Logique metier complexe (calculs de prix, regles validation)
> - Codebase qui va durer plusieurs annees
> - Equipe de 5+ devs, besoin de structure claire
> - Forte couverture de tests requise
>
> On simplifie pour les CRUDs simples (acces direct repository
> depuis le controller si pas de logique metier)."
