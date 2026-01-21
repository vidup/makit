# Template : Requirements SRS (Software Requirements Specification)

> Output du Specifier - Input de l'Architect

**Chemin** : `.ship/requirements.md`

---

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

[Resume en 2-3 phrases - repris du PRD]

### Portee

**Inclus** :
- [Ce qui est dans le scope]

**Exclu** :
- [Ce qui est explicitement hors scope]

### Glossaire

| Terme | Definition |
|-------|------------|
| [Terme 1] | [Definition claire et non-ambigue] |

---

## Exigences fonctionnelles

### [Domaine fonctionnel 1]

- [ ] **REQ-F001** : [Description au format "L'utilisateur peut..."]
  - **Critere d'acceptation** : [Comment verifier que c'est fait]
  - **Priorite** : Must | Should | Could
  - **Source PRD** : [Section/Feature du PRD]

- [ ] **REQ-F002** : [Description]
  - **Critere d'acceptation** : [...]
  - **Priorite** : [...]
  - **Source PRD** : [...]

### [Domaine fonctionnel 2]

- [ ] **REQ-F010** : [Description]
  - **Critere d'acceptation** : [...]
  - **Priorite** : [...]
  - **Source PRD** : [...]

---

## Exigences non-fonctionnelles

### Performance (REQ-NF0xx)

- [ ] **REQ-NF001** : [Ex: Temps de reponse API < 200ms au P95]
  - **Critere d'acceptation** : [Comment mesurer]
  - **Priorite** : [...]

- [ ] **REQ-NF002** : [Ex: Support de 1000 utilisateurs simultanes]
  - **Critere d'acceptation** : [...]
  - **Priorite** : [...]

### Securite (REQ-NF1xx)

- [ ] **REQ-NF100** : [Ex: Authentification requise pour toutes les operations sensibles]
  - **Critere d'acceptation** : [...]
  - **Priorite** : [...]

- [ ] **REQ-NF101** : [Ex: Mots de passe hashes avec bcrypt, cout >= 12]
  - **Critere d'acceptation** : [...]
  - **Priorite** : [...]

### Disponibilite (REQ-NF2xx)

- [ ] **REQ-NF200** : [Ex: Uptime 99.9% hors maintenance planifiee]
  - **Critere d'acceptation** : [...]
  - **Priorite** : [...]

### Accessibilite (REQ-NF3xx)

- [ ] **REQ-NF300** : [Ex: Conformite WCAG 2.1 niveau AA]
  - **Critere d'acceptation** : [...]
  - **Priorite** : [...]

### Maintenabilite (REQ-NF4xx)

- [ ] **REQ-NF400** : [Ex: Couverture de tests > 80%]
  - **Critere d'acceptation** : [...]
  - **Priorite** : [...]

---

## Contraintes

### Techniques (REQ-C0xx)

- [ ] **REQ-C001** : [Ex: Compatible Node.js 18+]
- [ ] **REQ-C002** : [Ex: Base de donnees PostgreSQL]

### Business (REQ-C1xx)

- [ ] **REQ-C100** : [Ex: Livraison MVP avant Q2 2025]
- [ ] **REQ-C101** : [Ex: Budget infrastructure < 500EUR/mois]

### Reglementaires (REQ-C2xx)

- [ ] **REQ-C200** : [Ex: Conformite RGPD pour donnees personnelles]
- [ ] **REQ-C201** : [Ex: Hebergement donnees en UE]

---

## Priorites (MoSCoW)

### Must have (indispensable)

Sans ces exigences, le produit est inutilisable.

- REQ-F001 : [Description courte]
- REQ-F002 : [...]
- REQ-NF001 : [...]

### Should have (important)

Important mais le produit peut etre livre sans.

- REQ-F010 : [...]
- REQ-NF100 : [...]

### Could have (bonus)

Ameliore l'experience sans etre critique.

- REQ-F020 : [...]
- REQ-NF300 : [...]

### Won't have (cette version)

Explicitement reporte a une version future.

- [Fonctionnalite X] : [Raison du report]
- [Fonctionnalite Y] : [...]

---

## Tracabilite

| Requirement | Source PRD | Valide par |
|-------------|------------|------------|
| REQ-F001 | PRD - Feature 1 | [Nom/Date] |
| REQ-F002 | PRD - Feature 1 | [Nom/Date] |
| REQ-NF001 | PRD - Contraintes | [Nom/Date] |

---

## Questions

### Resolues

| # | Question | Reponse | Date |
|---|----------|---------|------|
| Q1 | [Question clarifiee] | [Reponse obtenue] | [Date] |

### Ouvertes

| # | Question | Impact | Assigne a |
|---|----------|--------|-----------|
| Q2 | [Question non resolue] | Bloquant / Non-bloquant | [Architect/Dev/PO] |

---

_Genere par Specifier le [date]_
_Base sur : `.ship/prd.md`_
```
