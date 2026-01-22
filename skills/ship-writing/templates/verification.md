# Vérification : [Nom du package]

## Structure des critères

```yaml
criteria:
  - id: VER-001
    scope: scope-1
    description: "Description du critère"
    decision: auto | manual      # auto = vérifiable par l'agent, manual = intervention humaine
    blocking: blocking | warning | info
    status: pending | passed | failed
    notes: "Notes optionnelles"
```

---

## Critères par scope

### Scope 1 : [Nom du scope]

```yaml
criteria:
  - id: VER-S1-001
    scope: scope-1
    description: "[Critère fonctionnel vérifiable automatiquement]"
    decision: auto
    blocking: blocking
    status: pending

  - id: VER-S1-002
    scope: scope-1
    description: "[Critère UI nécessitant vérification humaine]"
    decision: manual
    blocking: blocking
    status: pending
```

---

### Scope 2 : [Nom du scope]

```yaml
criteria:
  - id: VER-S2-001
    scope: scope-2
    description: "[Critère]"
    decision: auto
    blocking: blocking
    status: pending
```

---

## Résumé des critères

| Scope | Total | Auto | Manual | Blocking | Status |
|-------|-------|------|--------|----------|--------|
| scope-1 | 2 | 1 | 1 | 2 | pending |
| scope-2 | 1 | 1 | 0 | 1 | pending |

---

## Log de vérification

| Date | Scope | Critère | Result | Notes |
|------|-------|---------|--------|-------|
| - | - | - | - | - |

---

_Généré par Shaper le [date]_
