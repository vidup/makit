---
name: ship-specifying
description: "Techniques de specification pour transformer un PRD en requirements formels"
user-invocable: false
---

# Skill: Specifying

Ce skill fournit les techniques et templates pour transformer un PRD (Product Requirements Document) en SRS (Software Requirements Specification) formel.

## Ce que produit le Specifier

**Output** : `.ship/requirements.md`

Un document qui formalise :
- Les exigences fonctionnelles (ce que le systeme DOIT faire)
- Les exigences non-fonctionnelles (performance, securite, disponibilite)
- Les contraintes (techniques, business, reglementaires)
- Les priorites (MoSCoW)
- La tracabilite vers le PRD source

## Principes de specification

### Completude
Couvrir tous les besoins du PRD - chaque feature doit avoir au moins une exigence associee.

### Non-ambiguite
Une seule interpretation possible par exigence. Eviter les termes vagues comme "rapide", "intuitif", "la plupart".

### Verifiabilite
Chaque exigence doit etre testable. Si on ne peut pas verifier qu'une exigence est satisfaite, elle est mal formulee.

### Tracabilite
Lien clair entre PRD et exigences. Chaque REQ pointe vers sa source dans le PRD.

## Categories d'exigences

| Prefixe | Type | Description | Exemples |
|---------|------|-------------|----------|
| **REQ-F*** | Fonctionnelle | Ce que le systeme DOIT faire | "L'utilisateur peut creer un compte" |
| **REQ-NF*** | Non-fonctionnelle | Qualites du systeme | "Temps de reponse < 200ms au P95" |
| **REQ-C*** | Contrainte | Limites imposees | "Compatible Node.js 18+" |

### Sous-categories non-fonctionnelles

| Code | Categorie | Exemples |
|------|-----------|----------|
| REQ-NF0xx | Performance | Latence, throughput, temps de chargement |
| REQ-NF1xx | Securite | Authentification, autorisation, chiffrement |
| REQ-NF2xx | Disponibilite | Uptime, SLA, disaster recovery |
| REQ-NF3xx | Accessibilite | WCAG, support lecteur ecran |
| REQ-NF4xx | Maintenabilite | Couverture tests, documentation, dette technique |

## Techniques disponibles

| Technique | Quand l'utiliser | Fichier |
|-----------|------------------|---------|
| **MoSCoW** | Prioriser les exigences | [moscow.md](techniques/moscow.md) |
| **Extraction** | Extraire les exigences du PRD | [extraction.md](techniques/extraction.md) |

## Templates disponibles

Les templates sont dans le skill `ship-writing` :

| Template | Description | Fichier |
|----------|-------------|---------|
| **Requirements SRS** | Format complet du requirements.md | `skills/ship-writing/templates/requirements.md` |

## Guide de formulation

### Exigences fonctionnelles

Format : `[Acteur] peut/doit [action] pour [resultat]`

**Bon** :
- "L'utilisateur peut creer un compte avec email et mot de passe"
- "Le systeme envoie un email de confirmation dans les 30 secondes"

**Mauvais** :
- "Le systeme gere les utilisateurs" (trop vague)
- "Interface de connexion" (pas d'action verifiable)

### Exigences non-fonctionnelles

Format : `[Metrique] [operateur] [valeur] [condition]`

**Bon** :
- "Temps de reponse API < 200ms au P95"
- "Disponibilite >= 99.9% hors maintenance planifiee"

**Mauvais** :
- "Le systeme est rapide" (pas de metrique)
- "Bonne performance" (pas mesurable)

### Contraintes

Format : `[Element] doit/ne doit pas [condition]`

**Bon** :
- "L'application doit fonctionner sur Node.js 18 ou superieur"
- "Les donnees personnelles ne doivent pas etre stockees hors UE"

**Mauvais** :
- "Technologies modernes" (pas specifique)
- "Standards de l'industrie" (lesquels ?)

## Checklist de qualite

Avant de finaliser le requirements.md :

- [ ] Toutes les features du PRD ont au moins une exigence
- [ ] Chaque exigence a un identifiant unique (REQ-*)
- [ ] Chaque exigence a un critere d'acceptation
- [ ] Pas de termes ambigus ("rapide", "intuitif", "facile")
- [ ] Les priorites MoSCoW sont definies
- [ ] Maximum 60% d'exigences en MUST
- [ ] La tracabilite vers le PRD est documentee
- [ ] Les questions ambigues ont ete clarifiees avec l'utilisateur
