# Extraction d'exigences

## Description

La technique d'extraction transforme un PRD (document en langage naturel) en exigences formelles et verifiables. Elle permet de passer d'une description produit a une specification technique sans parler de solutions.

## Quand l'utiliser

- Tu as un PRD a transformer en requirements
- Tu veux t'assurer de ne rien oublier
- Tu dois identifier les ambiguites a clarifier
- Tu veux produire des exigences testables

## Les 5 etapes

### Etape 1 : Lecture analytique

Parcourir le PRD en repérant :

| Element | Ce qu'on cherche | Exemple |
|---------|------------------|---------|
| **Verbes d'action** | Actions que le systeme doit effectuer | "creer", "envoyer", "afficher" |
| **Entites** | Objets manipules par le systeme | "utilisateur", "compte", "notification" |
| **Contraintes** | Limites ou conditions | "en moins de 2s", "uniquement si" |
| **Qualificatifs** | Adjectifs a quantifier | "rapide", "securise", "intuitif" |

### Etape 2 : Extraction fonctionnelle

Pour chaque feature du PRD, extraire les exigences au format :

```
[Acteur] peut/doit [action] [objet] pour [resultat/objectif]
```

**Exemple** :
- PRD : "L'application permet de creer des rappels personnalises"
- REQ-F001 : "L'utilisateur peut creer un rappel avec titre, date et heure"
- REQ-F002 : "L'utilisateur peut modifier un rappel existant"
- REQ-F003 : "Le systeme envoie une notification a l'heure du rappel"

### Etape 3 : Extraction non-fonctionnelle

Convertir les qualificatifs en metriques mesurables :

| Qualificatif dans le PRD | Question a poser | Exigence resultante |
|--------------------------|------------------|---------------------|
| "rapide" | "C'est quoi rapide ? 1s ? 100ms ?" | "REQ-NF001 : Temps de reponse < 200ms P95" |
| "securise" | "Quel niveau de securite ?" | "REQ-NF100 : Authentification 2FA obligatoire" |
| "disponible" | "Quel uptime cible ?" | "REQ-NF200 : Disponibilite 99.9%" |
| "scalable" | "Combien d'utilisateurs ?" | "REQ-NF002 : Support 10K utilisateurs simultanes" |
| "intuitif" | "Quels criteres UX ?" | "REQ-NF300 : Task completion < 3 clics" |

### Etape 4 : Extraction des contraintes

Identifier les limites imposees :

| Type | Ce qu'on cherche | Exemple |
|------|------------------|---------|
| **Technique** | Stack, versions, integration | "Compatible Node.js 18+" |
| **Delai** | Deadlines, milestones | "MVP avant Q2 2025" |
| **Reglementaire** | Conformite, legal | "RGPD, HDS, WCAG" |
| **Budget** | Couts infrastructure | "Infra < 500EUR/mois" |

### Etape 5 : Verification de completude

Checklist finale :

- [ ] Chaque feature du PRD a au moins une exigence
- [ ] Chaque exigence a un identifiant unique
- [ ] Chaque exigence a un critere d'acceptation
- [ ] Les qualificatifs vagues ont ete quantifies
- [ ] Les contraintes sont explicites
- [ ] Les questions non resolues sont listees

## Ambiguites courantes a clarifier

| Expression ambigue | Question a poser |
|--------------------|------------------|
| "La plupart des utilisateurs" | Quel pourcentage ? 80% ? 95% ? |
| "Rapidement" | En combien de temps ? Millisecondes ? Secondes ? |
| "Interface intuitive" | Quels criteres UX mesurables ? Combien de clics ? |
| "Donnees sensibles" | Quelles donnees specifiquement ? |
| "Haute disponibilite" | Quel SLA ? 99% ? 99.9% ? 99.99% ? |
| "Beaucoup de donnees" | Quel volume ? Mo ? Go ? To ? |
| "Utilisateurs simultanees" | Combien exactement ? |
| "Temps reel" | Quelle latence max ? < 100ms ? < 1s ? |
| "Bonne performance" | Quelles metriques ? Latence ? Throughput ? |
| "Facile a maintenir" | Quels criteres ? Couverture tests ? Documentation ? |

## Exemple complet

**PRD (extrait)** :
> "L'utilisateur peut creer des rappels personnalises. L'interface doit etre intuitive et les notifications doivent arriver rapidement. L'application doit etre securisee."

**Extraction** :

1. **Lecture analytique** :
   - Verbes : creer, arriver
   - Entites : utilisateur, rappels, notifications
   - Qualificatifs : personnalises, intuitive, rapidement, securisee

2. **Questions de clarification** :
   - "Personnalises comment ? Titre, description, categorie ?"
   - "Intuitive = combien de clics pour creer un rappel ?"
   - "Rapidement = quelle latence entre heure du rappel et notification ?"
   - "Securisee = quelle authentification ?"

3. **Exigences resultantes** :

**Fonctionnelles** :
- REQ-F001 : L'utilisateur peut creer un rappel avec titre, date et heure
- REQ-F002 : L'utilisateur peut ajouter une description optionnelle au rappel
- REQ-F003 : Le systeme envoie une notification push a l'heure du rappel

**Non-fonctionnelles** :
- REQ-NF001 : La creation d'un rappel se fait en 3 clics maximum
- REQ-NF002 : La notification arrive dans les 30 secondes suivant l'heure programmee
- REQ-NF100 : L'utilisateur doit s'authentifier pour acceder a ses rappels

## Tips

- Ne jamais assumer - toujours poser la question si c'est ambigu
- Un qualificatif non quantifie n'est pas une exigence
- Grouper les questions par theme pour minimiser les allers-retours
- Si une feature semble simple, elle cache souvent plusieurs exigences
- Les contraintes reglementaires deviennent souvent des MUST
