# Plan de transition : v1 → Brief v2

## Décisions prises

| Question | Décision |
|----------|----------|
| Rétrocompatibilité | **Breaking change** - pas de support de l'ancienne structure |
| Executor | **Agent dédié** - même léger, pour rappeler les contraintes du scope |
| Commands | **Les deux** - commandes individuelles + /ship:flow pour enchaîner |
| Tracking packages | **Front-matter dans package.md** - statut YAML en tête de fichier |

---

## Résumé du différentiel

### État actuel (v1)
- **2 agents** : brainstormer, shaper
- **4 commands** : /ship:brainstorm, /ship:shape, /ship:help, /ship:status
- **3 skills** : ship-brainstorming, ship-shaping, ship-writing
- **Structure .ship/** : brief.md, packages/<nom>/{research.md, stack.md, requirements.md}

### Cible (v2)
- **8 agents** : brainstormer, brainstormer-prd, specifier, architect, splitter, shaper, executor, verifier
- **Structure .ship/** : brief.md, research.md, prd.md, requirements.md, architecture.md, packages/{mapping.md, <nom>/package.md, <nom>/verification.md}

---

## Changements majeurs

| Aspect | v1 | v2 | Impact |
|--------|----|----|--------|
| Agents | 2 | 8 | +6 nouveaux agents à créer |
| Flow | brainstorm → shape | brainstorm → prd → specify → architect → split → shape → execute → verify | Pipeline plus granulaire |
| research.md | Dans packages/<nom>/ | Racine .ship/ | Changement de localisation |
| requirements.md | Dans packages/<nom>/ | Racine .ship/ (global) | Devient global, pas par package |
| stack.md | Existe | Supprimé (fusionné dans architecture.md) | À supprimer |
| mapping.md | N'existe pas | packages/mapping.md | Nouveau fichier |
| verification.md | N'existe pas | packages/<nom>/verification.md | Nouveau fichier |
| prd.md | N'existe pas | Racine .ship/ | Nouveau fichier |
| architecture.md | N'existe pas | Racine .ship/ | Nouveau fichier |

---

## Plan d'implémentation

### Phase 1 : Refactoring du Brainstormer existant

**Fichiers à modifier** :
- `agents/ship-brainstormer.md`

**Changements** :
1. Simplifier les outputs : brief.md + research.md (optionnel) seulement
2. Retirer la logique qui produit les requirements (devient le job du specifier)
3. S'assurer que research.md va à la racine de .ship/ et non dans packages/

---

### Phase 2 : Création du Brainstormer PRD

**Nouveaux fichiers** :
- `agents/ship-brainstormer-prd.md`
- `commands/ship/prd.md`

**Responsabilités** :
- Input : brief.md + research.md (optionnel)
- Output : prd.md
- Creuser les fonctionnalités identifiées dans le brief
- Poser des questions pour clarifier les besoins

---

### Phase 3 : Création du Specifier

**Nouveaux fichiers** :
- `agents/ship-specifier.md`
- `commands/ship/specify.md`
- `skills/ship-specifying/SKILL.md` (templates requirements)

**Responsabilités** :
- Input : prd.md + research.md (optionnel)
- Output : requirements.md (SRS)
- Identifier exigences fonctionnelles, non-fonctionnelles, contraintes
- Prioriser (Must/Should/Nice-to-have)

---

### Phase 4 : Création de l'Architect

**Nouveaux fichiers** :
- `agents/ship-architect.md`
- `commands/ship/architect.md`
- `skills/ship-architecting/SKILL.md` (templates architecture)

**Responsabilités** :
- Input : requirements.md + prd.md + codebase existante
- Output : architecture.md
- Proposer architecture ou accepter celle du dev
- Justifier choix technologiques

---

### Phase 5 : Création du Splitter

**Nouveaux fichiers** :
- `agents/ship-splitter.md`
- `commands/ship/split.md`

**Responsabilités** :
- Input : requirements.md + architecture.md + prd.md
- Output : packages/mapping.md
- Découper en packages livrables
- Mapper exigences ↔ packages
- Identifier dépendances

---

### Phase 6 : Refactoring du Shaper existant

**Fichiers à modifier** :
- `agents/ship-shaper.md`
- `commands/ship/shape.md`
- `skills/ship-shaping/` (templates à adapter)

**Changements** :
1. Nouveaux inputs : mapping.md + prd.md + architecture.md + requirements.md
2. Nouveaux outputs : package.md + verification.md (au lieu de research.md, stack.md, requirements.md)
3. Retirer la logique de research (fait en amont)
4. Ajouter la génération des critères de vérification

---

### Phase 7 : Création de l'Executor

**Nouveaux fichiers** :
- `agents/ship-executor.md`
- `commands/ship/execute.md`

**Responsabilités** :
- Input : package.md (scope en cours)
- Output : Code implémenté selon le scope
- Rappeler les contraintes du scope (pas de scope creep)
- Mettre à jour le front-matter du package.md (status: executing → executed)
- Refuser d'implémenter ce qui est hors scope

**Front-matter package.md** :
```yaml
---
status: pending | shaping | shaped | executing | executed | verifying | done
current_scope: <nom-du-scope>
---
```

---

### Phase 8 : Création du Verifier

**Nouveaux fichiers** :
- `agents/ship-verifier.md`
- `commands/ship/verify.md`

**Responsabilités** :
- Input : package.md + verification.md + code implémenté
- Output : Rapport de vérification (pass/fail) dans verification.md
- Déclencher vérifications humaines si nécessaire (AskUserQuestion)
- Mettre à jour le front-matter du package.md (status: verifying → done ou → executing si fail)
- Gérer statuts par critère : pending, passed, failed

---

### Phase 9 : Mise à jour des commandes help et status

**Fichiers à modifier** :
- `commands/ship/help.md` : Documenter les nouvelles commandes
- `commands/ship/status.md` : Vérifier la nouvelle structure de fichiers, lire les front-matter des packages

---

### Phase 10 : Création de la commande flow

**Nouveaux fichiers** :
- `commands/ship/flow.md`

**Responsabilités** :
- Enchaîner les agents avec validation humaine entre chaque étape
- Détecter l'état actuel via les fichiers présents et les front-matter
- Proposer l'étape suivante appropriée
- Permettre de skip des étapes (ex: architecture fournie par le dev)

---

### Phase 11 : Templates et Skills

**Nouveaux skills** :
- `skills/ship-specifying/` : Templates pour requirements.md (SRS)
- `skills/ship-architecting/` : Templates pour architecture.md
- `skills/ship-verifying/` : Structure YAML pour verification.md

**Skills à modifier** :
- `skills/ship-shaping/templates/` : Adapter pour package.md au lieu de research/stack/requirements
- Supprimer `skills/ship-shaping/templates/research.md` et `stack.md`

**Skills à supprimer** :
- Les templates research.md, stack.md, requirements.md de ship-shaping (remplacés)

---

## Ordre d'implémentation recommandé

```
Phase 1  : Refactoring brainstormer (minimal)
    ↓
Phase 2  : Brainstormer PRD
    ↓
Phase 3  : Specifier
    ↓
Phase 4  : Architect
    ↓
Phase 5  : Splitter
    ↓
Phase 6  : Refactoring shaper (gros changement)
    ↓
Phase 7  : Executor
    ↓
Phase 8  : Verifier
    ↓
Phase 9  : Help et status
    ↓
Phase 10 : Flow (enchaînement)
    ↓
Phase 11 : Templates et skills
```

Les phases 7 et 8 peuvent être faites en parallèle.

---

## Fichiers à créer/modifier

### Nouveaux fichiers (14)
| Fichier | Description |
|---------|-------------|
| `agents/ship-brainstormer-prd.md` | Agent PRD |
| `agents/ship-specifier.md` | Agent Specifier |
| `agents/ship-architect.md` | Agent Architect |
| `agents/ship-splitter.md` | Agent Splitter |
| `agents/ship-executor.md` | Agent Executor |
| `agents/ship-verifier.md` | Agent Verifier |
| `commands/ship/prd.md` | Commande /ship:prd |
| `commands/ship/specify.md` | Commande /ship:specify |
| `commands/ship/architect.md` | Commande /ship:architect |
| `commands/ship/split.md` | Commande /ship:split |
| `commands/ship/execute.md` | Commande /ship:execute |
| `commands/ship/verify.md` | Commande /ship:verify |
| `commands/ship/flow.md` | Commande /ship:flow |
| `skills/ship-specifying/SKILL.md` | Skill Specifying |
| `skills/ship-architecting/SKILL.md` | Skill Architecting |
| `skills/ship-verifying/SKILL.md` | Skill Verifying |

### Fichiers à modifier (6)
| Fichier | Changement |
|---------|------------|
| `agents/ship-brainstormer.md` | Simplifier outputs |
| `agents/ship-shaper.md` | Nouveaux inputs/outputs |
| `commands/ship/shape.md` | Adapter au nouveau shaper |
| `commands/ship/help.md` | Documenter nouvelles commandes |
| `commands/ship/status.md` | Nouvelle structure de fichiers |
| `skills/ship-shaping/` | Adapter templates |

### Fichiers à supprimer (3)
| Fichier | Raison |
|---------|--------|
| `skills/ship-shaping/templates/research.md` | Remplacé par research global |
| `skills/ship-shaping/templates/stack.md` | Fusionné dans architecture.md |
| `skills/ship-shaping/templates/requirements.md` | Remplacé par requirements global |

---

## Vérification

Pour valider l'implémentation :

1. **Test du flow complet** :
   - idée → brief.md → prd.md → requirements.md → architecture.md → mapping.md → package.md → exécution → verification.md

2. **Tests par agent** :
   - Chaque agent produit le bon output
   - Chaque agent lit les bons inputs
   - Front-matter mis à jour correctement

3. **Tests de court-circuit** :
   - Architecture fournie par le dev (skip architect)
   - Brief déjà existant (skip brainstormer)
   - PRD déjà existant (skip brainstormer-prd)

4. **Test du tracking** :
   - /ship:status affiche l'état correct
   - Front-matter package.md reflète le status réel
