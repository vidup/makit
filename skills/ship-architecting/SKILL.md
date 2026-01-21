---
name: ship-architecting
description: "Patterns et guidelines pour definir une architecture technique"
user-invocable: false
---

# Skill: Architecting

Ce skill fournit les patterns et guidelines pour definir une architecture technique adaptee aux exigences.

## Ce que produit l'Architect

**Output** : `.ship/architecture.md`

Un document qui formalise :
- La vue d'ensemble de l'architecture
- Les composants principaux et leurs responsabilites
- Les choix technologiques avec justifications
- Le mapping exigences NF -> solutions
- Les risques techniques et mitigations
- Les mesures de securite

## Principes d'architecture

### Simplicite

Choisir l'architecture la plus simple qui repond aux exigences. Pas d'over-engineering.

### Justification

Chaque choix doit etre justifie par une exigence ou une contrainte. Pas de "best practice" sans raison.

### Evolutivite

L'architecture doit permettre l'evolution, pas la predire. On ne design pas pour des besoins hypothetiques.

### Coherence

L'architecture doit etre coherente avec les technologies et patterns deja en place dans la codebase.

## Guide de selection rapide

```
Projet greenfield ?
  |-- Oui -> Continue avec les exigences NF
  |-- Non -> Analyser l'existant d'abord

Besoin de scalabilite horizontale ?
  |-- Oui -> Microservices ou Serverless
  |-- Non -> Continue...

Budget/complexite limites ?
  |-- Oui -> Monolithe ou Layered
  |-- Non -> Continue...

Charge impredictible ?
  |-- Oui -> Serverless
  |-- Non -> Continue...

Beaucoup d'integrations async ?
  |-- Oui -> Event-driven
  |-- Non -> Continue...

Par defaut -> Layered (Clean Architecture / Hexagonal)
```

## Patterns disponibles

| Pattern | Quand l'utiliser | Fichier |
|---------|------------------|---------|
| **Monolithe** | MVP, petite equipe, time-to-market court | [monolith.md](patterns/monolith.md) |
| **Microservices** | Scaling independant, grande equipe, domaines distincts | [microservices.md](patterns/microservices.md) |
| **Serverless** | Charge variable, pay-per-use, event-driven | [serverless.md](patterns/serverless.md) |
| **Event-driven** | Integrations async, decoupling fort, audit trail | [event-driven.md](patterns/event-driven.md) |
| **Layered** | Separation of concerns, maintenabilite, testabilite, DDD | [layered.md](patterns/layered.md) |

## Templates disponibles

| Template | Description | Fichier |
|----------|-------------|---------|
| **Architecture** | Format complet du architecture.md | [architecture.md](templates/architecture.md) |

## Mapping exigences NF -> solutions

| Exigence NF | Solutions typiques |
|-------------|-------------------|
| Haute disponibilite (99.9%+) | Multi-AZ, health checks, load balancing, failover |
| Faible latence (< 100ms P95) | CDN, caching (Redis), DB indexing, connection pooling |
| Scalabilite horizontale | Stateless services, load balancing, DB sharding/replicas |
| Securite donnees | Encryption at rest/transit, secrets management, audit logs |
| Resilience | Circuit breakers, retry policies, graceful degradation |

## Questions cles a poser

### Exigences non-fonctionnelles

- Quel niveau de disponibilite est attendu ? (99%, 99.9%, 99.99%)
- Quelle latence cible ? (P50, P95, P99)
- Quel volume de trafic ? (req/s, concurrent users)
- Quelle croissance prevue ? (6 mois, 1 an)

### Contraintes

- Technologies imposees ou preferees ?
- Budget infrastructure ?
- Competences de l'equipe ?
- Contraintes reglementaires ? (RGPD, SOC2, HIPAA)

### Existant

- Codebase existante ? Quel stack ?
- Infrastructure actuelle ?
- Integrations existantes ?

## Checklist de qualite

Avant de finaliser le architecture.md :

- [ ] Vue d'ensemble claire et concise
- [ ] Chaque composant a sa fiche (responsabilite, techno, justification)
- [ ] Choix technologiques justifies avec alternatives considerees
- [ ] Toutes les exigences NF sont adressees
- [ ] Risques identifies avec mitigations
- [ ] Mesures de securite definies
- [ ] Questions ouvertes listees si presentes

## Point d'attention critique

L'architecture depend enormement des **exigences non-fonctionnelles**. Si celles-ci ne sont pas assez precises ou mesurables, l'Architect doit :

1. Alerter l'utilisateur
2. Proposer de definir ces exigences ensemble
3. Ou recommander de revenir au Specifier

**Exemples d'exigences NF insuffisantes** :
- "Le systeme doit etre rapide" -> Quel P95 cible ?
- "Haute disponibilite" -> 99% ? 99.9% ? 99.99% ?
- "Scalable" -> Pour combien d'utilisateurs ? Quelle croissance ?
