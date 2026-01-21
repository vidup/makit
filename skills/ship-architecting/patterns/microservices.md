# Pattern: Microservices

## Description

Architecture distribuee ou chaque service gere un domaine metier specifique, deploye et scale independamment.

## Quand l'utiliser

- **Grande equipe** : > 10 developpeurs, equipes autonomes par domaine
- **Scaling independant** : Certains services ont des besoins tres differents
- **Domaines distincts** : Bounded contexts clairs (DDD)
- **Deploiements frequents** : Besoin de deployer des parties sans affecter le reste
- **Technologies heterogenes** : Differents langages/stacks par service

## Quand l'eviter

- **Petite equipe** : Overhead operationnel trop eleve
- **MVP / Prototypage** : Trop de complexite pour valider une idee
- **Domaine flou** : Frontieres de services pas claires = mauvais decoupage
- **Equipe inexperimentee** : Complexite distribuee difficile a gerer

## Structure typique

```
project/
├── services/
│   ├── user-service/
│   │   ├── src/
│   │   ├── Dockerfile
│   │   └── package.json
│   ├── order-service/
│   │   ├── src/
│   │   ├── Dockerfile
│   │   └── package.json
│   └── payment-service/
│       ├── src/
│       ├── Dockerfile
│       └── package.json
├── shared/
│   └── contracts/        # API contracts / schemas
├── infra/
│   └── k8s/             # Kubernetes manifests
└── docker-compose.yml   # Dev environment
```

## Diagramme

```
+-------------+     +-------------+     +-------------+
|   API       |     |   User      |     |   Order     |
|   Gateway   | --> |   Service   |     |   Service   |
+-------------+     +-------------+     +-------------+
      |                   |                   |
      |             +-----+-----+             |
      |             |           |             |
      v             v           v             v
+-------------+ +-------+ +---------+ +-------------+
|  Auth       | | Users | | Orders  | |  Payment    |
|  Service    | |  DB   | |   DB    | |  Service    |
+-------------+ +-------+ +---------+ +-------------+
                                            |
                                            v
                                      +-----------+
                                      | Payments  |
                                      |    DB     |
                                      +-----------+
```

## Avantages

- **Scaling independant** : Chaque service scale selon ses besoins
- **Autonomie equipes** : Chaque equipe possede son service
- **Resilience** : Un service down n'impacte pas tout
- **Flexibilite techno** : Chaque service peut utiliser le meilleur outil
- **Deploys independants** : Deployer un service sans toucher aux autres

## Inconvenients

- **Complexite operationnelle** : Monitoring, logging, tracing distribues
- **Latence reseau** : Appels inter-services ajoutent de la latence
- **Transactions distribuees** : Pas de ACID simple, eventual consistency
- **Debug difficile** : Traces reparties sur plusieurs services
- **Infrastructure** : Besoin de service mesh, API gateway, etc.

## Patterns complementaires

| Pattern | Utilite |
|---------|---------|
| API Gateway | Point d'entree unique, routing, auth |
| Service Discovery | Localisation dynamique des services |
| Circuit Breaker | Resilience aux pannes de services |
| Saga | Transactions distribuees |
| Event Sourcing | Historique des changements d'etat |
| CQRS | Separation lecture/ecriture |

## Mitigation des risques

| Risque | Mitigation |
|--------|------------|
| Latence reseau | Cache, GraphQL, BFF pattern |
| Debugging complexe | Distributed tracing (Jaeger, Zipkin) |
| Transactions | Sagas, eventual consistency acceptee |
| Data consistency | Event-driven, CDC (Change Data Capture) |
| Overhead ops | Kubernetes, service mesh (Istio) |

## Technologies typiques

| Categorie | Options courantes |
|-----------|------------------|
| Communication | REST, gRPC, GraphQL, Message queues |
| Service Mesh | Istio, Linkerd, Consul Connect |
| API Gateway | Kong, Ambassador, AWS API Gateway |
| Orchestration | Kubernetes, Docker Swarm |
| Messaging | RabbitMQ, Kafka, NATS |
| Tracing | Jaeger, Zipkin, AWS X-Ray |

## Exemple de choix

> "On part sur des microservices car :
> - 3 equipes distinctes (Users, Orders, Payments)
> - Besoin de scaler le service Orders x10 pendant les soldes
> - Domaines metier clairement delimites
> - Equipe experimentee en systemes distribues
>
> On commence avec 3 services et on evitera de fragmenter davantage tant que pas necessaire."
