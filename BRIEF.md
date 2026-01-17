# Ship - Brief Projet

> Un toolkit pour augmenter Claude Code avec un workflow pragmatique centré sur
> l'humain.

## Philosophie

### Ce qu'on rejette

- **Le roleplay d'équipe** : Pas de Scrum Master IA, pas de Product Owner IA. Un
  agent n'est pas une équipe d'humains.
- **Le waterfall déguisé** : Pas de "on génère tout puis on attend".
- **La complexité inutile** : Pas de cérémonie Agile, pas de Jira mental.
- **L'agent autonome sans contrôle** : L'humain doit pouvoir intervenir.

### Ce qu'on veut

- **Pragmatisme** : Get shit done, sans bullshit.
- **Contrôle humain** : L'utilisateur valide, intervient, décide.
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
- **Cuttable** : Dans Shape Up original, on peut couper les scopes de fin. Ici,
  pas besoin, mais l'idée est de pouvoir VERIFIER chaque scope indépendamment.

**Règle d'or** : Le scope N est vérifiable seul. Le scope N+1 peut dépendre de
N, mais jamais l'inverse.

---

## Structure

### Hiérarchie

```
PROJET (le repo, la vision globale, dure dans le temps)
    │
    └── PACKAGES (shaped work de 2-6 semaines, creusé fonctionnellement)
            │
            └── SCOPES (morceaux indépendants et livrables dans un package)
```

### Organisation des fichiers

```
.ship/
├── project.md                    # Vision globale du projet
├── docs.yaml                     # Sources de documentation
│
└── packages/
    │
    ├── mon-package/
    │   ├── research.md           # State of the art, do's/don'ts (optionnel)
    │   ├── requirements.md       # Fonctionnel, qualité, contraintes
    │   ├── stack.md              # Choix techniques si besoin (ou juste "ça passe")
    │   └── package.md            # LE document central : vision + scopes
    │
    └── autre-package/
        └── ...
```

### Contenu des fichiers

**`project.md`** : Le brief global du projet

- Vision, contexte, objectifs
- Ce qu'on construit et pourquoi
- Contraintes générales

**`package.md`** : Le coeur d'un shaped package

- Vision du package (le "quoi" et le "pourquoi")
- Liste des scopes avec leur description
- Laisse de la liberté sur le "comment"

**`requirements.md`** : Les exigences du package

