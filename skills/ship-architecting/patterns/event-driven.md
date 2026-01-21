# Pattern: Event-Driven

## Description

Architecture ou les composants communiquent via des evenements asynchrones plutot que des appels directs. Les producteurs emettent des evenements, les consommateurs y reagissent.

## Quand l'utiliser

- **Decoupling fort** : Composants qui evoluent independamment
- **Integrations multiples** : Plusieurs systemes reagissent au meme evenement
- **Audit trail** : Besoin d'historique complet des actions
- **Traitement asynchrone** : Operations longues qui n'ont pas besoin de reponse immediate
- **Resilience** : Tolerance aux pannes temporaires

## Quand l'eviter

- **Reponse synchrone** : Besoin de resultats immediats
- **Transactions simples** : CRUD basique sans side effects
- **Petite application** : Overhead de messaging non justifie
- **Equipe inexperimentee** : Debugging distribue complexe

## Structure typique

```
event-driven-app/
├── services/
│   ├── order-service/
│   │   ├── src/
│   │   │   ├── commands/      # Handlers de commandes
│   │   │   ├── events/        # Definitions d'evenements
│   │   │   ├── handlers/      # Handlers d'evenements
│   │   │   └── publishers/    # Publication d'evenements
│   │   └── ...
│   └── notification-service/
│       └── ...
├── shared/
│   └── events/               # Schemas d'evenements partages
└── infra/
    └── messaging/            # Config broker
```

## Diagramme

```
+-------------+     +-------------+     +-------------+
|   Order     | --> |   Message   | --> | Notification|
|   Service   |     |   Broker    |     |   Service   |
+-------------+     +-------------+     +-------------+
      |                   |                   |
      |                   |                   |
      v                   v                   v
+----------+        +----------+        +----------+
| Orders   |        | Events   |        | Emails   |
|   DB     |        |   Log    |        |   Sent   |
+----------+        +----------+        +----------+

Event Flow:
┌──────────┐     ┌──────────────────┐     ┌──────────────┐
│ Command  │ --> │ OrderCreatedEvent│ --> │ Send Email   │
│ CreateOrd│     │ OrderPaidEvent   │ --> │ Update Stock │
└──────────┘     │ OrderShippedEvent│ --> │ Notify User  │
                 └──────────────────┘     └──────────────┘
```

## Avantages

- **Decoupling** : Producteurs et consommateurs independants
- **Scalabilite** : Consommateurs scalent independamment
- **Resilience** : Messages persistes, retry automatique
- **Extensibilite** : Ajouter des consommateurs sans toucher aux producteurs
- **Audit** : Historique complet des evenements

## Inconvenients

- **Complexite** : Plus dur a comprendre et debugger
- **Eventual consistency** : Pas de garantie d'ordre ou de timing
- **Debugging** : Traces distribuees difficiles a suivre
- **Infrastructure** : Besoin d'un message broker fiable
- **Idempotence** : Handlers doivent gerer les duplicats

## Types d'evenements

| Type | Description | Exemple |
|------|-------------|---------|
| Domain Event | Fait metier qui s'est produit | OrderPlaced, PaymentReceived |
| Integration Event | Communication inter-services | UserCreated (pour sync) |
| Notification Event | Pour informer (fire & forget) | EmailSent, LogCreated |

## Patterns complementaires

| Pattern | Utilite |
|---------|---------|
| Event Sourcing | Stocker l'etat comme sequence d'evenements |
| CQRS | Separation commandes (write) / queries (read) |
| Saga | Orchestration de transactions distribuees |
| Outbox | Garantir publication evenement + commit DB |
| Dead Letter Queue | Gerer les messages en echec |

## Mitigation des risques

| Risque | Mitigation |
|--------|------------|
| Messages perdus | Persistence, acknowledgments, DLQ |
| Duplicats | Handlers idempotents, deduplication |
| Ordre des messages | Partitioning par cle, event versioning |
| Debugging | Correlation IDs, distributed tracing |
| Schema evolution | Versioning, backward compatibility |

## Technologies typiques

| Categorie | Options courantes |
|-----------|------------------|
| Message Broker | RabbitMQ, Apache Kafka, AWS SQS/SNS |
| Streaming | Kafka, AWS Kinesis, Azure Event Hubs |
| Event Store | EventStoreDB, Kafka (log compact) |
| Tracing | Jaeger, Zipkin, AWS X-Ray |

## Exemple de choix

> "On part sur du event-driven car :
> - Plusieurs services doivent reagir a une commande passee
> - Besoin d'audit trail complet pour conformite
> - Les notifications emails peuvent etre async
> - Decoupler le service de paiement du reste
>
> On utilise RabbitMQ pour commencer (plus simple que Kafka),
> avec des handlers idempotents et correlation IDs pour le tracing."
