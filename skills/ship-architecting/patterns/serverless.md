# Pattern: Serverless

## Description

Architecture ou le code s'execute en reponse a des evenements, sans gerer de serveurs. Le provider cloud gere l'infrastructure, le scaling et la disponibilite.

## Quand l'utiliser

- **Charge variable** : Trafic imprevisible avec pics et creux
- **Pay-per-use** : Budget lie a l'utilisation reelle
- **Event-driven** : Traitements declenches par evenements (webhooks, queues)
- **Prototypage rapide** : Deployer sans configurer d'infra
- **APIs simples** : Endpoints stateless sans etat serveur

## Quand l'eviter

- **Latence critique** : Cold starts incompatibles avec P95 < 100ms
- **Long-running processes** : Timeouts (15min max Lambda)
- **Etat en memoire** : Besoin de connexions persistantes (WebSockets)
- **Cout previsible** : Trafic constant eleve = plus cher que VMs
- **Vendor lock-in** : Dependance forte au provider

## Structure typique

```
serverless-app/
├── functions/
│   ├── api/
│   │   ├── users/
│   │   │   ├── create.ts
│   │   │   ├── get.ts
│   │   │   └── list.ts
│   │   └── orders/
│   │       └── ...
│   └── workers/
│       ├── processPayment.ts
│       └── sendEmail.ts
├── lib/               # Shared code
├── serverless.yml     # ou template.yaml (SAM)
└── package.json
```

## Diagramme

```
                    +-------------+
                    |   API       |
    +-------------->|   Gateway   |<--------------+
    |               +-------------+               |
    |                     |                       |
    v                     v                       v
+-------+          +------------+          +------------+
| Auth  |          |   Lambda   |          |   Lambda   |
| Lambda|          |  (Users)   |          |  (Orders)  |
+-------+          +------------+          +------------+
                         |                       |
                         v                       v
                   +----------+           +----------+
                   | DynamoDB |           |    S3    |
                   +----------+           +----------+

+----------+     +-----------+     +------------+
|   SQS    | --> |  Lambda   | --> |  External  |
|  Queue   |     | (Worker)  |     |   Service  |
+----------+     +-----------+     +------------+
```

## Avantages

- **Zero ops** : Pas de serveurs a gerer, patching automatique
- **Scaling automatique** : De 0 a des milliers d'instances
- **Pay-per-use** : Facturation a l'execution (ms)
- **Haute disponibilite** : Built-in par le provider
- **Focus code** : Infrastructure abstraite

## Inconvenients

- **Cold starts** : Latence au demarrage (100ms-2s)
- **Timeouts** : Limite de temps d'execution (15min max)
- **Stateless** : Pas d'etat en memoire entre invocations
- **Vendor lock-in** : APIs specifiques au provider
- **Debug local** : Environnement difficile a reproduire
- **Cout impredictible** : Peut exploser avec le trafic

## Mitigation des risques

| Risque | Mitigation |
|--------|------------|
| Cold starts | Provisioned concurrency, keep-warm pings |
| Timeouts | Decouper en etapes, SQS pour long-running |
| Vendor lock-in | Abstraction (Serverless Framework), containers |
| Debug | SAM local, Serverless offline |
| Couts | Monitoring CloudWatch, alerts budget |

## Technologies typiques

| Categorie | Options courantes |
|-----------|------------------|
| Compute | AWS Lambda, Azure Functions, GCP Cloud Functions |
| API Gateway | AWS API Gateway, Azure API Management |
| Database | DynamoDB, Firestore, PlanetScale, Neon |
| Storage | S3, Azure Blob, GCS |
| Queues | SQS, Azure Service Bus, Pub/Sub |
| Framework | Serverless Framework, AWS SAM, SST |

## Patterns complementaires

| Pattern | Utilite |
|---------|---------|
| BFF (Backend for Frontend) | Lambda par type de client |
| Fan-out/Fan-in | Parallelisation via SQS/SNS |
| Event-driven | Declenchement par evenements |
| CQRS | Lambdas specialises lecture/ecriture |

## Exemple de choix

> "On part sur du serverless car :
> - Trafic imprevisible (0 la nuit, pics en journee)
> - APIs stateless, pas de WebSockets
> - Budget startup = pay-per-use ideal
> - Equipe petite, pas de temps pour l'ops
>
> On utilise Provisioned Concurrency pour les endpoints critiques
> pour mitiger les cold starts."
