# Plan Détaillé - Phase 1 : Refactoring du Brainstormer

## 1. Analyse de l'Agent Actuel

### Structure Actuelle (v1)

**Fichier**: `agents/ship-brainstormer.md`

**Front-matter**:
```yaml
name: ship-brainstormer
description: "Transforme une idée vague en brief structuré."
model: opus
skills: ship-brainstorming, ship-writing
user-invocable: false
```

**Responsabilités actuelles**:
1. Recevoir une idée (vague ou précise)
2. Proposer une research domaine métier (optionnel)
3. Recommander une technique de brainstorming
4. Mener une session interactive
5. Produire un brief structuré

**Outputs actuels**:
- `.ship/brief.md` - Le brief structuré
- `.ship/research/domain.md` - Research domaine métier (si demandé)

**Problème identifié**:
Le chemin de research utilise `.ship/research/domain.md` (dans un sous-dossier `research/`) alors que le BRIEF-v2.md attend `.ship/research.md` (à la racine de `.ship/`).

### Points à Conserver

1. **Règles d'autonomie** - Excellent pattern, à garder
2. **Règles de regroupement des questions** - Efficient, à garder
3. **Workflow de brainstorming** - Core business, à garder
4. **Style de l'agent** - Identité à préserver
5. **Skills utilisés** - `ship-brainstorming`, `ship-writing` restent pertinents

### Points à Modifier

| Élément | Actuel | Cible v2 | Raison |
|---------|--------|----------|--------|
| Output research | `.ship/research/domain.md` | `.ship/research.md` | Simplification, devient global |
| Référence au Shaper | "servira de point de départ pour le Shaper" | Adapter | Le flow change (Brainstormer-PRD suit) |
| Section "Research" dans brief.md | Référence `.ship/research/domain.md` | Référence `.ship/research.md` | Nouveau chemin |

### Points à Retirer

**RIEN À RETIRER** pour la Phase 1. L'agent brainstormer actuel **ne produit pas de requirements**. C'est le Shaper actuel qui le fait. Le brainstormer est déjà conforme à la philosophie v2.

---

## 2. Changements à Apporter

### Changement 1 : Modifier le chemin de research.md

**Avant**:
```markdown
- `.ship/research/domain.md` : Research domaine métier (si demandé)
```

**Après**:
```markdown
- `.ship/research.md` : Research domaine métier (si demandé)
```

### Changement 2 : Mettre à jour le template du brief

**Avant**:
```markdown
## Research (si effectuée)
Voir `.ship/research/domain.md`
```

**Après**:
```markdown
## Research (si effectuée)
Voir `.ship/research.md`
```

### Changement 3 : Mettre à jour la description du rôle

**Avant**:
```markdown
clarifier son idée, la challenger, et produire un brief structuré qui servira de
point de départ pour le Shaper.
```

**Après**:
```markdown
clarifier son idée, la challenger, et produire un brief structuré qui servira de
point de départ pour le Brainstormer PRD.
```

### Changement 4 : Mettre à jour l'exemple de session

**Avant**:
```markdown
> J'ai créé le brief dans `.ship/brief.md` avec la research intégrée. Le Shaper
> pourra s'en servir pour découper ça en packages.
```

**Après**:
```markdown
> J'ai créé le brief dans `.ship/brief.md` avec la research dans `.ship/research.md`.
> Le Brainstormer PRD pourra s'en servir pour approfondir l'idée.
```

### Changement 5 : Clarifier les outputs dans l'intro

**Avant**:
```markdown
> Transforme une idée vague en brief structuré.
```

**Après**:
```markdown
> Transforme une idée vague en brief structuré (brief.md + research.md optionnel).
```

---

## 3. Format des Outputs

### Output 1 : brief.md

**Chemin** : `.ship/brief.md`

```markdown
# Brief : [Nom du projet]

## L'idée en une phrase
[Résumé concis - max 2 lignes]

## Contexte
[Pourquoi ce projet ? Quel problème/opportunité ?]

## Objectifs
- [Objectif 1]
- [Objectif 2]

## Utilisateurs cibles
[Qui va utiliser ça ?]

## Contraintes connues
- [Contrainte 1]
- [Contrainte 2]

## Premières idées / Directions
[Ce qui est ressorti du brainstorming - features de haut niveau]

## Questions ouvertes
[Ce qui reste à creuser - sera traité par le Brainstormer PRD]

## Research (si effectuée)
Voir `.ship/research.md`

---
_Généré par Brainstormer le [date]_
_Technique utilisée : [technique]_
```

### Output 2 : research.md (optionnel)

**Chemin** : `.ship/research.md`

```markdown
# Research : [Nom du projet]

## Contexte de la recherche
[Pourquoi cette recherche ? Quelles questions cherche-t-on à répondre ?]

## État de l'art

### Tendances actuelles
- [Tendance 1]
- [Tendance 2]

### Technologies/Solutions émergentes
- [Élément 1] : [Description courte]

## Solutions existantes / Concurrents

| Solution | Type | Points forts | Points faibles | Pertinence |
|----------|------|--------------|----------------|------------|
| [Nom] | [OSS/SaaS/...] | [+] | [-] | ⭐⭐⭐ |

## Patterns et anti-patterns

### Do's
- [Bonne pratique 1]

### Don'ts
- [Anti-pattern 1] : [Pourquoi c'est problématique]

## Insights pour le projet

### Opportunités identifiées
1. [Opportunité 1]

### Risques identifiés
1. [Risque 1] - Mitigation : [...]

### Recommandations
- [Recommandation 1]

## Sources
- [Titre source 1](url)

---
_Recherche effectuée le [date]_
```

---

## 4. Fichiers Impactés

### À Modifier

| Fichier | Modification |
|---------|--------------|
| `agents/ship-brainstormer.md` | Chemin research, références au flow, clarifications |
| `commands/ship/brainstorm.md` | Mettre à jour la doc des outputs |

### À Vérifier (pas de modification nécessaire)

| Fichier | Vérification |
|---------|--------------|
| `skills/ship-brainstorming/SKILL.md` | OK, pas de référence aux chemins de fichiers |
| `skills/ship-writing/SKILL.md` | OK, template brief.md générique |

---

## 5. Critères de Validation Phase 1

- [ ] Le chemin `.ship/research.md` est utilisé partout (pas `.ship/research/domain.md`)
- [ ] Les références au "Shaper" sont remplacées par "Brainstormer PRD"
- [ ] La section "Ce que tu ne fais PAS" mentionne explicitement : requirements, PRD, architecture
- [ ] L'exemple de session est cohérent avec le nouveau flow
- [ ] La commande `commands/ship/brainstorm.md` documente les bons outputs

---

## 6. Séquence d'Implémentation

1. Ouvrir `agents/ship-brainstormer.md`
2. Modifier la section `## Outputs` (chemin research)
3. Modifier le template brief.md dans `## Étape 5` (référence research)
4. Modifier la section `## Rôle` (référence au Brainstormer PRD)
5. Modifier la section `## Ce que tu ne fais PAS` (clarifier les frontières)
6. Modifier l'exemple de session (conclusion)
7. Ouvrir `commands/ship/brainstorm.md`
8. Mettre à jour la section `## Output` avec le bon chemin
9. Tester avec `/ship:brainstorm` pour valider
