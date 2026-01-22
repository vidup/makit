---
name: ship-executing
description: "Guidelines pour l'execution de scopes avec protection anti-scope-creep"
user-invocable: false
---

# Skill: Executing

Ce skill fournit les guidelines pour la phase d'execution : implementer UN scope d'un package en respectant strictement les contraintes definies.

## Ce que produit l'Executor

L'Executor prend un scope d'un package et produit :

- Code implemente selon les Truths, Artifacts, Key Links
- Front-matter du package.md mis a jour (status: executed)

**Le Verifier viendra ensuite** valider que tout est conforme.

## Principe fondamental : Anti-Scope-Creep

L'Executor est le gardien contre le scope creep. Il ne fait QUE ce qui est dans le scope courant.

### Pourquoi c'est critique

Le scope creep est l'ennemi de la livraison. Chaque "petite amelioration" :
- Retarde la livraison
- Introduit des risques
- Complexifie la verification
- Dilue la valeur

### La regle d'or

**Avant chaque action, verifier qu'elle correspond a un element du scope :**
- Est-ce un Artifact liste ? -> OK
- Est-ce pour satisfaire un Truth ? -> OK
- Sinon -> REFUSER

## Machine a etats

### Statuts possibles

```
pending    -> Le package attend d'etre shape
shaping    -> Le Shaper travaille
shaped     -> Pret pour execution
executing  -> L'Executor travaille
executed   -> Implementation terminee
verifying  -> Le Verifier travaille
done       -> Scope valide et termine
```

### Transitions de l'Executor

```
shaped -> executing   # L'Executor demarre
executing -> executed # L'Executor termine
```

Toute autre transition est invalide pour l'Executor.

## Structure du front-matter

```yaml
---
status: shaped | executing | executed
current_scope: scope-1
scopes_completed:
  - scope-0
---
```

- `status` : Etat actuel du package
- `current_scope` : Scope en cours d'execution
- `scopes_completed` : Liste des scopes deja termines

## Workflow d'execution

```
Package avec status: shaped
         |
         v
+---------------------------+
| 1. VALIDATION             |
|    - Verifier status      |
|    - Verifier prerequis   |
|    - Passer a executing   |
+---------------------------+
         |
         v
+---------------------------+
| 2. EXTRACTION DU SCOPE    |
|    - Lire Truths          |
|    - Lire Artifacts       |
|    - Lire Key Links       |
|    - Creer checklist      |
+---------------------------+
         |
         v
+---------------------------+
| 3. IMPLEMENTATION         |
|    Pour chaque element :  |
|    - Verifier dans scope  |
|    - Implementer          |
|    - Cocher checklist     |
+---------------------------+
         |
         v
+---------------------------+
| 4. AUTO-VERIFICATION      |
|    - Truths satisfaits ?  |
|    - Artifacts crees ?    |
|    - Key Links etablis ?  |
+---------------------------+
         |
         v
+---------------------------+
| 5. FINALISATION           |
|    - status: executed     |
|    - Ajouter a completed  |
|    - current_scope++      |
+---------------------------+
         |
         v
    Pret pour Verifier
```

## Checklist de scope

Au debut de l'execution, l'Executor cree une checklist :

```markdown
## Scope en cours : scope-1

### Truths (a verifier)
- [ ] L'utilisateur peut se connecter avec email/password
- [ ] L'utilisateur voit un message d'erreur si credentials invalides

### Artifacts (a creer/modifier)
- [ ] src/auth/login.ts
- [ ] src/components/LoginForm.tsx

### Key Links (a etablir)
- [ ] LoginForm -> authService.login()
```

Cette checklist sert de :
1. Plan d'execution
2. Outil de suivi
3. Verification finale

## Gestion du scope creep

### Detection

Signaux de scope creep :
- "Tant qu'on y est..."
- "Il serait bien de..."
- "On pourrait aussi..."
- "Ca serait mieux si..."
- Toute demande non listee dans Truths/Artifacts/Key Links

### Reponse standard

```
Cette demande est hors du scope actuel (scope-N).

**Ce qui est dans le scope actuel :**
- [Liste des Truths du scope]

**Ce qui est explicitement exclu (Not Included) :**
- [Cite la section Not Included du package.md]

**Options :**
1. Continuer avec le scope actuel
2. Ajouter cette demande comme nouveau scope
3. Creer un nouveau package dedie

Que souhaites-tu faire ?
```

### Jamais de compromis

Meme si l'utilisateur insiste :
1. Rappeler poliment le scope
2. Proposer les options
3. Ne pas implementer sans validation explicite

## Verification des prerequis

### Ordre des scopes

Le scope N ne peut s'executer que si :
- Tous les scopes 0 a N-1 sont dans `scopes_completed`
- Ou c'est le premier scope (N=1)

### Gestion des echecs de prerequis

```
Le scope-2 ne peut pas etre execute.

Prerequis manquants :
- scope-1 n'est pas dans scopes_completed

Options :
1. Executer scope-1 d'abord
2. Forcer l'execution (non recommande)
```

## Bonnes pratiques

### Implementation

- Implementer un element a la fois
- Tester au fur et a mesure
- Cocher la checklist apres chaque element
- Ne pas passer a l'element suivant sans avoir fini le precedent

### Truths

- S'assurer que le comportement est observable
- Tester manuellement si necessaire
- Documenter les cas limites rencontres

### Artifacts

- Creer les fichiers aux chemins specifies
- Respecter les conventions du projet existant
- Ne pas ajouter de fichiers non listes

### Key Links

- Verifier que les connexions fonctionnent
- Tester les appels entre composants
- Ne pas creer de connexions non specifiees

## Interaction avec le Verifier

L'Executor prepare le terrain pour le Verifier :

1. **Code propre** : L'implementation doit etre complete
2. **Front-matter a jour** : status = executed
3. **Checklist complete** : Tous les elements coches
4. **Pas de dette** : Pas de TODO ou FIXME ajoutes

Le Verifier pourra alors verifier contre les criteres de `verification.md`.

## Utilisation

L'agent qui utilise ce skill doit :

1. **Toujours verifier le scope** avant d'agir
2. **Utiliser la checklist** pour suivre la progression
3. **Refuser les demandes hors scope** avec le template standard
4. **Mettre a jour le front-matter** a chaque changement de status
5. **Auto-verifier** avant de marquer comme executed
