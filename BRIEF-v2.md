# Ship - Brief Projet v2

> Un toolkit pour augmenter Claude Code avec un workflow pragmatique centré sur
> l'humain.

## Philosophie

### Ce qu'on rejette

- **Le roleplay d'équipe** : Pas de Scrum Master IA, pas de Product Owner IA. Un
  agent n'est pas une équipe d'humains.
- **Le waterfall déguisé** : Pas de "on génère tout puis on attend".
- **La complexité inutile** : Pas de cérémonie Agile, pas de Jira mental.
- **L'agent autonome sans contrôle** : L'humain doit pouvoir intervenir.
- **Le monolithe documentaire** : Pas de méga-document qui fait tout.

### Ce qu'on veut

- **Pragmatisme** : Get shit done, sans bullshit.
- **Contrôle humain** : L'utilisateur valide, intervient, décide.
- **Séparation des discussions** : Chaque étape = une conversation distincte.
- **Gestion intelligente du contexte** : Éviter le "context rot" via sous-agents
  et checkpoints.
- **Simplicité** : Moins de détails inutiles = agent plus efficace.
- **Mémoire persistante** : Reprendre là où on en était, toujours.
- **Shaping avant coding** : On creuse la fonctionnalité à fond, ensuite
  l'implémentation suit.

### Approche Shape Up

Chaque **scope** doit être :

- **Déployable indépendamment** : Une fois terminé, il apporte de la valeur en
  soi
- **Vérifiable seul** : Pas besoin d'attendre le scope suivant pour valider
- **Cuttable** : On peut couper les scopes de fin si retard

**Règle d'or** : Le scope N est vérifiable seul. Le scope N+1 peut dépendre de
N, mais jamais l'inverse.

---

## Structure

### Hiérarchie

```
PROJET (le repo, la vision globale, dure dans le temps)
    │
    └── PACKAGES (shaped work, creusé fonctionnellement)
            │
            └── SCOPES (morceaux indépendants et livrables dans un package)
```

### Organisation des fichiers

```
.ship/
├── brief.md                      # Output brainstormer
├── prd.md                        # Output specifier (exigences globales)
├── architecture.md               # Output architect (ou fourni par le dev)
├── mapping.md                    # Output splitter (exigences ↔ packages)
│
└── packages/
    ├── index.md                  # Index de tous les packages
    │
    ├── auth/
    │   └── package.md            # Output shaper
    │
    └── dashboard/
        └── package.md            # Output shaper
```

### Contenu des fichiers

**`brief.md`** : L'idée structurée (output brainstormer)

- Résumé de l'idée en une phrase
- Contexte (pourquoi, problème/opportunité)
- Objectifs
- Utilisateurs cibles
- Contraintes connues
- Premières directions
- Questions ouvertes

**`prd.md`** : Les exigences globales (output specifier)

- Exigences fonctionnelles (ce que ça fait)
- Exigences non-fonctionnelles (qualité, performance, sécurité)
- Contraintes (techniques, business, réglementaires)
- Priorités (Must/Should/Nice-to-have)
- Critères d'acceptation globaux

**`architecture.md`** : La structure technique (output architect ou fourni)

- Vue d'ensemble de l'architecture
- Composants principaux et leurs responsabilités
- Choix technologiques avec justifications
- Points d'intégration
- Risques techniques et mitigations

**`mapping.md`** : Le découpage (output splitter)

- Liste des packages identifiés
- Pour chaque package : périmètre et exigences couvertes
- Dépendances entre packages
- Ordre suggéré d'implémentation

**`package.md`** : La planification d'UN package (output shaper)

