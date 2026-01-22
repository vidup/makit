---
name: ship-splitting
description: "Techniques et guidelines pour decouper un projet en packages livrables"
user-invocable: false
---

# Skill: Splitting

Ce skill fournit les techniques et guidelines pour decouper un projet en packages livrables coherents.

## Ce que produit le Splitter

**Output** : `.ship/packages/mapping.md`

Un document qui formalise :
- La liste des packages identifies
- Le perimetre de chaque package
- Le mapping exigences <-> packages
- Les dependances entre packages
- L'ordre d'implementation suggere

## Principes de decoupage

### Independance

Chaque package doit pouvoir etre deploye et teste independamment. Un package termine apporte de la valeur en soi.

### Couplage minimal

Les dependances entre packages doivent etre explicites, unidirectionnelles et minimisees. Pas de dependances circulaires.

### Couverture complete

Toute exigence du requirements.md doit etre mappee a au moins un package. Aucune exigence orpheline.

### Granularite adaptee

Ni trop de petits packages (overhead de coordination) ni un seul gros package (perte des benefices du decoupage).

## Techniques de decoupage

### Par domaine metier (DDD - Bounded Contexts)

**Principe** : Un package = un bounded context avec son vocabulaire propre

**Quand l'utiliser** :
- Domaines metier distincts et stables
- Equipes organisees par domaine
- Vocabulaire different selon les domaines

**Exemples** :
- E-commerce : catalog, orders, payments, shipping
- SaaS : auth, billing, core-product, analytics

**Avantages** :
- Alignement metier fort
- Responsabilites claires
- Evolution independante

**Risques** :
- Identification incorrecte des frontieres
- Entites partagees entre domaines

### Par feature utilisateur (Feature Teams)

**Principe** : Un package = une feature visible par l'utilisateur

**Quand l'utiliser** :
- Features independantes pour l'utilisateur final
- Product-led development
- MVP iteratif

**Exemples** :
- App mobile : onboarding, feed, profile, notifications
- Dashboard : reports, alerts, settings, export

**Avantages** :
- Valeur utilisateur directe
- Feedback rapide
- Priorisation facile

**Risques** :
- Duplication de code entre features
- Refactoring difficile si features melangees

### Par couche technique (Horizontal Slicing)

**Principe** : Separation stricte des responsabilites techniques

**Quand l'utiliser** :
- Architecture en couches imposee
- Equipes specialisees (frontend/backend/data)
- Contraintes de securite entre couches

**Exemples** :
- Web app : frontend, api, services, database
- Microservices : gateway, business-services, data-layer

**Avantages** :
- Separation des concerns
- Specialisation technique
- Reutilisation

**Risques** :
- Coordination inter-couches
- Latence accrue

### Par niveau de risque (Risk-first)

**Principe** : Isoler les parties risquees pour fail fast

**Quand l'utiliser** :
- Incertitudes techniques majeures
- Nouvelles technologies
- Integrations complexes

**Exemples** :
- AI app : core-algorithm, standard-api, integrations
- Migration : legacy-wrapper, new-implementation, migration-tools

**Avantages** :
- Validation rapide des risques
- Limitation de l'impact
- Apprentissage isole

**Risques** :
- Decoupage non-naturel
- Refactoring post-validation

### Par dependance (Dependency-driven)

**Principe** : Suivre le graphe de dependances naturel

**Quand l'utiliser** :
- Dependances techniques fortes
- Ordre d'implementation contraint
- Shared kernel necessaire

**Exemples** :
- Framework : core, plugins, extensions
- Library : primitives, utilities, high-level-api

**Avantages** :
- Ordre d'implementation clair
- Pas de blocage inter-packages
- Reutilisation naturelle

**Risques** :
- Peut ignorer les frontieres metier
- Shared kernel peut devenir fourre-tout

## Gestion des dependances

### Types de dependances

| Type | Description | Exemple |
|------|-------------|---------|
| **Technique (code)** | Import de modules, interfaces | `billing` importe `auth.User` |
| **Fonctionnelle (donnees)** | Production/consommation | `reports` consomme donnees de `tracking` |
| **Deploiement** | Infrastructure partagee | `api` et `worker` partagent la DB |

### Regles de dependance

1. **Unidirectionnelles** : A -> B mais pas B -> A
2. **Explicites** : Documentees dans mapping.md
3. **Minimisees** : Interfaces plutot qu'implementations
4. **Sans cycles** : Le graphe doit etre un DAG

### Detection de cycles

Si tu detectes un cycle (A -> B -> C -> A) :

1. Identifier l'entite partagee qui cause le cycle
2. Extraire cette entite dans un package "shared" ou "core"
3. Faire dependre A, B, C de "shared"

## Algorithme d'ordonnancement

```
1. Construire le graphe de dependances
2. Detecter les cycles (erreur si present)
3. Tri topologique pour l'ordre de base
4. Ajuster par priorite business (MUST d'abord)
5. Identifier les opportunites de parallelisation
6. Grouper en "vagues" d'implementation
```

### Exemple de vagues

```
Vague 1 (Fondations) : auth, shared-kernel
    -> Pas de dependances, peuvent etre paralleles

Vague 2 (Core) : billing, catalog
    -> Dependent de auth, peuvent etre paralleles entre eux

Vague 3 (Features) : checkout, reports
    -> Dependent de billing et catalog
```

## Mapping exigences -> packages

### Types de mapping

| Type | Description | Exemple |
|------|-------------|---------|
| **Direct** | Une exigence = un package | REQ-F001 -> auth |
| **Multiple** | Une exigence = plusieurs packages | REQ-F010 -> auth, billing |
| **Transverse** | Exigence qui impacte tous les packages | REQ-NF001 (perf) -> tous |

### Gestion des exigences transverses

Les exigences non-fonctionnelles (REQ-NF*) et certaines contraintes (REQ-C*) sont souvent transverses :

- **Performance** : Impact tous les packages
- **Securite** : Impact tous les packages exposes
- **Accessibilite** : Impact les packages UI

Dans le mapping, marquer ces exigences comme "(transverse)" et lister les packages concernes.

### Exigences orphelines

Si une exigence n'est mappee a aucun package :

1. Verifier qu'elle est toujours pertinente
2. Si oui, creer un package dedie ou l'ajouter a un existant
3. Si non, la documenter comme "hors scope v1" avec justification

## Checklist de qualite

Avant de finaliser le mapping.md :

- [ ] Tous les packages ont un perimetre clair
- [ ] Toutes les exigences REQ-* sont mappees
- [ ] Pas de dependance circulaire
- [ ] Ordre d'implementation defini
- [ ] Decoupage valide par l'utilisateur
- [ ] Complexite estimee pour chaque package
- [ ] Risques identifies pour chaque package

## Templates disponibles

Les templates sont dans le skill `ship-writing` :

| Template | Description | Fichier |
|----------|-------------|---------|
| **Mapping** | Format complet du mapping.md | `skills/ship-writing/templates/mapping.md` |
