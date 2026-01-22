# Verification : [Nom du package]

## Structure des criteres

```yaml
criteria:
  - id: VER-001
    scope: scope-1
    description: "Description du critere"
    decision: auto | manual      # auto = verifiable par l'agent, manual = intervention humaine
    blocking: blocking | warning | info
    status: pending | passed | failed
    # Champs pour decision: auto
    command: "commande a executer"  # optionnel, pour verifications auto
    threshold: 80                    # optionnel, seuil numerique
    # Champs pour decision: manual
    context: "Contexte pour la verification manuelle"  # optionnel
    # Champs remplis par le Verifier
    result: null                     # details du resultat
    user_response: null              # reponse utilisateur si manual
    verified_at: null                # date de verification
```

---

## Criteres par scope

### Scope 1 : [Nom du scope]

```yaml
criteria:
  - id: VER-S1-001
    scope: scope-1
    description: "Les tests unitaires passent"
    decision: auto
    blocking: blocking
    status: pending
    command: "pnpm test"
    result: null

  - id: VER-S1-002
    scope: scope-1
    description: "L'UI est conforme a la maquette"
    decision: manual
    blocking: blocking
    status: pending
    context: "Comparer avec la maquette Figma: [URL]"
    user_response: null

  - id: VER-S1-003
    scope: scope-1
    description: "Le code coverage est > 80%"
    decision: auto
    blocking: warning
    status: pending
    command: "pnpm coverage"
    threshold: 80
    result: null
```

---

### Scope 2 : [Nom du scope]

```yaml
criteria:
  - id: VER-S2-001
    scope: scope-2
    description: "[Critere]"
    decision: auto
    blocking: blocking
    status: pending
    command: "[commande]"
    result: null
```

---

## Resume des criteres

| Scope | Total | Auto | Manual | Blocking | Warning | Status |
|-------|-------|------|--------|----------|---------|--------|
| scope-1 | 3 | 2 | 1 | 2 | 1 | pending |
| scope-2 | 1 | 1 | 0 | 1 | 0 | pending |

---

## Log de verification

| Date | Scope | Critere | Result | Notes |
|------|-------|---------|--------|-------|
| - | - | - | - | - |

---

## Rapport de verification

**Scope** : [Nom du scope]
**Date** : [Date]
**Resultat global** : [PASS | FAIL | PASS_WITH_WARNINGS]

### Resume

| Niveau | Total | Passed | Failed |
|--------|-------|--------|--------|
| Blocking | X | Y | Z |
| Warning | X | Y | Z |

### Passed

- [x] **VER-001** : [description]

### Failed

- [ ] **VER-002** : [description]
  - **Probleme** : [details]
  - **Action requise** : [suggestion]

### Warnings

- [!] **VER-003** : [description] ([valeur observee])

---

_Genere par Shaper le [date]_