- Vision du package (le "quoi" et le "pourquoi")
- Exigences couvertes (référence au PRD)
- Scopes ordonnés avec must-haves
- Not included (ce qui est explicitement hors scope)
- Choix techniques locaux (si différents de l'archi globale)
- Critères de vérification (pour le verifier)

---

## Agents

Six agents, chacun responsable d'une discussion distincte.

### BRAINSTORMER

**Discussion** : "C'est quoi l'idée ?"

| Responsabilités |
|-----------------|
| Recevoir une idée (vague ou précise) |
| Recommander et appliquer une technique de brainstorming |
| Mener une session interactive avec l'utilisateur |
| Proposer une research domaine métier (optionnel) |
| Produire un brief structuré |

**Input** : Idée de l'utilisateur

**Output** : `.ship/brief.md`

**Techniques** : 5 Whys, SCAMPER, Mind Mapping, Reverse Brainstorming, Six
Thinking Hats, Starbursting, SWOT

---

### SPECIFIER

**Discussion** : "Quelles sont les exigences à satisfaire ?"

| Responsabilités |
|-----------------|
| Analyser le brief |
| Poser des questions pour clarifier les besoins |
| Identifier les exigences fonctionnelles |
| Identifier les exigences non-fonctionnelles |
| Documenter les contraintes |
| Prioriser (Must/Should/Nice-to-have) |

**Input** : `.ship/brief.md`

**Output** : `.ship/prd.md`

**Note** : Le specifier ne décide pas du "comment", seulement du "quoi".

---

### ARCHITECT

**Discussion** : "Comment structurer techniquement ?"

| Responsabilités |
|-----------------|
| Analyser le PRD et la codebase existante |
| Proposer une architecture adaptée |
| Justifier les choix technologiques |
| Identifier les risques techniques |
| Documenter les points d'intégration |

**Input** : `.ship/prd.md` + codebase existante

**Output** : `.ship/architecture.md`

**Note** : Cette étape peut être court-circuitée si le dev fournit directement
l'architecture. L'agent doit demander : "Avez-vous une architecture en tête ou
voulez-vous que je propose ?"

---

### SPLITTER

**Discussion** : "Comment découper en packages livrables ?"

| Responsabilités |
|-----------------|
| Analyser le PRD et l'architecture |
| Identifier les frontières naturelles (domaines, features, couches) |
| Proposer un découpage en packages |
| Créer le mapping exigences ↔ packages |
| Identifier les dépendances entre packages |
| Suggérer un ordre d'implémentation |

**Input** : `.ship/prd.md` + `.ship/architecture.md`

**Output** : `.ship/mapping.md` + `.ship/packages/index.md`

**Techniques de découpage** :
- Par domaine métier
- Par feature utilisateur
- Par couche technique
- Par niveau de risque
- Par dépendance

---

### SHAPER

**Discussion** : "Comment planifier CE package précis ?"

| Responsabilités |
|-----------------|
| Prendre UN package du mapping |
| Définir les scopes (livrables indépendants) |
| Pour chaque scope, définir les must-haves |
| Expliciter ce qui est "not included" |
| Documenter les choix techniques locaux |
| Définir les critères de vérification |

**Input** : `.ship/mapping.md` + `.ship/prd.md` + `.ship/architecture.md`

**Output** : `.ship/packages/<nom>/package.md`

**Structure d'un scope** :
- **Truths** : comportements observables ("l'utilisateur peut...")
- **Artifacts** : fichiers/composants nécessaires
- **Key links** : connexions critiques entre éléments
- **Critères de vérification** : ce que le verifier doit checker

---

### VERIFIER

**Discussion** : "Est-ce que c'est bien fait ?"

| Responsabilités |
|-----------------|
| Vérifier les must-haves d'un scope |
| Lister ce qui passe / ce qui échoue |
| Diagnostiquer les échecs |
| Déclencher les vérifications humaines si nécessaire |

**Input** : `.ship/packages/<nom>/package.md` + code implémenté

**Output** : Rapport de vérification (pass/fail par critère)

---

## Flow entre agents

```
BRAINSTORMER
    │
    │   "C'est quoi l'idée ?"
    │   → brief.md
    │
    ▼
SPECIFIER
    │
    │   "Quelles sont les exigences ?"
    │   → prd.md
    │
    ▼
ARCHITECT ←────── (ou fourni par le dev)
    │
    │   "Comment structurer ?"
    │   → architecture.md
    │
    ▼
SPLITTER
    │
    │   "Comment découper ?"
    │   → mapping.md + packages/index.md
    │
    ▼
┌─────────────────────────────────────────┐
│ Pour CHAQUE package :                   │
│                                         │
│   SHAPER                                │
│       │                                 │
│       │   "Comment planifier ce pkg ?"  │
│       │   → packages/<pkg>/package.md   │
│       │                                 │
│       ▼                                 │
│   EXECUTOR ◄────────────┐               │
│       │                 │               │
│       │   Implémente    │               │
│       │                 │               │
│       ▼                 │               │
│   VERIFIER              │               │
│       │                 │               │
│       ├── PASS → Scope suivant          │
│       │                 │               │
│       └── FAIL ─────────┘               │
└─────────────────────────────────────────┘
```

---

## Principe de séparation des discussions

Chaque agent mène UNE conversation avec l'utilisateur :

| Agent | Question centrale | Ne fait PAS |
|-------|-------------------|-------------|
| Brainstormer | "C'est quoi l'idée ?" | Ne spécifie pas, ne découpe pas |
| Specifier | "Quelles exigences ?" | Ne décide pas du comment |
| Architect | "Quelle structure ?" | Ne découpe pas en packages |
| Splitter | "Comment découper ?" | Ne planifie pas les scopes |
| Shaper | "Comment planifier ce pkg ?" | Ne fait qu'UN package à la fois |
| Verifier | "C'est bien fait ?" | Ne corrige pas, remonte seulement |

**Avantages** :
- Chaque étape peut être refaite indépendamment
- Plus facile à debugger (on sait où ça a merdé)
- L'utilisateur peut intervenir à chaque étape
- Possibilité de fournir certains outputs manuellement (ex: architecture)

---

## Gestion du contexte

```
┌─────────────────────────────────────────────────────────────┐
│                    AGENT PRINCIPAL                          │
│  (garde une vue d'ensemble, communique avec l'humain)       │
└─────────────────────────┬───────────────────────────────────┘
                          │
          ┌───────────────┼───────────────┐
          │               │               │
          ▼               ▼               ▼
    ┌──────────┐    ┌──────────┐    ┌──────────┐
    │ Sous-    │    │ Sous-    │    │ Sous-    │
    │ agent    │    │ agent    │    │ agent    │
    │ (frais)  │    │ (frais)  │    │ (frais)  │
    └──────────┘    └──────────┘    └──────────┘

Chaque sous-agent = contexte vierge = pas de dégradation
```

- L'agent principal orchestre et communique avec l'humain
- Les sous-agents exécutent avec un contexte frais
- Les fichiers `.ship/` servent de mémoire persistante entre sessions

---

## Points d'attention

### Simplicité avant tout

- Les valeurs par défaut sont sensées
- On ne demande que ce qui est nécessaire
- On propose, l'utilisateur valide

### L'humain dans la boucle

- Validation à chaque étape
- Possibilité de fournir des outputs manuellement (ex: architecture)
- Possibilité d'intervenir à tout moment

### Shaping > Coding

- On creuse la fonctionnalité au maximum en amont
- Le package.md documente le "quoi", pas le "comment"
- L'implémentation suit les guidelines si elles existent

---

## Décisions prises

| Question | Décision |
|----------|----------|
| Format des documents | **Markdown** (lisible, éditable) |
| Séparation des étapes | **Un agent = une discussion** |
| Architecture | **Peut être fournie par le dev** |
| Découpage | **Agent splitter dédié** |
| Parallélisation | **Automatique** (l'agent détecte) |

---

## À définir

- **Techniques du Splitter** : Quelles heuristiques de découpage ?
- **Format exact du mapping.md** : Comment représenter le lien exigences ↔ packages ?
- **Reprise en cours de route** : Si on a déjà un PRD, on skip le specifier ?
- **Executor** : Agent dédié ou juste Claude Code standard ?

---

_Document de travail - à itérer_
