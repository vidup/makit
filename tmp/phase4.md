# Plan Détaillé - Phase 4 : Création de l'Architect

## Résumé

L'agent Architect propose ou valide une architecture technique basée sur les exigences.

**Flow** : brainstorm → prd → specify → **architect** → split → shape → execute → verify

---

## 1. Structure de l'agent `agents/ship-architect.md`

### Frontmatter

```yaml
---
name: ship-architect
description: "Propose ou valide une architecture technique basée sur les exigences."
model: opus
skills: ship-architecting, ship-writing
user-invocable: false
---
```

### Sections principales

1. **Règle d'autonomie** : 100% autonome, ne s'arrête que quand `architecture.md` est écrit
2. **Règle de regroupement des questions** : Utiliser `AskUserQuestion` avec max 4 questions
3. **Rôle** :
   - Casquettes : **Tech** (architecture, patterns, risques) + **Stratégie** (alignement avec exigences)
   - Question centrale : "Comment structurer techniquement ?"

### Ce que l'agent fait

- Analyser requirements.md (exigences fonctionnelles et NON FONCTIONNELLES)
- Analyser la codebase existante (WebSearch, exploration fichiers)
- Demander au dev s'il a une architecture en tête ou souhaite une proposition
- Proposer ou valider l'architecture
- Justifier chaque choix technique
- Identifier risques et mitigations

### Ce que l'agent ne fait PAS

