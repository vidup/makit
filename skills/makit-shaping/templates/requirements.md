# Template: Requirements

Ce template structure les exigences d'un package.

---

## Structure du document

```markdown
# Requirements : [Nom du package]

## Vue d'ensemble

[Description courte du package et de ses objectifs]

**Périmètre** : [Ce qui est inclus]
**Hors périmètre** : [Ce qui est explicitement exclu]

---

## Exigences fonctionnelles

### [Domaine fonctionnel 1]

- [ ] **REQ-F001** : [Description de l'exigence]
  - Critère d'acceptation : [Comment on vérifie que c'est fait]
  - Priorité : Must / Should / Nice-to-have

- [ ] **REQ-F002** : [Description de l'exigence]
  - Critère d'acceptation : [...]
  - Priorité : [...]

### [Domaine fonctionnel 2]

- [ ] **REQ-F003** : [...]

...

---

## Exigences non-fonctionnelles

### Performance

- [ ] **REQ-NF001** : [Ex: Temps de réponse API < 200ms au P95]
  - Métrique : [Comment on mesure]
  - Cible : [Valeur cible]

- [ ] **REQ-NF002** : [...]

### Sécurité

- [ ] **REQ-NF010** : [Ex: Authentification JWT requise sur toutes les routes]
  - Critère : [Comment on vérifie]

- [ ] **REQ-NF011** : [...]

### Accessibilité

- [ ] **REQ-NF020** : [Ex: Conformité WCAG 2.1 niveau AA]
  - Critère : [...]

### Maintenabilité

- [ ] **REQ-NF030** : [Ex: Couverture de tests > 80%]
  - Métrique : [...]

### Autres

- [ ] **REQ-NF040** : [...]

---

## Contraintes

### Contraintes techniques

- [ ] **REQ-C001** : [Ex: Compatible Node.js 18+]
- [ ] **REQ-C002** : [Ex: Pas de dépendance native]

### Contraintes business

- [ ] **REQ-C010** : [Ex: Respect RGPD pour les données utilisateur]
- [ ] **REQ-C011** : [...]

### Contraintes réglementaires

- [ ] **REQ-C020** : [...]

---

## Questions

### Questions résolues

| # | Question | Réponse | Date |
|---|----------|---------|------|
| Q1 | [Question qui a été posée] | [Réponse obtenue] | [Date] |
| Q2 | [...] | [...] | [...] |

### Questions ouvertes

| # | Question | Impact | Assigné à |
|---|----------|--------|-----------|
| Q3 | [Question non résolue] | [Bloquant/Non-bloquant] | [Qui doit répondre] |

---

## Priorités

### Must have (obligatoire)

- REQ-F001, REQ-F002, REQ-NF001, REQ-C001

### Should have (important)

- REQ-F003, REQ-NF010

### Nice to have (bonus)

- REQ-NF020

---

## Traçabilité

| Requirement | Source | Validé par |
|-------------|--------|------------|
| REQ-F001 | Brief section X | [Nom] |
| REQ-F002 | Discussion [date] | [Nom] |

---

_Document généré le [date]_
_Dernière mise à jour : [date]_
```

---

## Guidelines

### Numérotation

- **REQ-F*** : Exigences fonctionnelles
- **REQ-NF*** : Exigences non-fonctionnelles
- **REQ-C*** : Contraintes
- Numérotation par dizaines pour pouvoir insérer (001, 010, 020...)

### Exigences fonctionnelles

- Formuler avec un verbe d'action : "L'utilisateur peut...", "Le système doit..."
- Un requirement = une fonctionnalité testable
- Inclure le critère d'acceptation

### Exigences non-fonctionnelles

- Être mesurable quand possible (temps, pourcentage, score)
- Couvrir : performance, sécurité, accessibilité, maintenabilité
- Ne pas oublier la scalabilité si pertinent

### Contraintes

- Distinguer technique / business / réglementaire
- Une contrainte est non-négociable (contrairement à un requirement)
- Être explicite sur l'origine de la contrainte

### Priorités

- **Must** : Le package échoue sans ça
- **Should** : Important mais on peut livrer sans
- **Nice-to-have** : Bonus si on a le temps

### Questions

- Tracker toutes les questions posées pendant le shaping
- Une question résolue = une décision documentée
- Une question ouverte = un risque à surveiller