- Exigences fonctionnelles (ce que ça fait)
- Exigences de qualité (comment ça le fait)
- Contraintes (ce qu'on doit respecter)

**`research.md`** : La recherche en amont (optionnel)

- State of the art
- Do's and don'ts
- Références, liens, exemples

**`stack.md`** : Choix techniques (si pertinent)

- Technologies utilisées
- Ou simplement "stack existante, pas de changement"

---

## Agents

Quatre agents principaux, chacun avec des compétences spécialisées.

### BRAINSTORMER (point d'entrée, optionnel)

**Casquettes** : Product + Stratégie

| Product | Stratégie |
|---------|-----------|
| Clarifier le besoin | Évaluer le contexte marché |
| Extraire la valeur | Identifier les opportunités |
| Formuler l'objectif | Anticiper les risques |

**Responsabilités** :
- Recevoir une idée (vague ou précise)
- Recommander et appliquer une technique de brainstorming
- Mener une session interactive avec l'utilisateur
- Proposer une research domaine métier (optionnel)
- Produire un brief structuré

**Output** : `.ship/brief.md` + `.ship/research/domain.md` (optionnel)

**Techniques disponibles** : 5 Whys, SCAMPER, Mind Mapping, Reverse Brainstorming, Six Thinking Hats, Starbursting, SWOT

→ Fiches techniques : `resources/brainstorming/`

→ Agent : `.claude/agents/brainstormer.md`

---

### SHAPER (niveau projet)

**Casquettes** : Product + Tech

| Product | Tech |
|---------|------|
| Comprendre le besoin utilisateur | Évaluer la faisabilité |
| Définir les exigences fonctionnelles | Choisir/valider la stack |
| Prioriser ce qui apporte de la valeur | Anticiper les contraintes techniques |
| Cadrer le "quoi" et le "pourquoi" | Identifier les risques d'implémentation |

**Responsabilités** :
- Créer un package (dossier + documents)
- Lancer/orchestrer la research (via sous-agents)
- Produire les requirements
- Définir la stack si besoin
- Avoir une vue sur les autres packages (conflits, dépendances)
- Mettre à jour les autres packages quand un est terminé

**Output** : Dossier package avec `research.md`, `requirements.md`, `stack.md`

---

### PLANNER (niveau package)

**Casquettes** : Product + Tech (orienté organisation)

| Product | Tech |
|---------|------|
| Grouper les requirements en scopes cohérents | Identifier les artefacts nécessaires par scope |
| S'assurer que chaque scope apporte de la valeur | Créer le dependency graph |
| Respecter la règle Shape Up (scope N vérifiable seul) | Détecter ce qui peut être parallélisé |
| | Appliquer goal-backward |

**Responsabilités** :
- Prendre les requirements d'un package
- Les organiser en scopes ordonnés
- Pour chaque scope, définir les "must-haves" :
  - **Truths** : comportements observables ("l'utilisateur peut...")
  - **Artifacts** : fichiers/composants nécessaires
  - **Key links** : connexions critiques entre éléments
- Produire un document exécutable

**Output** : `package.md` avec les scopes détaillés

**Méthode** : Goal-backward (partir de l'objectif final, remonter vers ce qui doit exister)

---

### VERIFIER (niveau scope)

**Casquettes** : QA + Product

| QA | Product |
|----|---------|
| Vérifier que ce qui devait être fait est fait | Vérifier que la valeur promise est livrée |
| Tester les critères définis par le Planner | Valider du point de vue utilisateur |
| Détecter les écarts attendu vs réalisé | Identifier ce qui nécessite vérification humaine |

**Responsabilités** :
- Après exécution d'un scope, vérifier les must-haves
- Lister ce qui passe / ce qui échoue
- Pour les échecs : diagnostiquer et remonter au Planner
- Déclencher les vérifications humaines si nécessaire (UI, UX)

**Output** : Rapport de vérification (pass/fail par critère, diagnostics)

---

### Flow entre agents

```
BRAINSTORMER (optionnel)
    │
    │   Idée vague → Brief structuré
    │   + Research domaine (optionnel)
    │
    ▼
SHAPER
    │
    │   Brief → Package(s)
    │   (research technique, requirements, stack)
    │
    ▼
PLANNER
    │
    │   Requirements → Scopes
    │   (package.md avec must-haves)
    │
    ▼
EXECUTOR ──────────────────┐
    │                      │
    │   Implémente         │
    │                      │
    ▼                      │
VERIFIER                   │
    │                      │
    ├── PASS ──→ Scope suivant
    │                      │
    └── FAIL ──→ Retour ───┘
```

---

## Capacités

### 1. Initialisation projet

Quand on arrive sur un nouveau projet ou une codebase existante :

- **Découvrir** la codebase (si existante) : structure, stack, documentation
- **Questionner** l'utilisateur pour clarifier la vision
- **Générer** le `project.md` avec la vision globale
- **Enregistrer** les sources de documentation dans `docs.yaml`

### 2. Shaping d'un package

Quand on démarre un nouveau travail (2-6 semaines) :

- **Créer** un dossier package dans `.ship/packages/`
- **Rechercher** (optionnel, proposé à l'utilisateur) :
  - Questions pour comprendre le domaine
  - Recherche web (state of the art, best practices)
  - Exploration codebase (patterns existants)
  - Synthèse dans `research.md`
- **Définir les requirements** :
  - Exigences fonctionnelles
  - Exigences de qualité
  - Contraintes
  - Validation par l'utilisateur
- **Définir la stack** (si nouveau projet ou changements)
- **Créer le package.md** :
  - Vision du package
  - Découpage en scopes indépendants
  - Chaque scope apporte de la valeur

### 3. Exécution d'un scope

Quand on implémente un scope :

- **Planifier** l'implémentation du scope
- **Exécuter** via sous-agents (contexte frais)
- **Vérifier automatiquement** selon les critères définis
- **Boucler** jusqu'à ce que ça passe
- **Vérifications humaines** si besoin (UI, comportement)
- **Commiter** de manière atomique

### 4. Reprise et continuité

À tout moment :

- **Sauvegarder** l'état pour reprendre plus tard
- **Reprendre** là où on en était
- **Voir le statut** : où en est-on ?

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
- Parallélisation automatique quand c'est possible

---

## Gestion de la documentation

### Découverte automatique

1. Scan de la codebase pour trouver :
   - `README.md`, `docs/`, `documentation/`
   - Fichiers de config commentés
   - Liens externes dans le code

2. Proposition via questions à l'utilisateur :
   - Liste des sources trouvées
   - L'utilisateur valide/invalide chaque source

3. Enregistrement dans `docs.yaml` :

```yaml
# .ship/docs.yaml - Éditable manuellement
sources:
  - path: ./README.md
    type: overview
  - path: ./docs/api/
    type: api-reference
  - url: https://example.com/external-docs
    type: external
    description: "Documentation de la lib X"
```

---

## Points d'attention

### Simplicité avant tout

- Les valeurs par défaut sont sensées
- On ne demande que ce qui est nécessaire
- On propose, l'utilisateur valide

### L'humain dans la boucle

- Validation des requirements
- Validation du découpage en scopes
- Vérifications humaines pour ce que l'agent ne peut pas vérifier
- Possibilité d'intervenir à tout moment

### Shaping > Coding

- On creuse la fonctionnalité au maximum en amont
- Le package.md documente le "quoi", pas le "comment"
- L'implémentation suit les guidelines si elles existent

---

## À définir

- **Milestones** : Dans le package ? Dossier séparé ? À voir en pratique.
- **Rollback** : Mécanisme pour annuler si ça part mal ?
- **Format exact des documents** : On le découvrira en itérant.

---

## Décisions prises

| Question             | Décision                          |
| -------------------- | --------------------------------- |
| Format des documents | **Markdown** (lisible, éditable)  |
| Parallélisation      | **Automatique** (l'agent détecte) |
| Structure            | **Projet > Packages > Scopes**    |
| Research             | **Optionnelle mais proposée**     |

---

_Document de travail - à itérer_