- Découper en packages (job du Splitter)
- Planifier les scopes (job du Shaper)
- Implémenter (job de l'Executor)

### Workflow

1. Lire requirements.md et prd.md
2. Analyser la codebase existante
3. Demander au dev sa préférence (proposition vs validation)
4. Si proposition demandée, rechercher les architectures standards
5. Proposer l'architecture avec justifications
6. Valider avec le dev (itérations si nécessaire)
7. Produire `architecture.md`

### Point d'attention critique

> L'architecture est très dépendante des exigences NON FONCTIONNELLES. L'agent doit alerter si celles-ci ne sont pas assez précises/mesurables.

---

## 2. Structure de la commande `commands/ship/architect.md`

### Frontmatter

```yaml
---
name: ship:architect
description: "Lance l'agent Architect pour définir l'architecture technique"
---
```

### Syntaxe

```
/ship:architect
/ship:architect --propose  (forcer la proposition)
/ship:architect --validate path/to/my-arch.md  (valider une archi existante)
```

### Prerequisites

- `requirements.md` doit exister
- `prd.md` recommandé

### Output

`.ship/architecture.md`

---

## 3. Structure du skill `skills/ship-architecting/`

### Structure du dossier

```
skills/ship-architecting/
├── SKILL.md
├── templates/
│   └── architecture.md
└── patterns/
    ├── monolith.md
    ├── microservices.md
    ├── serverless.md
    ├── event-driven.md
    └── layered.md
```

### Guide de sélection rapide

```
Projet greenfield ?
  └─ Oui → Continue avec les exigences NF
  └─ Non → Analyser l'existant d'abord

Besoin de scalabilité horizontale ?
  └─ Oui → Microservices ou Serverless
  └─ Non → Continue...

Budget/complexité limités ?
  └─ Oui → Monolithe ou Layered
  └─ Non → Continue...

Charge imprédictible ?
  └─ Oui → Serverless
  └─ Non → Continue...

Beaucoup d'intégrations async ?
  └─ Oui → Event-driven
  └─ Non → Continue...

Par défaut → Layered (clean architecture)
```

---

## 4. Format du fichier `architecture.md`

```markdown
# Architecture : [Nom du projet]

## Vue d'ensemble

[Description de l'architecture en 2-3 phrases. Type d'architecture et justification principale.]

### Diagramme de haut niveau

```
[Diagramme ASCII des composants principaux]
```

---

## Composants principaux

### [Composant 1]

- **Responsabilité** : [Ce que fait ce composant]
- **Technologie** : [Techno choisie]
- **Justification** : [Pourquoi ce choix]
- **Interfaces** : [APIs exposées / consommées]

---

## Choix technologiques

| Catégorie | Choix | Alternatives considérées | Justification |
|-----------|-------|-------------------------|---------------|
| Runtime | [Ex: Node.js 20] | Deno, Bun | [Pourquoi] |
| Framework | [Ex: Next.js 14] | Remix, Astro | [Pourquoi] |
| Database | [Ex: PostgreSQL] | MongoDB, MySQL | [Pourquoi] |

---

## Exigences non-fonctionnelles adressées

| Exigence | Valeur cible | Comment l'architecture y répond |
|----------|--------------|--------------------------------|
| Disponibilité | 99.9% | [Ex: Multi-AZ, health checks] |
| Latence P95 | < 200ms | [Ex: CDN, caching, DB indexing] |

---

## Risques techniques et mitigations

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| [Risque 1] | Moyen | Élevé | [Comment on gère] |

---

## Sécurité

### Mesures spécifiques

- **Authentification** : [Ex: JWT + refresh tokens]
- **Autorisation** : [Ex: RBAC, policies]
- **Données sensibles** : [Ex: Encryption at rest/transit]

---

## Questions ouvertes

| Question | Impact | À résoudre avant |
|----------|--------|------------------|
| [Question 1] | Bloquant/Non-bloquant | [Phase/Milestone] |

---

_Document généré le [date]_
_Basé sur requirements.md v[version]_
```

---

## 5. Processus de validation avec le dev

### Étape 1 : Choix du mode

> "Pour l'architecture de ce projet, je peux :
> 1. **Proposer** une architecture basée sur les exigences
> 2. **Valider** une architecture que tu as déjà en tête
>
> Quelle approche préfères-tu ?"

### Étape 2A : Mode Proposition

1. Analyser les exigences non-fonctionnelles
2. Rechercher les patterns standards (WebSearch)
3. Explorer la codebase existante
4. Proposer avec justifications

### Étape 2B : Mode Validation

1. Demander au dev de décrire son architecture
2. Analyser la cohérence avec les exigences
3. Identifier les gaps ou risques
4. Proposer des améliorations

### Étape 3 : Itérations

Accepter les modifications du dev :
- "OK, je note que tu préfères [X] au lieu de [Y]. Je mets à jour."
- Si choix risqué : "Je comprends. Je note ce risque dans 'Risques techniques'."

### Étape 4 : Validation finale

> "Voici l'architecture finale :
> - **Type** : [Monolithe/Microservices/...]
> - **Composants** : [Liste]
> - **Choix majeurs** : [Résumé]
> - **Risques acceptés** : [Liste]
>
> Je peux écrire architecture.md ?"

### Cas spécial : Exigences NF insuffisantes

> "Pour définir une architecture cohérente, j'ai besoin d'exigences non-fonctionnelles plus précises :
> - Objectif de disponibilité (ex: 99.9%)
> - Objectif de latence (ex: P95 < 200ms)
> - Volume attendu (ex: 1000 req/s)
>
> Tu veux qu'on les définisse maintenant, ou revenir au Specifier ?"

---

## 6. Fichiers à créer

| Fichier | Description |
|---------|-------------|
| `agents/ship-architect.md` | Agent principal |
| `commands/ship/architect.md` | Commande /ship:architect |
| `skills/ship-architecting/SKILL.md` | Skill avec guidelines |
| `skills/ship-architecting/templates/architecture.md` | Template du livrable |
| `skills/ship-architecting/patterns/monolith.md` | Pattern monolithe |
| `skills/ship-architecting/patterns/microservices.md` | Pattern microservices |
| `skills/ship-architecting/patterns/serverless.md` | Pattern serverless |
| `skills/ship-architecting/patterns/event-driven.md` | Pattern event-driven |
| `skills/ship-architecting/patterns/layered.md` | Pattern en couches |
