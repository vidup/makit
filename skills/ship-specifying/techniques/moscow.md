# MoSCoW

## Description

MoSCoW est une technique de priorisation qui classe les exigences en quatre categories : Must have, Should have, Could have, Won't have. Elle permet de definir clairement ce qui est indispensable vs ce qui est optionnel.

## Quand l'utiliser

- Tu as une liste d'exigences a prioriser
- Tu dois communiquer clairement sur ce qui est negociable ou non
- Tu veux eviter le "tout est prioritaire" qui mene a rien de prioritaire
- Tu dois gerer les attentes sur ce qui sera livre

## Les 4 categories

| Categorie | Definition | Question cle | Proportion cible |
|-----------|------------|--------------|------------------|
| **MUST** | Sans ca, le produit est inutilisable | "Si on ne fait pas ca, peut-on livrer ?" | Max 60% |
| **SHOULD** | Important mais livrable sans | "Beaucoup de valeur pour effort raisonnable ?" | ~20% |
| **COULD** | Nice-to-have | "Ameliore l'experience sans etre critique ?" | ~15% |
| **WON'T** | Hors scope cette version | "Peut-on reporter a plus tard ?" | ~5% |

## Comment ca marche

### Etape 1 : Extraction initiale

L'agent propose une priorisation basee sur :
- Les priorites deja mentionnees dans le PRD (Must/Should/Nice-to-have)
- L'analyse des comportements critiques vs secondaires
- Les contraintes (reglementaires = souvent MUST)

### Etape 2 : Validation avec l'utilisateur

Presenter la proposition et demander confirmation :

> "Voici ma proposition de priorisation. J'ai mis 8 exigences en MUST, 5 en SHOULD, 3 en COULD. Est-ce que ca correspond a ta vision ?"

### Etape 3 : Ajustement

Si l'utilisateur conteste une priorite :
- Demander pourquoi
- Comprendre l'impact business
- Ajuster en consequence

### Etape 4 : Verification de la regle des 60%

Si plus de 60% des exigences sont en MUST :

> "J'ai actuellement 75% d'exigences en MUST. C'est beaucoup - ca laisse peu de marge. On pourrait passer [REQ-X] et [REQ-Y] en SHOULD. Qu'en penses-tu ?"

## Criteres de decision

### Pour classer en MUST

- [ ] Le produit ne peut pas fonctionner sans
- [ ] C'est une obligation legale/reglementaire
- [ ] C'est un engagement contractuel
- [ ] Les utilisateurs ne peuvent pas accomplir leur tache principale sans

### Pour classer en SHOULD

- [ ] Apporte beaucoup de valeur
- [ ] Les utilisateurs s'attendent a l'avoir
- [ ] Pas critique pour un MVP
- [ ] Peut etre ajoute rapidement apres le lancement

### Pour classer en COULD

- [ ] Ameliore l'experience
- [ ] Differenciant mais pas essentiel
- [ ] Demande peu d'effort
- [ ] Peut etre retire sans impact majeur

### Pour classer en WON'T

- [ ] Hors perimetre defini
- [ ] Trop complexe pour cette version
- [ ] Valeur incertaine
- [ ] Depend d'autres elements non disponibles

## Exemple d'application

**Contexte** : App de tracking de sommeil

**MUST** (6 exigences - 46%) :
- REQ-F001 : Saisie manuelle de l'heure de coucher/reveil
- REQ-F002 : Visualisation de l'historique sur 7 jours
- REQ-NF001 : Temps de reponse < 2s
- REQ-NF100 : Authentification requise
- REQ-C001 : Compatible iOS 15+
- REQ-C200 : Conformite RGPD

**SHOULD** (4 exigences - 31%) :
- REQ-F010 : Rappels de coucher
- REQ-F011 : Statistiques mensuelles
- REQ-NF200 : Disponibilite 99%
- REQ-NF400 : Tests unitaires > 70%

**COULD** (2 exigences - 15%) :
- REQ-F020 : Integration Apple Health
- REQ-NF300 : Mode sombre

**WON'T** (1 exigence - 8%) :
- Sons de relaxation generes par IA (V2)

## Tips

- Ne pas hesiter a challenger les MUST : "Est-ce vraiment impossible de livrer sans ?"
- Les contraintes reglementaires sont presque toujours MUST
- Si tout est MUST, rien n'est MUST - forcer la priorisation
- Documenter la raison des WON'T pour la V2
- La proportion 60/20/15/5 est un guide, pas une regle absolue
