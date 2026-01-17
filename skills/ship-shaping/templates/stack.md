# Template: Stack

Ce template structure les choix techniques pour un package.

---

## Structure du document

```markdown
# Stack : [Nom du package]

## Décision

[ ] **Pas de changement** - On utilise la stack existante
[ ] **Nouvelles technologies** - Détails ci-dessous

---

## Technologies

### Stack existante utilisée

| Catégorie | Technologie | Version | Usage dans ce package |
|-----------|-------------|---------|----------------------|
| [Runtime] | [Node.js] | [20.x] | [Serveur API] |
| [Framework] | [Next.js] | [14.x] | [Frontend] |
| ... | ... | ... | ... |

### Nouvelles technologies (si applicable)

| Catégorie | Technologie | Version | Justification |
|-----------|-------------|---------|---------------|
| [Catégorie] | [Nom] | [Version] | [Pourquoi ce choix ?] |

#### Détail : [Nouvelle techno 1]

- **Pourquoi** : [Justification détaillée]
- **Alternatives considérées** :
  - [Alternative A] : Rejetée car [raison]
  - [Alternative B] : Rejetée car [raison]
- **Risques** : [Risques identifiés]
- **Mitigation** : [Comment on gère les risques]

---

## Intégration avec l'existant

### Points d'intégration

- [Point 1] : [Comment ça s'intègre]
- [Point 2] : [Comment ça s'intègre]

### Modifications nécessaires

- [ ] [Modification 1]
- [ ] [Modification 2]

### Compatibilité

- **Versions Node.js** : [Versions supportées]
- **Navigateurs** : [Navigateurs cibles]
- **Autres** : [Contraintes de compatibilité]

---

## Risques identifiés

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| [Risque 1] | Faible/Moyen/Élevé | Faible/Moyen/Élevé | [Comment mitiger] |
| [Risque 2] | ... | ... | ... |

---

## Dépendances externes

| Dépendance | Type | Criticité | Fallback |
|------------|------|-----------|----------|
| [API externe] | Service | Critique | [Plan B si indispo] |
| [Lib NPM] | Package | Moyenne | [Alternative] |

---

## Décisions techniques

### [Décision 1]

- **Contexte** : [Situation qui nécessite une décision]
- **Options** :
  1. [Option A]
  2. [Option B]
- **Décision** : [Option choisie]
- **Raison** : [Pourquoi]

### [Décision 2]

...

---

_Document généré le [date]_
```

---

## Guidelines

### Décision principale

- Toujours commencer par clarifier si on change la stack ou non
- Si pas de changement, le document peut être court
- Si changements, détailler chaque nouvelle technologie

### Justification des choix

- Chaque nouvelle techno doit avoir une justification claire
- Lister les alternatives considérées et pourquoi elles sont rejetées
- Ne pas choisir une techno "parce qu'elle est hype"

### Intégration

- Identifier tous les points de contact avec l'existant
- Lister les modifications nécessaires
- Anticiper les problèmes de compatibilité

### Risques

- Être honnête sur les risques
- Chaque risque doit avoir une mitigation
- Ne pas minimiser les risques pour "vendre" une techno

### Dépendances externes

- Lister toutes les dépendances critiques
- Prévoir un fallback pour les services tiers
- Évaluer la stabilité des dépendances (maintenance active ?)
