# Plan Détaillé - Phase 3 : Création du Specifier

## Résumé

Le Specifier transforme un PRD (Product Requirements Document) en SRS (Software Requirements Specification).

**Position dans le flow** :
```
BRAINSTORMER → PRD → **SPECIFIER** → ARCHITECT → SPLITTER → ...
```

**Inputs** : `.ship/prd.md` + `.ship/research.md` (optionnel)
**Output** : `.ship/requirements.md`

---

## 1. Structure de l'Agent `agents/ship-specifier.md`

### Frontmatter

```yaml
---
name: ship-specifier
description: "Transforme un PRD en requirements formels (SRS)."
model: opus
skills: ship-specifying, ship-writing
user-invocable: false
---
```

### Rôle

Casquette : **Analyste** - Comprendre et formaliser les besoins
Question centrale : "Quelles sont les exigences à satisfaire ?"

### Ce que l'agent fait

- Analyser le PRD pour extraire les besoins implicites et explicites
- Catégoriser : fonctionnel vs non-fonctionnel vs contrainte
- Prioriser avec MoSCoW (Must/Should/Could/Won't)
- Définir des critères d'acceptation mesurables
- Poser des questions pour clarifier les ambiguïtés

### Ce que l'agent ne fait PAS

- Décider du "comment" (c'est pour l'Architect)
- Proposer des solutions techniques
- Découper en packages (c'est pour le Splitter)
- Parler d'architecture ou de code

### Workflow

1. **Lire et analyser le PRD** : identifier thèmes et fonctionnalités
2. **Extraction des exigences** : fonctionnelles, non-fonctionnelles, contraintes
3. **Clarification interactive** : poser des questions groupées
4. **Priorisation MoSCoW** : proposer puis valider avec l'utilisateur
5. **Production du requirements.md** : générer selon template SRS

---

## 2. Structure de la Commande `commands/ship/specify.md`

### Frontmatter

```yaml
---
name: ship:specify
description: "Transforme un PRD en requirements formels (SRS)"
---
```

### Syntaxe

```
/ship:specify
/ship:specify path/to/custom-prd.md
```

### Prerequisites

- Un PRD doit exister (via `/ship:prd` ou manuellement)

### Output

`.ship/requirements.md`

---

## 3. Structure du Skill `skills/ship-specifying/`

### Structure du dossier

```
skills/ship-specifying/
├── SKILL.md
├── templates/
│   └── requirements-srs.md
└── techniques/
    ├── moscow.md
    └── extraction.md
```

### SKILL.md - Contenu principal

1. **Ce que produit le Specifier** : `.ship/requirements.md`
2. **Templates disponibles** : requirements-srs.md
3. **Techniques disponibles** : MoSCoW, Extraction
4. **Principes de spécification** :
   - Complétude : Couvrir tous les besoins du PRD
   - Non-ambiguïté : Une seule interprétation possible
   - Vérifiabilité : Chaque exigence doit être testable
   - Traçabilité : Lien clair entre PRD et exigences

5. **Catégories d'exigences** :
   - **REQ-F*** : Fonctionnelles (ce que le système DOIT faire)
   - **REQ-NF*** : Non-fonctionnelles (performance, sécurité, disponibilité, accessibilité, maintenabilité)
   - **REQ-C*** : Contraintes (techniques, business, réglementaires)

---

## 4. Format du fichier requirements.md

```markdown
# Requirements : [Nom du Projet]

> Software Requirements Specification (SRS)

---

## Meta

| Attribut | Valeur |
|----------|--------|
| Version | 1.0 |
| Date | [date] |
| Source | .ship/prd.md |
| Statut | Draft / Review / Approved |

---

## Vue d'ensemble

### Description du projet
[Résumé en 2-3 phrases]

### Portée
**Inclus** : [Ce qui est dans le scope]
**Exclu** : [Ce qui est hors scope]

### Glossaire
| Terme | Définition |
|-------|------------|
| [Terme 1] | [Définition] |

---

## Exigences fonctionnelles

### [Domaine fonctionnel 1]

- [ ] **REQ-F001** : [Description]
  - **Critère d'acceptation** : [Comment vérifier]
  - **Priorité** : Must | Should | Could
  - **Source PRD** : [Section du PRD]

---

## Exigences non-fonctionnelles

### Performance
- [ ] **REQ-NF001** : [Ex: Temps de réponse API < 200ms au P95]

### Sécurité
- [ ] **REQ-NF010** : [Ex: Authentification requise]

### Disponibilité
- [ ] **REQ-NF020** : [Ex: Uptime 99.9%]

### Accessibilité
- [ ] **REQ-NF030** : [Ex: WCAG 2.1 AA]

### Maintenabilité
- [ ] **REQ-NF040** : [Ex: Couverture tests > 80%]

---

## Contraintes

### Techniques
- [ ] **REQ-C001** : [Ex: Compatible Node.js 18+]

### Business
- [ ] **REQ-C010** : [Ex: Livraison avant Q2]

### Réglementaires
- [ ] **REQ-C020** : [Ex: Conformité RGPD]

---

## Priorités (MoSCoW)

### Must have
[Liste des REQ-* obligatoires]

### Should have
[Liste des REQ-* importants]

### Could have
[Liste des REQ-* bonus]

### Won't have (cette version)
[Liste des fonctionnalités reportées]

---

## Traçabilité

| Requirement | Source PRD | Validé par |
|-------------|------------|------------|
| REQ-F001 | PRD section 2.1 | [Nom/Date] |

---

## Questions

### Résolues
| # | Question | Réponse | Date |
|---|----------|---------|------|
| Q1 | [Question] | [Réponse] | [Date] |

### Ouvertes
| # | Question | Impact | Assigné à |
|---|----------|--------|-----------|
| Q2 | [Question] | Bloquant/Non-bloquant | [Qui] |

---

_Généré par Specifier le [date]_
```

---

## 5. Méthodologie de priorisation MoSCoW

### Les 4 catégories

| Catégorie | Définition | Question clé |
|-----------|------------|--------------|
| **MUST** | Sans ça, le produit est inutilisable | "Si on ne fait pas ça, peut-on livrer ?" |
| **SHOULD** | Important mais livrable sans | "Beaucoup de valeur pour effort raisonnable ?" |
| **COULD** | Nice-to-have | "Améliore l'expérience sans être critique ?" |
| **WON'T** | Hors scope cette version | "Peut-on reporter à plus tard ?" |

### Approche

1. **Extraction automatique initiale** : l'agent propose une priorisation
2. **Validation interactive** : questions groupées pour ajuster
3. **Règle** : Maximum 60% des exigences en MUST

---

## 6. Technique d'extraction d'exigences

### Étapes

1. **Lecture analytique** : repérer verbes d'action, entités, contraintes, qualificatifs
2. **Extraction fonctionnelle** : "[Acteur] peut [action] pour [résultat]"
3. **Extraction non-fonctionnelle** : convertir les qualificatifs ("rapide" → "latence cible ?")
4. **Extraction des contraintes** : technologiques, délais, réglementaires, budget
5. **Vérification de complétude** : checklist finale

### Ambiguïtés courantes à clarifier

| Expression ambiguë | Question à poser |
|--------------------|------------------|
| "La plupart des utilisateurs" | Quel pourcentage ? |
| "Rapidement" | En combien de temps ? |
| "Interface intuitive" | Quels critères UX mesurables ? |
| "Données sensibles" | Quelles données spécifiquement ? |

---

## 7. Fichiers à créer

| Fichier | Description |
|---------|-------------|
| `agents/ship-specifier.md` | Agent principal |
| `commands/ship/specify.md` | Commande /ship:specify |
| `skills/ship-specifying/SKILL.md` | Skill principal |
| `skills/ship-specifying/templates/requirements-srs.md` | Template SRS |
| `skills/ship-specifying/techniques/moscow.md` | Technique de priorisation |
| `skills/ship-specifying/techniques/extraction.md` | Technique d'extraction |

---

## 8. Points d'attention

1. **Lien avec research.md** : Si présent, enrichir les NFR avec les insights
2. **Pas de technique/architecture** : Résister à la tentation de parler de solutions techniques
3. **Critères d'acceptation** : Chaque REQ doit avoir un critère vérifiable
4. **Traçabilité** : Chaque exigence pointe vers sa source dans le PRD
