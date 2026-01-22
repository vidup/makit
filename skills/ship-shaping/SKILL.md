---
name: ship-shaping
description: "Templates et guidelines pour le shaping de packages en scopes indépendants"
user-invocable: false
---

# Skill: Shaping

Ce skill fournit les templates et guidelines pour la phase de shaping : planifier UN package en scopes indépendants avec critères de vérification.

## Ce que produit le Shaper

Le Shaper prend un package du mapping et produit sa planification détaillée :

```
.ship/packages/<nom-package>/
├── package.md       # Vision, scopes, truths, artifacts, key links
└── verification.md  # Critères de vérification par scope
```

**L'Executor viendra ensuite** implémenter scope par scope.

## Templates disponibles

Les templates sont dans le skill `ship-writing` :

| Template | Description | Fichier |
|----------|-------------|---------|
| **Package** | Planification du package en scopes | `skills/ship-writing/templates/package.md` |
| **Verification** | Critères de vérification | `skills/ship-writing/templates/verification.md` |

## Principes de shaping v2

### 1. UN package à la fois

Le Shaper se concentre sur UN seul package. Pour shaper un autre package, on relance l'agent.

### 2. Scopes indépendants

Chaque scope doit être :
- **Déployable seul** : apporte de la valeur en soi
- **Vérifiable seul** : pas besoin du scope suivant pour valider
- **Ordonné** : le scope N+1 peut dépendre de N, jamais l'inverse

### 3. Must-haves explicites

Pour chaque scope, on définit :
- **Truths** : comportements observables ("l'utilisateur peut...")
- **Artifacts** : fichiers/composants à créer
- **Key links** : connexions critiques entre éléments

### 4. Not included explicite

Ce qui est hors périmètre doit être documenté pour éviter le scope creep.

### 5. Critères de vérification

Chaque scope a des critères de vérification :
- **auto** : vérifiable par l'agent (tests, lint, build)
- **manual** : nécessite intervention humaine (UI, UX)
- **blocking** / **warning** / **info** : niveau de sévérité

## Bonnes pratiques

### Pour les scopes

- Commencer par le scope qui apporte le plus de valeur
- Limiter à 3-5 truths par scope
- Nommer les scopes par leur valeur utilisateur, pas par leur aspect technique

### Pour les truths

- Formuler en "L'utilisateur peut..." ou "Le système..."
- Vérifiables objectivement
- Granularité fine (pas de mega-truth)

### Pour les artifacts

- Lister les fichiers principaux, pas tous les fichiers
- Inclure le chemin relatif complet
- Décrire brièvement le rôle

### Pour les key links

- Se concentrer sur les connexions non-évidentes
- Documenter le sens de la dépendance
- Expliquer la nature (API, event, import...)

### Pour les critères de vérification

- Un critère = une vérification atomique
- Préférer auto quand c'est possible
- blocking pour les critères critiques uniquement

## Workflow de shaping v2

```
Inputs globaux                    Package du mapping
(prd.md, architecture.md,   +    (identifié dans mapping.md)
 requirements.md)
        │                               │
        └───────────────┬───────────────┘
                        │
                        ▼
┌─────────────────────────────────────────┐
│ 1. EXTRACTION                           │
│    Extraire les exigences pertinentes   │
│    pour CE package                      │
└─────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────┐
│ 2. DÉCOUPAGE EN SCOPES                  │
│    Proposer les scopes                  │
│    → Validation utilisateur             │
└─────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────┐
│ 3. MUST-HAVES                           │
│    Pour chaque scope :                  │
│    - Truths (comportements)             │
│    - Artifacts (fichiers)               │
│    - Key links (connexions)             │
└─────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────┐
│ 4. VÉRIFICATION                         │
│    Définir les critères par scope       │
│    (auto/manual, blocking/warning/info) │
└─────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────┐
│ 5. NOT INCLUDED                         │
│    Expliciter ce qui est hors scope     │
└─────────────────────────────────────────┘
                        │
                        ▼
              package.md + verification.md
```

## Utilisation

L'agent qui utilise ce skill doit :

1. **Lire les templates** pour structurer ses outputs
2. **Appliquer les principes** pour valider la qualité du shaping
3. **Suivre le workflow** pour ne rien oublier
4. **Valider les scopes** avec l'utilisateur avant de finaliser
