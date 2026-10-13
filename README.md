# 🎮 Pokémon Rouge Feu — ROM Hack « Starter Universel »

Prototype web jouable d'un **ROM Hack basé sur Pokémon Rouge Feu (GBA)** dont la
fonctionnalité centrale est le **choix du starter parmi les 386 Pokémon**.

> ⚠️ Ce dépôt contient la **maquette jouable / spec interactive** de la fonctionnalité
> (écran de sélection du starter). Une vraie ROM GBA modifiée nécessiterait la ROM
> commerciale d'origine (non redistribuable) ainsi qu'une base de hack comme
> [poke firered](https://github.com/pret/pokefirered) + l'expansion du Pokédex
> ([pokeemerald-expansion](https://github.com/rh-hideout/pokeemerald-expansion)).

## ✨ Fonctionnalités demandées

| # | Fonctionnalité | Implémentation |
|---|----------------|----------------|
| ⭐ | **Choix du starter parmi les 386 Pokémon** | Liste complète #001 → #386 avec sprites génération III |
| 🎲 | **Option Aléatoire** | Bouton `🎲 ALÉATOIRE` (touche <kbd>R</kbd>) — tire un Pokémon au hasard dans la sélection courante |
| 🐉 | **Légendaires inclus** | 21 légendaires/mythiques (Mewtwo, Mew, Artikodin/Électhor/Sulfura, Raikou/Entei/Suicune, Lugia, Ho-Oh, Celebi, Regirock/Regice/Registeel, Latias/Latios, Kyogre, Groudon, Rayquaza, Jirachi, Deoxys) avec badge ⭐ et filtre dédié |
| 🔄 | **Conservation du starter** | Une fois validé, le starter est **verrouillé** : il reste dans l'équipe (panneau « TON STARTER », Niv. 5) et le choix est **sauvegardé** (`localStorage`) — il survit au rechargement de la page |
| 🔍 | **Liste + barre de recherche** | Barre de recherche instantanée (nom FR/EN, n° de Pokédex, type, catégorie) + filtres génération (Kanto/Johto/Hoenn) et par type |

Extras : écran titre « APPUIE SUR START », boîtes de dialogue style GBA, famille
d'évolution du starter affichée, responsive mobile, raccourcis clavier.

## 🚀 Lancer le projet

Site 100 % statique (HTML/CSS/JS vanilla, aucune dépendance) :

```bash
python3 -m http.server 8080
# puis ouvrir http://localhost:8080
```

## 🗂️ Structure

```
index.html            Écran titre + interface de sélection
css/style.css         Thème Rouge Feu (pixel art, boîtes GBA)
js/data.js            Dataset des 386 Pokémon (noms FR, types gen III, légendaires, évolutions)
js/app.js             Logique : recherche, filtres, aléatoire, confirmation, verrou du starter
assets/sprites/1..386.png   Sprites génération III (style Rouge Feu / Émeraude)
assets/fonts/         Police pixel « Press Start 2P » (woff2)
```

## 📊 Sources des données

- **Noms FR / types / légendaires / évolutions** : CSVs du projet
  [veekun/pokedex](https://github.com/veekun/pokedex) (langue `local_language_id = 5`).
- **Sprites** : dépôt [PokeAPI/sprites](https://github.com/PokeAPI/sprites),
  versions `generation-iii/emerald` (même style graphique que Rouge Feu).
- **Typage adapté à la génération III** : ex. Magnéti/Magnéton = Électrik pur,
  Toudoudou/Mélofée = Normal, Marill = Eau, Gardevoir = Psy (le type Fée et l'ajout
  Acier sur Magnéti datent de générations postérieures à Rouge Feu).

## 🎯 Correspondance avec un vrai ROM Hack

Pour transposer cette spec sur une vraie ROM :

1. Base : ROM **Pokémon Rouge Feu** (FR/US) + outil de patch (IPS/UPS/BPRE).
2. Le script du labo ( `givePokemon` / `setwildbattle` ) est remplacé par une routine
   qui ouvre le menu de sélection complet (table de 386 entrées).
3. Le starter choisi est écrit dans le slot 1 de l'équipe (`Player's Party`) au niveau 5
   et **n'est jamais retiré** par la suite — c'est exactement le comportement de verrou
   reproduit ici.
4. L'option « Aléatoire » = tirage uniforme sur les 386 entrées.

---

*Projet pédagogique / démonstratif. Pokémon © Nintendo / Creatures Inc. / GAME FREAK inc.*
