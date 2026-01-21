# Plan Détaillé - Phase 11 : Templates et Skills

## Résumé des actions

### À CRÉER (7 fichiers)

| Fichier | Description |
|---------|-------------|
| `skills/ship-specifying/SKILL.md` | Skill Specifying |
| `skills/ship-specifying/templates/requirements.md` | Template SRS |
| `skills/ship-architecting/SKILL.md` | Skill Architecting |
| `skills/ship-architecting/templates/architecture.md` | Template Architecture |
| `skills/ship-verifying/SKILL.md` | Skill Verifying |
| `skills/ship-verifying/templates/verification.md` | Template Verification YAML |
| `skills/ship-shaping/templates/package.md` | Template Package |

### À MODIFIER (1 fichier)

| Fichier | Changement |
|---------|------------|
| `skills/ship-shaping/SKILL.md` | Adapter pour package.md |

### À SUPPRIMER (3 fichiers)

| Fichier | Raison |
|---------|--------|
| `skills/ship-shaping/templates/research.md` | Remplacé par research global |
| `skills/ship-shaping/templates/stack.md` | Fusionné dans architecture.md |
| `skills/ship-shaping/templates/requirements.md` | Remplacé par requirements global |

---

## 1. Skill ship-specifying

### Structure

```
skills/ship-specifying/
├── SKILL.md
└── templates/
    └── requirements.md
```

### SKILL.md - Contenu principal

- **Rôle** : Transformer un PRD en SRS (Software Requirements Specification)
- **Output** : `.ship/requirements.md`
- **Principes** :
  - Séparation : fonctionnel vs non-fonctionnel vs contrainte
  - Mesurabilité : NFR mesurables (pas "rapide" mais "< 200ms")
  - Priorisation MoSCoW : Must/Should/Could/Won't
  - Traçabilité : lien vers source PRD

### Template requirements.md

- Vue d'ensemble et scope
- Exigences fonctionnelles (REQ-F-XXX)
- Exigences non-fonctionnelles par catégorie :
  - Performance (REQ-NF-PERF-XXX)
  - Sécurité (REQ-NF-SEC-XXX)
  - Disponibilité (REQ-NF-AVAIL-XXX)
  - Scalabilité (REQ-NF-SCALE-XXX)
  - Maintenabilité (REQ-NF-MAINT-XXX)
  - Accessibilité (REQ-NF-A11Y-XXX)
- Contraintes :
  - Techniques (REQ-C-TECH-XXX)
  - Business (REQ-C-BIZ-XXX)
  - Réglementaires (REQ-C-REG-XXX)
- Résumé des priorités MoSCoW
- Glossaire
- Traçabilité

---

## 2. Skill ship-architecting

### Structure

```
skills/ship-architecting/
├── SKILL.md
└── templates/
    └── architecture.md
```

### SKILL.md - Contenu principal

- **Rôle** : Documenter l'architecture technique
- **Output** : `.ship/architecture.md`
- **Principes** :
  - Adapté aux NFR (architecture dépend des exigences non-fonctionnelles)
  - Justifié (chaque choix a une raison)
  - Humble (documenter les incertitudes)
  - Incrémental (ne pas sur-architecturer)

### Template architecture.md

- Vue d'ensemble avec diagramme ASCII
- Style architectural (monolithe/microservices/serverless)
- Composants principaux avec responsabilités
- Choix technologiques (stack)
- ADR (Architecture Decision Records)
- Points d'intégration (APIs externes/internes)
- Gestion des données
- Sécurité (auth, autorisation, chiffrement)
- Infrastructure (déploiement, hébergement, CI/CD)
- Risques techniques
- Conformité NFR

---

## 3. Skill ship-verifying

### Structure

```
skills/ship-verifying/
├── SKILL.md
└── templates/
    └── verification.md
```

### SKILL.md - Contenu principal

- **Rôle** : Définir et gérer les critères de vérification
- **Output** : `.ship/packages/<nom>/verification.md`
- **Types de vérification** :
  - `auto` : commande exécutable
  - `manual` : question à poser à l'utilisateur
- **Niveaux de blocage** :
  - `blocking` : doit passer
  - `warning` : note mais continue
  - `info` : informatif

### Template verification.md (format YAML)

```yaml
criteria:
  - id: VER-001
    description: "Description du critère"
    type: auto | manual
    blocking: blocking | warning | info
    status: pending | passed | failed
    scope: "Nom du scope"
    command: "commande"     # si auto
    question: "question"    # si manual
```

Sections :
- Résumé (total, auto, manual, status global)
- Critères par scope (YAML)
- Résultats du dernier run
- Historique

---

## 4. Modifications de ship-shaping

### Nouveau SKILL.md

- **Rôle** : Transformer le mapping en package.md exécutable
- **Output** : `.ship/packages/<nom>/package.md` + `verification.md`
- **Principes v2** :
  - Un package à la fois
  - Scopes indépendants (deployable, vérifiable, ordonné)
  - Truths, pas Tasks ("L'utilisateur peut..." pas "Implémenter...")
  - Not Included explicite

### Nouveau template package.md

```markdown
---
status: pending | shaping | shaped | executing | executed | verifying | done
current_scope: null | [nom-du-scope]
---

# Package : [Nom]

## Vision
[Description + Exigences couvertes]

## Scopes

### Scope 1 : [Nom]
- **Truths** : comportements observables
- **Artifacts** : fichiers à créer/modifier
- **Key Links** : connexions critiques

### Scope 2 : [Nom]
[...]

## Not Included
[Ce qui est explicitement hors scope]

## Choix techniques locaux
[Décisions spécifiques au package]

## Risques identifiés
[Tableau risques/mitigation]

## Definition of Done
[Critères de complétion]
```

---

## 5. Fichiers à supprimer

| Fichier | Raison |
|---------|--------|
| `skills/ship-shaping/templates/research.md` | Research maintenant à la racine `.ship/research.md` |
| `skills/ship-shaping/templates/stack.md` | Fusionné dans `architecture.md` |
| `skills/ship-shaping/templates/requirements.md` | Requirements maintenant global `.ship/requirements.md` |

---

## 6. Ordre d'implémentation

1. Créer `skills/ship-specifying/` (prérequis pour l'agent Specifier)
2. Créer `skills/ship-architecting/` (prérequis pour l'agent Architect)
3. Créer `skills/ship-verifying/` (prérequis pour l'agent Verifier)
4. Créer `skills/ship-shaping/templates/package.md` (nouveau template)
5. Modifier `skills/ship-shaping/SKILL.md` (adapter au nouveau workflow)
6. Supprimer les anciens templates de ship-shaping
