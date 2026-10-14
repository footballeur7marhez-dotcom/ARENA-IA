// Dataset genere depuis veekun/pokedex (noms FR) - 386 Pokemon
const POKEMON = [
{
"id": 1,
"fr": "Bulbizarre",
"en": "Bulbasaur",
"genus": "Pokémon Graine",
"types": [
"plante",
"poison"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
1,
2,
3
]
},
{
"id": 2,
"fr": "Herbizarre",
"en": "Ivysaur",
"genus": "Pokémon Graine",
"types": [
"plante",
"poison"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
1,
2,
3
]
},
{
"id": 3,
"fr": "Florizarre",
"en": "Venusaur",
"genus": "Pokémon Graine",
"types": [
"plante",
"poison"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
1,
2,
3
]
},
{
"id": 4,
"fr": "Salamèche",
"en": "Charmander",
"genus": "Pokémon Lézard",
"types": [
"feu"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
4,
5,
6
]
},
{
"id": 5,
"fr": "Reptincel",
"en": "Charmeleon",
"genus": "Pokémon Flamme",
"types": [
"feu"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
4,
5,
6
]
},
{
"id": 6,
"fr": "Dracaufeu",
"en": "Charizard",
"genus": "Pokémon Flamme",
"types": [
"feu",
"vol"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
4,
5,
6
]
},
{
"id": 7,
"fr": "Carapuce",
"en": "Squirtle",
"genus": "Pokémon Minitortue",
"types": [
"eau"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
7,
8,
9
]
},
{
"id": 8,
"fr": "Carabaffe",
"en": "Wartortle",
"genus": "Pokémon Tortue",
"types": [
"eau"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
7,
8,
9
]
},
{
"id": 9,
"fr": "Tortank",
"en": "Blastoise",
"genus": "Pokémon Carapace",
"types": [
"eau"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
7,
8,
9
]
},
{
"id": 10,
"fr": "Chenipan",
"en": "Caterpie",
"genus": "Pokémon Ver",
"types": [
"insecte"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
10,
11,
12
]
},
{
"id": 11,
"fr": "Chrysacier",
"en": "Metapod",
"genus": "Pokémon Cocon",
"types": [
"insecte"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
10,
11,
12
]
},
{
"id": 12,
"fr": "Papilusion",
"en": "Butterfree",
"genus": "Pokémon Papillon",
"types": [
"insecte",
"vol"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
10,
11,
12
]
},
{
"id": 13,
"fr": "Aspicot",
"en": "Weedle",
"genus": "Pokémon Insectopic",
"types": [
"insecte",
"poison"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
13,
14,
15
]
},
{
"id": 14,
"fr": "Coconfort",
"en": "Kakuna",
"genus": "Pokémon Cocon",
"types": [
"insecte",
"poison"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
13,
14,
15
]
},
{
"id": 15,
"fr": "Dardargnan",
"en": "Beedrill",
"genus": "Pokémon Guêpoison",
"types": [
"insecte",
"poison"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
13,
14,
15
]
},
{
"id": 16,
"fr": "Roucool",
"en": "Pidgey",
"genus": "Pokémon Minoiseau",
"types": [
"normal",
"vol"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
16,
17,
18
]
},
{
"id": 17,
"fr": "Roucoups",
"en": "Pidgeotto",
"genus": "Pokémon Oiseau",
"types": [
"normal",
"vol"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
16,
17,
18
]
},
{
"id": 18,
"fr": "Roucarnage",
"en": "Pidgeot",
"genus": "Pokémon Oiseau",
"types": [
"normal",
"vol"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
16,
17,
18
]
},
{
"id": 19,
"fr": "Rattata",
"en": "Rattata",
"genus": "Pokémon Souris",
"types": [
"normal"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
19,
20
]
},
{
"id": 20,
"fr": "Rattatac",
"en": "Raticate",
"genus": "Pokémon Souris",
"types": [
"normal"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
19,
20
]
},
{
"id": 21,
"fr": "Piafabec",
"en": "Spearow",
"genus": "Pokémon Minoiseau",
"types": [
"normal",
"vol"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
21,
22
]
},
{
"id": 22,
"fr": "Rapasdepic",
"en": "Fearow",
"genus": "Pokémon Bec-Oiseau",
"types": [
"normal",
"vol"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
21,
22
]
},
{
"id": 23,
"fr": "Abo",
"en": "Ekans",
"genus": "Pokémon Serpent",
"types": [
"poison"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
23,
24
]
},
{
"id": 24,
"fr": "Arbok",
"en": "Arbok",
"genus": "Pokémon Cobra",
"types": [
"poison"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
23,
24
]
},
{
"id": 25,
"fr": "Pikachu",
"en": "Pikachu",
"genus": "Pokémon Souris",
"types": [
"électrik"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
172,
25,
26
]
},
{
"id": 26,
"fr": "Raichu",
"en": "Raichu",
"genus": "Pokémon Souris",
"types": [
"électrik"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
172,
25,
26
]
},
{
"id": 27,
"fr": "Sabelette",
"en": "Sandshrew",
"genus": "Pokémon Souris",
"types": [
"sol"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
27,
28
]
},
{
"id": 28,
"fr": "Sablaireau",
"en": "Sandslash",
"genus": "Pokémon Souris",
"types": [
"sol"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
27,
28
]
},
{
"id": 29,
"fr": "Nidoran♀",
"en": "Nidoran♀",
"genus": "Pokémon Vénépic",
"types": [
"poison"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
29,
30,
31
]
},
{
"id": 30,
"fr": "Nidorina",
"en": "Nidorina",
"genus": "Pokémon Vénépic",
"types": [
"poison"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
29,
30,
31
]
},
{
"id": 31,
"fr": "Nidoqueen",
"en": "Nidoqueen",
"genus": "Pokémon Perceur",
"types": [
"poison",
"sol"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
29,
30,
31
]
},
{
"id": 32,
"fr": "Nidoran♂",
"en": "Nidoran♂",
"genus": "Pokémon Vénépic",
"types": [
"poison"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
32,
33,
34
]
},
{
"id": 33,
"fr": "Nidorino",
"en": "Nidorino",
"genus": "Pokémon Vénépic",
"types": [
"poison"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
32,
33,
34
]
},
{
"id": 34,
"fr": "Nidoking",
"en": "Nidoking",
"genus": "Pokémon Perceur",
"types": [
"poison",
"sol"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
32,
33,
34
]
},
{
"id": 35,
"fr": "Mélofée",
"en": "Clefairy",
"genus": "Pokémon Fée",
"types": [
"normal"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
173,
35,
36
]
},
{
"id": 36,
"fr": "Mélodelfe",
"en": "Clefable",
"genus": "Pokémon Fée",
"types": [
"normal"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
173,
35,
36
]
},
{
"id": 37,
"fr": "Goupix",
"en": "Vulpix",
"genus": "Pokémon Renard",
"types": [
"feu"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
37,
38
]
},
{
"id": 38,
"fr": "Feunard",
"en": "Ninetales",
"genus": "Pokémon Renard",
"types": [
"feu"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
37,
38
]
},
{
"id": 39,
"fr": "Rondoudou",
"en": "Jigglypuff",
"genus": "Pokémon Bouboule",
"types": [
"normal",
"normal"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
174,
39,
40
]
},
{
"id": 40,
"fr": "Grodoudou",
"en": "Wigglytuff",
"genus": "Pokémon Bouboule",
"types": [
"normal",
"normal"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
174,
39,
40
]
},
{
"id": 41,
"fr": "Nosferapti",
"en": "Zubat",
"genus": "Pokémon Chovsouris",
"types": [
"poison",
"vol"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
41,
42,
169
]
},
{
"id": 42,
"fr": "Nosferalto",
"en": "Golbat",
"genus": "Pokémon Chovsouris",
"types": [
"poison",
"vol"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
41,
42,
169
]
},
{
"id": 43,
"fr": "Mystherbe",
"en": "Oddish",
"genus": "Pokémon Racine",
"types": [
"plante",
"poison"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
43,
44,
45
]
},
{
"id": 44,
"fr": "Ortide",
"en": "Gloom",
"genus": "Pokémon Racine",
"types": [
"plante",
"poison"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
43,
44,
45
]
},
{
"id": 45,
"fr": "Rafflesia",
"en": "Vileplume",
"genus": "Pokémon Fleur",
"types": [
"plante",
"poison"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
43,
44,
45
]
},
{
"id": 46,
"fr": "Paras",
"en": "Paras",
"genus": "Pokémon Champignon",
"types": [
"insecte",
"plante"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
46,
47
]
},
{
"id": 47,
"fr": "Parasect",
"en": "Parasect",
"genus": "Pokémon Champignon",
"types": [
"insecte",
"plante"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
46,
47
]
},
{
"id": 48,
"fr": "Mimitoss",
"en": "Venonat",
"genus": "Pokémon Vermine",
"types": [
"insecte",
"poison"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
48,
49
]
},
{
"id": 49,
"fr": "Aéromite",
"en": "Venomoth",
"genus": "Pokémon Papipoison",
"types": [
"insecte",
"poison"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
48,
49
]
},
{
"id": 50,
"fr": "Taupiqueur",
"en": "Diglett",
"genus": "Pokémon Taupe",
"types": [
"sol"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
50,
51
]
},
{
"id": 51,
"fr": "Triopikeur",
"en": "Dugtrio",
"genus": "Pokémon Taupe",
"types": [
"sol"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
50,
51
]
},
{
"id": 52,
"fr": "Miaouss",
"en": "Meowth",
"genus": "Pokémon Chadégout",
"types": [
"normal"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
52,
53
]
},
{
"id": 53,
"fr": "Persian",
"en": "Persian",
"genus": "Pokémon Chadeville",
"types": [
"normal"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
52,
53
]
},
{
"id": 54,
"fr": "Psykokwak",
"en": "Psyduck",
"genus": "Pokémon Canard",
"types": [
"eau"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
54,
55
]
},
{
"id": 55,
"fr": "Akwakwak",
"en": "Golduck",
"genus": "Pokémon Canard",
"types": [
"eau"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
54,
55
]
},
{
"id": 56,
"fr": "Férosinge",
"en": "Mankey",
"genus": "Pokémon Porsinge",
"types": [
"combat"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
56,
57
]
},
{
"id": 57,
"fr": "Colossinge",
"en": "Primeape",
"genus": "Pokémon Porsinge",
"types": [
"combat"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
56,
57
]
},
{
"id": 58,
"fr": "Caninos",
"en": "Growlithe",
"genus": "Pokémon Chiot",
"types": [
"feu"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
58,
59
]
},
{
"id": 59,
"fr": "Arcanin",
"en": "Arcanine",
"genus": "Pokémon Légendaire",
"types": [
"feu"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
58,
59
]
},
{
"id": 60,
"fr": "Ptitard",
"en": "Poliwag",
"genus": "Pokémon Têtard",
"types": [
"eau"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
60,
61,
62
]
},
{
"id": 61,
"fr": "Têtarte",
"en": "Poliwhirl",
"genus": "Pokémon Têtard",
"types": [
"eau"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
60,
61,
62
]
},
{
"id": 62,
"fr": "Tartard",
"en": "Poliwrath",
"genus": "Pokémon Têtard",
"types": [
"eau",
"combat"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
60,
61,
62
]
},
{
"id": 63,
"fr": "Abra",
"en": "Abra",
"genus": "Pokémon Psy",
"types": [
"psy"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
63,
64,
65
]
},
{
"id": 64,
"fr": "Kadabra",
"en": "Kadabra",
"genus": "Pokémon Psy",
"types": [
"psy"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
63,
64,
65
]
},
{
"id": 65,
"fr": "Alakazam",
"en": "Alakazam",
"genus": "Pokémon Psy",
"types": [
"psy"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
63,
64,
65
]
},
{
"id": 66,
"fr": "Machoc",
"en": "Machop",
"genus": "Pokémon Colosse",
"types": [
"combat"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
66,
67,
68
]
},
{
"id": 67,
"fr": "Machopeur",
"en": "Machoke",
"genus": "Pokémon Colosse",
"types": [
"combat"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
66,
67,
68
]
},
{
"id": 68,
"fr": "Mackogneur",
"en": "Machamp",
"genus": "Pokémon Colosse",
"types": [
"combat"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
66,
67,
68
]
},
{
"id": 69,
"fr": "Chétiflor",
"en": "Bellsprout",
"genus": "Pokémon Fleur",
"types": [
"plante",
"poison"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
69,
70,
71
]
},
{
"id": 70,
"fr": "Boustiflor",
"en": "Weepinbell",
"genus": "Pokémon Carnivore",
"types": [
"plante",
"poison"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
69,
70,
71
]
},
{
"id": 71,
"fr": "Empiflor",
"en": "Victreebel",
"genus": "Pokémon Carnivore",
"types": [
"plante",
"poison"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
69,
70,
71
]
},
{
"id": 72,
"fr": "Tentacool",
"en": "Tentacool",
"genus": "Pokémon Mollusque",
"types": [
"eau",
"poison"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
72,
73
]
},
{
"id": 73,
"fr": "Tentacruel",
"en": "Tentacruel",
"genus": "Pokémon Mollusque",
"types": [
"eau",
"poison"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
72,
73
]
},
{
"id": 74,
"fr": "Racaillou",
"en": "Geodude",
"genus": "Pokémon Roche",
"types": [
"roche",
"sol"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
74,
75,
76
]
},
{
"id": 75,
"fr": "Gravalanch",
"en": "Graveler",
"genus": "Pokémon Roche",
"types": [
"roche",
"sol"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
74,
75,
76
]
},
{
"id": 76,
"fr": "Grolem",
"en": "Golem",
"genus": "Pokémon Titanesque",
"types": [
"roche",
"sol"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
74,
75,
76
]
},
{
"id": 77,
"fr": "Ponyta",
"en": "Ponyta",
"genus": "Pokémon Cheval Feu",
"types": [
"feu"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
77,
78
]
},
{
"id": 78,
"fr": "Galopa",
"en": "Rapidash",
"genus": "Pokémon Cheval Feu",
"types": [
"feu"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
77,
78
]
},
{
"id": 79,
"fr": "Ramoloss",
"en": "Slowpoke",
"genus": "Pokémon Crétin",
"types": [
"eau",
"psy"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
79,
80
]
},
{
"id": 80,
"fr": "Flagadoss",
"en": "Slowbro",
"genus": "Pokémon Symbiose",
"types": [
"eau",
"psy"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
79,
80
]
},
{
"id": 81,
"fr": "Magnéti",
"en": "Magnemite",
"genus": "Pokémon Magnétique",
"types": [
"électrik"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
81,
82
]
},
{
"id": 82,
"fr": "Magnéton",
"en": "Magneton",
"genus": "Pokémon Magnétique",
"types": [
"électrik"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
81,
82
]
},
{
"id": 83,
"fr": "Canarticho",
"en": "Farfetch’d",
"genus": "Pokémon Canard Fou",
"types": [
"normal",
"vol"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
83
]
},
{
"id": 84,
"fr": "Doduo",
"en": "Doduo",
"genus": "Pokémon Duoiseau",
"types": [
"normal",
"vol"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
84,
85
]
},
{
"id": 85,
"fr": "Dodrio",
"en": "Dodrio",
"genus": "Pokémon Trioiseau",
"types": [
"normal",
"vol"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
84,
85
]
},
{
"id": 86,
"fr": "Otaria",
"en": "Seel",
"genus": "Pokémon Otarie",
"types": [
"eau"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
86,
87
]
},
{
"id": 87,
"fr": "Lamantine",
"en": "Dewgong",
"genus": "Pokémon Otarie",
"types": [
"eau",
"glace"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
86,
87
]
},
{
"id": 88,
"fr": "Tadmorv",
"en": "Grimer",
"genus": "Pokémon Dégueu",
"types": [
"poison"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
88,
89
]
},
{
"id": 89,
"fr": "Grotadmorv",
"en": "Muk",
"genus": "Pokémon Dégueu",
"types": [
"poison"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
88,
89
]
},
{
"id": 90,
"fr": "Kokiyas",
"en": "Shellder",
"genus": "Pokémon Bivalve",
"types": [
"eau"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
90,
91
]
},
{
"id": 91,
"fr": "Crustabri",
"en": "Cloyster",
"genus": "Pokémon Bivalve",
"types": [
"eau",
"glace"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
90,
91
]
},
{
"id": 92,
"fr": "Fantominus",
"en": "Gastly",
"genus": "Pokémon Gaz",
"types": [
"spectre",
"poison"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
92,
93,
94
]
},
{
"id": 93,
"fr": "Spectrum",
"en": "Haunter",
"genus": "Pokémon Gaz",
"types": [
"spectre",
"poison"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
92,
93,
94
]
},
{
"id": 94,
"fr": "Ectoplasma",
"en": "Gengar",
"genus": "Pokémon Ombre",
"types": [
"spectre",
"poison"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
92,
93,
94
]
},
{
"id": 95,
"fr": "Onix",
"en": "Onix",
"genus": "Pokémon Serpenroc",
"types": [
"roche",
"sol"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
95,
208
]
},
{
"id": 96,
"fr": "Soporifik",
"en": "Drowzee",
"genus": "Pokémon Hypnose",
"types": [
"psy"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
96,
97
]
},
{
"id": 97,
"fr": "Hypnomade",
"en": "Hypno",
"genus": "Pokémon Hypnose",
"types": [
"psy"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
96,
97
]
},
{
"id": 98,
"fr": "Krabby",
"en": "Krabby",
"genus": "Pokémon Doux Crabe",
"types": [
"eau"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
98,
99
]
},
{
"id": 99,
"fr": "Krabboss",
"en": "Kingler",
"genus": "Pokémon Pince",
"types": [
"eau"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
98,
99
]
},
{
"id": 100,
"fr": "Voltorbe",
"en": "Voltorb",
"genus": "Pokémon Balle",
"types": [
"électrik"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
100,
101
]
},
{
"id": 101,
"fr": "Électrode",
"en": "Electrode",
"genus": "Pokémon Balle",
"types": [
"électrik"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
100,
101
]
},
{
"id": 102,
"fr": "Noeunoeuf",
"en": "Exeggcute",
"genus": "Pokémon Œuf",
"types": [
"plante",
"psy"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
102,
103
]
},
{
"id": 103,
"fr": "Noadkoko",
"en": "Exeggutor",
"genus": "Pokémon Fruitpalme",
"types": [
"plante",
"psy"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
102,
103
]
},
{
"id": 104,
"fr": "Osselait",
"en": "Cubone",
"genus": "Pokémon Solitaire",
"types": [
"sol"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
104,
105
]
},
{
"id": 105,
"fr": "Ossatueur",
"en": "Marowak",
"genus": "Pokémon Gard’Os",
"types": [
"sol"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
104,
105
]
},
{
"id": 106,
"fr": "Kicklee",
"en": "Hitmonlee",
"genus": "Pokémon Latteur",
"types": [
"combat"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
236,
106
]
},
{
"id": 107,
"fr": "Tygnon",
"en": "Hitmonchan",
"genus": "Pokémon Puncheur",
"types": [
"combat"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
236,
106
]
},
{
"id": 108,
"fr": "Excelangue",
"en": "Lickitung",
"genus": "Pokémon Lécheur",
"types": [
"normal"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
108
]
},
{
"id": 109,
"fr": "Smogo",
"en": "Koffing",
"genus": "Pokémon Gaz Mortel",
"types": [
"poison"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
109,
110
]
},
{
"id": 110,
"fr": "Smogogo",
"en": "Weezing",
"genus": "Pokémon Gaz Mortel",
"types": [
"poison"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
109,
110
]
},
{
"id": 111,
"fr": "Rhinocorne",
"en": "Rhyhorn",
"genus": "Pokémon Piquant",
"types": [
"sol",
"roche"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
111,
112
]
},
{
"id": 112,
"fr": "Rhinoféros",
"en": "Rhydon",
"genus": "Pokémon Perceur",
"types": [
"sol",
"roche"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
111,
112
]
},
{
"id": 113,
"fr": "Leveinard",
"en": "Chansey",
"genus": "Pokémon Œuf",
"types": [
"normal"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
440,
113,
242
]
},
{
"id": 114,
"fr": "Saquedeneu",
"en": "Tangela",
"genus": "Pokémon Vigne",
"types": [
"plante"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
114
]
},
{
"id": 115,
"fr": "Kangourex",
"en": "Kangaskhan",
"genus": "Pokémon Maternel",
"types": [
"normal"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
115
]
},
{
"id": 116,
"fr": "Hypotrempe",
"en": "Horsea",
"genus": "Pokémon Dragon",
"types": [
"eau"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
116,
117,
230
]
},
{
"id": 117,
"fr": "Hypocéan",
"en": "Seadra",
"genus": "Pokémon Dragon",
"types": [
"eau"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
116,
117,
230
]
},
{
"id": 118,
"fr": "Poissirène",
"en": "Goldeen",
"genus": "Pokémon Poisson",
"types": [
"eau"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
118,
119
]
},
{
"id": 119,
"fr": "Poissoroy",
"en": "Seaking",
"genus": "Pokémon Poisson",
"types": [
"eau"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
118,
119
]
},
{
"id": 120,
"fr": "Stari",
"en": "Staryu",
"genus": "Pokémon Étoile",
"types": [
"eau"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
120,
121
]
},
{
"id": 121,
"fr": "Staross",
"en": "Starmie",
"genus": "Pokémon Mystérieux",
"types": [
"eau",
"psy"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
120,
121
]
},
{
"id": 122,
"fr": "M. Mime",
"en": "Mr. Mime",
"genus": "Pokémon Bloqueur",
"types": [
"psy",
"normal"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
439,
122
]
},
{
"id": 123,
"fr": "Insécateur",
"en": "Scyther",
"genus": "Pokémon Mante",
"types": [
"insecte",
"vol"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
123,
212
]
},
{
"id": 124,
"fr": "Lippoutou",
"en": "Jynx",
"genus": "Pokémon Humanoïde",
"types": [
"glace",
"psy"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
238,
124
]
},
{
"id": 125,
"fr": "Élektek",
"en": "Electabuzz",
"genus": "Pokémon Électrique",
"types": [
"électrik"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
239,
125
]
},
{
"id": 126,
"fr": "Magmar",
"en": "Magmar",
"genus": "Pokémon Crache-Feu",
"types": [
"feu"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
240,
126
]
},
{
"id": 127,
"fr": "Scarabrute",
"en": "Pinsir",
"genus": "Pokémon Scarabée",
"types": [
"insecte"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
127
]
},
{
"id": 128,
"fr": "Tauros",
"en": "Tauros",
"genus": "Pokémon Buffle",
"types": [
"normal"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
128
]
},
{
"id": 129,
"fr": "Magicarpe",
"en": "Magikarp",
"genus": "Pokémon Poisson",
"types": [
"eau"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
129,
130
]
},
{
"id": 130,
"fr": "Léviator",
"en": "Gyarados",
"genus": "Pokémon Terrifiant",
"types": [
"eau",
"vol"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
129,
130
]
},
{
"id": 131,
"fr": "Lokhlass",
"en": "Lapras",
"genus": "Pokémon Transport",
"types": [
"eau",
"glace"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
131
]
},
{
"id": 132,
"fr": "Métamorph",
"en": "Ditto",
"genus": "Pokémon Morphing",
"types": [
"normal"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
132
]
},
{
"id": 133,
"fr": "Évoli",
"en": "Eevee",
"genus": "Pokémon Évolutif",
"types": [
"normal"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
133,
134
]
},
{
"id": 134,
"fr": "Aquali",
"en": "Vaporeon",
"genus": "Pokémon Bulleur",
"types": [
"eau"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
133,
134
]
},
{
"id": 135,
"fr": "Voltali",
"en": "Jolteon",
"genus": "Pokémon Orage",
"types": [
"électrik"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
133,
134
]
},
{
"id": 136,
"fr": "Pyroli",
"en": "Flareon",
"genus": "Pokémon Flamme",
"types": [
"feu"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
133,
134
]
},
{
"id": 137,
"fr": "Porygon",
"en": "Porygon",
"genus": "Pokémon Virtuel",
"types": [
"normal"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
137,
233
]
},
{
"id": 138,
"fr": "Amonita",
"en": "Omanyte",
"genus": "Pokémon Spirale",
"types": [
"roche",
"eau"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
138,
139
]
},
{
"id": 139,
"fr": "Amonistar",
"en": "Omastar",
"genus": "Pokémon Spirale",
"types": [
"roche",
"eau"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
138,
139
]
},
{
"id": 140,
"fr": "Kabuto",
"en": "Kabuto",
"genus": "Pokémon Carapace",
"types": [
"roche",
"eau"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
140,
141
]
},
{
"id": 141,
"fr": "Kabutops",
"en": "Kabutops",
"genus": "Pokémon Carapace",
"types": [
"roche",
"eau"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
140,
141
]
},
{
"id": 142,
"fr": "Ptéra",
"en": "Aerodactyl",
"genus": "Pokémon Fossile",
"types": [
"roche",
"vol"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
142
]
},
{
"id": 143,
"fr": "Ronflex",
"en": "Snorlax",
"genus": "Pokémon Pionceur",
"types": [
"normal"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
446,
143
]
},
{
"id": 144,
"fr": "Artikodin",
"en": "Articuno",
"genus": "Pokémon Glaciaire",
"types": [
"glace",
"vol"
],
"gen": 1,
"leg": true,
"myth": false,
"chain": [
144
]
},
{
"id": 145,
"fr": "Électhor",
"en": "Zapdos",
"genus": "Pokémon Électrique",
"types": [
"électrik",
"vol"
],
"gen": 1,
"leg": true,
"myth": false,
"chain": [
145
]
},
{
"id": 146,
"fr": "Sulfura",
"en": "Moltres",
"genus": "Pokémon Flamme",
"types": [
"feu",
"vol"
],
"gen": 1,
"leg": true,
"myth": false,
"chain": [
146
]
},
{
"id": 147,
"fr": "Minidraco",
"en": "Dratini",
"genus": "Pokémon Dragon",
"types": [
"dragon"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
147,
148,
149
]
},
{
"id": 148,
"fr": "Draco",
"en": "Dragonair",
"genus": "Pokémon Dragon",
"types": [
"dragon"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
147,
148,
149
]
},
{
"id": 149,
"fr": "Dracolosse",
"en": "Dragonite",
"genus": "Pokémon Dragon",
"types": [
"dragon",
"vol"
],
"gen": 1,
"leg": false,
"myth": false,
"chain": [
147,
148,
149
]
},
{
"id": 150,
"fr": "Mewtwo",
"en": "Mewtwo",
"genus": "Pokémon Génétique",
"types": [
"psy"
],
"gen": 1,
"leg": true,
"myth": false,
"chain": [
150
]
},
{
"id": 151,
"fr": "Mew",
"en": "Mew",
"genus": "Pokémon Nouveau",
"types": [
"psy"
],
"gen": 1,
"leg": false,
"myth": true,
"chain": [
151
]
},
{
"id": 152,
"fr": "Germignon",
"en": "Chikorita",
"genus": "Pokémon Feuille",
"types": [
"plante"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
152,
153,
154
]
},
{
"id": 153,
"fr": "Macronium",
"en": "Bayleef",
"genus": "Pokémon Feuille",
"types": [
"plante"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
152,
153,
154
]
},
{
"id": 154,
"fr": "Méganium",
"en": "Meganium",
"genus": "Pokémon Herbe",
"types": [
"plante"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
152,
153,
154
]
},
{
"id": 155,
"fr": "Héricendre",
"en": "Cyndaquil",
"genus": "Pokémon Souris Feu",
"types": [
"feu"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
155,
156,
157
]
},
{
"id": 156,
"fr": "Feurisson",
"en": "Quilava",
"genus": "Pokémon Volcan",
"types": [
"feu"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
155,
156,
157
]
},
{
"id": 157,
"fr": "Typhlosion",
"en": "Typhlosion",
"genus": "Pokémon Volcan",
"types": [
"feu"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
155,
156,
157
]
},
{
"id": 158,
"fr": "Kaiminus",
"en": "Totodile",
"genus": "Pokémon Mâchoire",
"types": [
"eau"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
158,
159,
160
]
},
{
"id": 159,
"fr": "Crocrodil",
"en": "Croconaw",
"genus": "Pokémon Mâchoire",
"types": [
"eau"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
158,
159,
160
]
},
{
"id": 160,
"fr": "Aligatueur",
"en": "Feraligatr",
"genus": "Pokémon Mâchoire",
"types": [
"eau"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
158,
159,
160
]
},
{
"id": 161,
"fr": "Fouinette",
"en": "Sentret",
"genus": "Pokémon Espion",
"types": [
"normal"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
161,
162
]
},
{
"id": 162,
"fr": "Fouinar",
"en": "Furret",
"genus": "Pokémon Allongé",
"types": [
"normal"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
161,
162
]
},
{
"id": 163,
"fr": "Hoothoot",
"en": "Hoothoot",
"genus": "Pokémon Hibou",
"types": [
"normal",
"vol"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
163,
164
]
},
{
"id": 164,
"fr": "Noarfang",
"en": "Noctowl",
"genus": "Pokémon Hibou",
"types": [
"normal",
"vol"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
163,
164
]
},
{
"id": 165,
"fr": "Coxy",
"en": "Ledyba",
"genus": "Pokémon 5 Étoiles",
"types": [
"insecte",
"vol"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
165,
166
]
},
{
"id": 166,
"fr": "Coxyclaque",
"en": "Ledian",
"genus": "Pokémon 5 Étoiles",
"types": [
"insecte",
"vol"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
165,
166
]
},
{
"id": 167,
"fr": "Mimigal",
"en": "Spinarak",
"genus": "Pokémon Crache Fil",
"types": [
"insecte",
"poison"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
167,
168
]
},
{
"id": 168,
"fr": "Migalos",
"en": "Ariados",
"genus": "Pokémon Long-Patte",
"types": [
"insecte",
"poison"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
167,
168
]
},
{
"id": 169,
"fr": "Nostenfer",
"en": "Crobat",
"genus": "Pokémon Chovsouris",
"types": [
"poison",
"vol"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
41,
42,
169
]
},
{
"id": 170,
"fr": "Loupio",
"en": "Chinchou",
"genus": "Pokémon Poisson",
"types": [
"eau",
"électrik"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
170,
171
]
},
{
"id": 171,
"fr": "Lanturn",
"en": "Lanturn",
"genus": "Pokémon Lumière",
"types": [
"eau",
"électrik"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
170,
171
]
},
{
"id": 172,
"fr": "Pichu",
"en": "Pichu",
"genus": "Pokémon Minisouris",
"types": [
"électrik"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
172,
25,
26
]
},
{
"id": 173,
"fr": "Mélo",
"en": "Cleffa",
"genus": "Pokémon Étoile",
"types": [
"normal"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
173,
35,
36
]
},
{
"id": 174,
"fr": "Toudoudou",
"en": "Igglybuff",
"genus": "Pokémon Bouboule",
"types": [
"normal",
"normal"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
174,
39,
40
]
},
{
"id": 175,
"fr": "Togepi",
"en": "Togepi",
"genus": "Pokémon Balle Pic",
"types": [
"normal"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
175,
176
]
},
{
"id": 176,
"fr": "Togetic",
"en": "Togetic",
"genus": "Pokémon Bonheur",
"types": [
"normal",
"vol"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
175,
176
]
},
{
"id": 177,
"fr": "Natu",
"en": "Natu",
"genus": "Pokémon Minoiseau",
"types": [
"psy",
"vol"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
177,
178
]
},
{
"id": 178,
"fr": "Xatu",
"en": "Xatu",
"genus": "Pokémon Mystique",
"types": [
"psy",
"vol"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
177,
178
]
},
{
"id": 179,
"fr": "Wattouat",
"en": "Mareep",
"genus": "Pokémon Laine",
"types": [
"électrik"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
179,
180,
181
]
},
{
"id": 180,
"fr": "Lainergie",
"en": "Flaaffy",
"genus": "Pokémon Laine",
"types": [
"électrik"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
179,
180,
181
]
},
{
"id": 181,
"fr": "Pharamp",
"en": "Ampharos",
"genus": "Pokémon Lumière",
"types": [
"électrik"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
179,
180,
181
]
},
{
"id": 182,
"fr": "Joliflor",
"en": "Bellossom",
"genus": "Pokémon Fleur",
"types": [
"plante"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
43,
44,
45
]
},
{
"id": 183,
"fr": "Marill",
"en": "Marill",
"genus": "Pokémon Aquasouris",
"types": [
"eau"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
298,
183,
184
]
},
{
"id": 184,
"fr": "Azumarill",
"en": "Azumarill",
"genus": "Pokémon Aqualapin",
"types": [
"eau",
"normal"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
298,
183,
184
]
},
{
"id": 185,
"fr": "Simularbre",
"en": "Sudowoodo",
"genus": "Pokémon Imitation",
"types": [
"roche"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
438,
185
]
},
{
"id": 186,
"fr": "Tarpaud",
"en": "Politoed",
"genus": "Pokémon Grenouille",
"types": [
"eau"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
60,
61,
62
]
},
{
"id": 187,
"fr": "Granivol",
"en": "Hoppip",
"genus": "Pokémon Pissenlit",
"types": [
"plante",
"vol"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
187,
188,
189
]
},
{
"id": 188,
"fr": "Floravol",
"en": "Skiploom",
"genus": "Pokémon Pissenlit",
"types": [
"plante",
"vol"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
187,
188,
189
]
},
{
"id": 189,
"fr": "Cotovol",
"en": "Jumpluff",
"genus": "Pokémon Pissenlit",
"types": [
"plante",
"vol"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
187,
188,
189
]
},
{
"id": 190,
"fr": "Capumain",
"en": "Aipom",
"genus": "Pokémon Longqueue",
"types": [
"normal"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
190
]
},
{
"id": 191,
"fr": "Tournegrin",
"en": "Sunkern",
"genus": "Pokémon Graine",
"types": [
"plante"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
191,
192
]
},
{
"id": 192,
"fr": "Héliatronc",
"en": "Sunflora",
"genus": "Pokémon Soleil",
"types": [
"plante"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
191,
192
]
},
{
"id": 193,
"fr": "Yanma",
"en": "Yanma",
"genus": "Pokémon Translaile",
"types": [
"insecte",
"vol"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
193
]
},
{
"id": 194,
"fr": "Axoloto",
"en": "Wooper",
"genus": "Pokémon Poisson",
"types": [
"eau",
"sol"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
194,
195
]
},
{
"id": 195,
"fr": "Maraiste",
"en": "Quagsire",
"genus": "Pokémon Poisson",
"types": [
"eau",
"sol"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
194,
195
]
},
{
"id": 196,
"fr": "Mentali",
"en": "Espeon",
"genus": "Pokémon Soleil",
"types": [
"psy"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
133,
134
]
},
{
"id": 197,
"fr": "Noctali",
"en": "Umbreon",
"genus": "Pokémon Lune",
"types": [
"ténèbres"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
133,
134
]
},
{
"id": 198,
"fr": "Cornèbre",
"en": "Murkrow",
"genus": "Pokémon Obscurité",
"types": [
"ténèbres",
"vol"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
198
]
},
{
"id": 199,
"fr": "Roigada",
"en": "Slowking",
"genus": "Pokémon Royal",
"types": [
"eau",
"psy"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
79,
80
]
},
{
"id": 200,
"fr": "Feuforêve",
"en": "Misdreavus",
"genus": "Pokémon Strident",
"types": [
"spectre"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
200
]
},
{
"id": 201,
"fr": "Zarbi",
"en": "Unown",
"genus": "Pokémon Symbolique",
"types": [
"psy"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
201
]
},
{
"id": 202,
"fr": "Qulbutoké",
"en": "Wobbuffet",
"genus": "Pokémon Patient",
"types": [
"psy"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
360,
202
]
},
{
"id": 203,
"fr": "Girafarig",
"en": "Girafarig",
"genus": "Pokémon Long-Cou",
"types": [
"normal",
"psy"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
203
]
},
{
"id": 204,
"fr": "Pomdepik",
"en": "Pineco",
"genus": "Pokémon Ver Caché",
"types": [
"insecte"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
204,
205
]
},
{
"id": 205,
"fr": "Foretress",
"en": "Forretress",
"genus": "Pokémon Ver Caché",
"types": [
"insecte",
"acier"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
204,
205
]
},
{
"id": 206,
"fr": "Insolourdo",
"en": "Dunsparce",
"genus": "Pokémon Serpent",
"types": [
"normal"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
206
]
},
{
"id": 207,
"fr": "Scorplane",
"en": "Gligar",
"genus": "Pokémon Scorpivol",
"types": [
"sol",
"vol"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
207
]
},
{
"id": 208,
"fr": "Steelix",
"en": "Steelix",
"genus": "Pokémon Serpenfer",
"types": [
"acier",
"sol"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
95,
208
]
},
{
"id": 209,
"fr": "Snubbull",
"en": "Snubbull",
"genus": "Pokémon Fée",
"types": [
"normal"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
209,
210
]
},
{
"id": 210,
"fr": "Granbull",
"en": "Granbull",
"genus": "Pokémon Fée",
"types": [
"normal"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
209,
210
]
},
{
"id": 211,
"fr": "Qwilfish",
"en": "Qwilfish",
"genus": "Pokémon Bouboule",
"types": [
"eau",
"poison"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
211
]
},
{
"id": 212,
"fr": "Cizayox",
"en": "Scizor",
"genus": "Pokémon Pince",
"types": [
"insecte",
"acier"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
123,
212
]
},
{
"id": 213,
"fr": "Caratroc",
"en": "Shuckle",
"genus": "Pokémon Pourri",
"types": [
"insecte",
"roche"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
213
]
},
{
"id": 214,
"fr": "Scarhino",
"en": "Heracross",
"genus": "Pokémon Unicorne",
"types": [
"insecte",
"combat"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
214
]
},
{
"id": 215,
"fr": "Farfuret",
"en": "Sneasel",
"genus": "Pokémon Grifacérée",
"types": [
"ténèbres",
"glace"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
215
]
},
{
"id": 216,
"fr": "Teddiursa",
"en": "Teddiursa",
"genus": "Pokémon Mini Ours",
"types": [
"normal"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
216,
217
]
},
{
"id": 217,
"fr": "Ursaring",
"en": "Ursaring",
"genus": "Pokémon Hibernant",
"types": [
"normal"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
216,
217
]
},
{
"id": 218,
"fr": "Limagma",
"en": "Slugma",
"genus": "Pokémon Lave",
"types": [
"feu"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
218,
219
]
},
{
"id": 219,
"fr": "Volcaropod",
"en": "Magcargo",
"genus": "Pokémon Lave",
"types": [
"feu",
"roche"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
218,
219
]
},
{
"id": 220,
"fr": "Marcacrin",
"en": "Swinub",
"genus": "Pokémon Cochon",
"types": [
"glace",
"sol"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
220,
221
]
},
{
"id": 221,
"fr": "Cochignon",
"en": "Piloswine",
"genus": "Pokémon Porc",
"types": [
"glace",
"sol"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
220,
221
]
},
{
"id": 222,
"fr": "Corayon",
"en": "Corsola",
"genus": "Pokémon Corail",
"types": [
"eau",
"roche"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
222
]
},
{
"id": 223,
"fr": "Rémoraid",
"en": "Remoraid",
"genus": "Pokémon Jet",
"types": [
"eau"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
223,
224
]
},
{
"id": 224,
"fr": "Octillery",
"en": "Octillery",
"genus": "Pokémon Jet",
"types": [
"eau"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
223,
224
]
},
{
"id": 225,
"fr": "Cadoizo",
"en": "Delibird",
"genus": "Pokémon Livraison",
"types": [
"glace",
"vol"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
225
]
},
{
"id": 226,
"fr": "Démanta",
"en": "Mantine",
"genus": "Pokémon Cervolant",
"types": [
"eau",
"vol"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
458,
226
]
},
{
"id": 227,
"fr": "Airmure",
"en": "Skarmory",
"genus": "Pokémon Armoiseau",
"types": [
"acier",
"vol"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
227
]
},
{
"id": 228,
"fr": "Malosse",
"en": "Houndour",
"genus": "Pokémon Sombre",
"types": [
"ténèbres",
"feu"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
228,
229
]
},
{
"id": 229,
"fr": "Démolosse",
"en": "Houndoom",
"genus": "Pokémon Sombre",
"types": [
"ténèbres",
"feu"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
228,
229
]
},
{
"id": 230,
"fr": "Hyporoi",
"en": "Kingdra",
"genus": "Pokémon Dragon",
"types": [
"eau",
"dragon"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
116,
117,
230
]
},
{
"id": 231,
"fr": "Phanpy",
"en": "Phanpy",
"genus": "Pokémon Long-Nez",
"types": [
"sol"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
231,
232
]
},
{
"id": 232,
"fr": "Donphan",
"en": "Donphan",
"genus": "Pokémon Armure",
"types": [
"sol"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
231,
232
]
},
{
"id": 233,
"fr": "Porygon2",
"en": "Porygon2",
"genus": "Pokémon Virtuel",
"types": [
"normal"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
137,
233
]
},
{
"id": 234,
"fr": "Cerfrousse",
"en": "Stantler",
"genus": "Pokémon Maxi Corne",
"types": [
"normal"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
234
]
},
{
"id": 235,
"fr": "Queulorior",
"en": "Smeargle",
"genus": "Pokémon Peintre",
"types": [
"normal"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
235
]
},
{
"id": 236,
"fr": "Debugant",
"en": "Tyrogue",
"genus": "Pokémon Bagarreur",
"types": [
"combat"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
236,
106
]
},
{
"id": 237,
"fr": "Kapoera",
"en": "Hitmontop",
"genus": "Pokémon Poirier",
"types": [
"combat"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
236,
106
]
},
{
"id": 238,
"fr": "Lippouti",
"en": "Smoochum",
"genus": "Pokémon Bisou",
"types": [
"glace",
"psy"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
238,
124
]
},
{
"id": 239,
"fr": "Élekid",
"en": "Elekid",
"genus": "Pokémon Électrique",
"types": [
"électrik"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
239,
125
]
},
{
"id": 240,
"fr": "Magby",
"en": "Magby",
"genus": "Pokémon Charbon",
"types": [
"feu"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
240,
126
]
},
{
"id": 241,
"fr": "Écrémeuh",
"en": "Miltank",
"genus": "Pokémon Vachalait",
"types": [
"normal"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
241
]
},
{
"id": 242,
"fr": "Leuphorie",
"en": "Blissey",
"genus": "Pokémon Bonheur",
"types": [
"normal"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
440,
113,
242
]
},
{
"id": 243,
"fr": "Raikou",
"en": "Raikou",
"genus": "Pokémon Foudre",
"types": [
"électrik"
],
"gen": 2,
"leg": true,
"myth": false,
"chain": [
243
]
},
{
"id": 244,
"fr": "Entei",
"en": "Entei",
"genus": "Pokémon Volcan",
"types": [
"feu"
],
"gen": 2,
"leg": true,
"myth": false,
"chain": [
244
]
},
{
"id": 245,
"fr": "Suicune",
"en": "Suicune",
"genus": "Pokémon Aurore",
"types": [
"eau"
],
"gen": 2,
"leg": true,
"myth": false,
"chain": [
245
]
},
{
"id": 246,
"fr": "Embrylex",
"en": "Larvitar",
"genus": "Pokémon Peaupierre",
"types": [
"roche",
"sol"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
246,
247,
248
]
},
{
"id": 247,
"fr": "Ymphect",
"en": "Pupitar",
"genus": "Pokémon Carapadure",
"types": [
"roche",
"sol"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
246,
247,
248
]
},
{
"id": 248,
"fr": "Tyranocif",
"en": "Tyranitar",
"genus": "Pokémon Armure",
"types": [
"roche",
"ténèbres"
],
"gen": 2,
"leg": false,
"myth": false,
"chain": [
246,
247,
248
]
},
{
"id": 249,
"fr": "Lugia",
"en": "Lugia",
"genus": "Pokémon Plongeon",
"types": [
"psy",
"vol"
],
"gen": 2,
"leg": true,
"myth": false,
"chain": [
249
]
},
{
"id": 250,
"fr": "Ho-Oh",
"en": "Ho-Oh",
"genus": "Pokémon Arcenciel",
"types": [
"feu",
"vol"
],
"gen": 2,
"leg": true,
"myth": false,
"chain": [
250
]
},
{
"id": 251,
"fr": "Celebi",
"en": "Celebi",
"genus": "Pokémon Temporel",
"types": [
"psy",
"plante"
],
"gen": 2,
"leg": false,
"myth": true,
"chain": [
251
]
},
{
"id": 252,
"fr": "Arcko",
"en": "Treecko",
"genus": "Pokémon Bois Gecko",
"types": [
"plante"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
252,
253,
254
]
},
{
"id": 253,
"fr": "Massko",
"en": "Grovyle",
"genus": "Pokémon Bois Gecko",
"types": [
"plante"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
252,
253,
254
]
},
{
"id": 254,
"fr": "Jungko",
"en": "Sceptile",
"genus": "Pokémon Forêt",
"types": [
"plante"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
252,
253,
254
]
},
{
"id": 255,
"fr": "Poussifeu",
"en": "Torchic",
"genus": "Pokémon Poussin",
"types": [
"feu"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
255,
256,
257
]
},
{
"id": 256,
"fr": "Galifeu",
"en": "Combusken",
"genus": "Pokémon Poulet",
"types": [
"feu",
"combat"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
255,
256,
257
]
},
{
"id": 257,
"fr": "Braségali",
"en": "Blaziken",
"genus": "Pokémon Ardent",
"types": [
"feu",
"combat"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
255,
256,
257
]
},
{
"id": 258,
"fr": "Gobou",
"en": "Mudkip",
"genus": "Pokémon Poissonboue",
"types": [
"eau"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
258,
259,
260
]
},
{
"id": 259,
"fr": "Flobio",
"en": "Marshtomp",
"genus": "Pokémon Poissonboue",
"types": [
"eau",
"sol"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
258,
259,
260
]
},
{
"id": 260,
"fr": "Laggron",
"en": "Swampert",
"genus": "Pokémon Poissonboue",
"types": [
"eau",
"sol"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
258,
259,
260
]
},
{
"id": 261,
"fr": "Medhyèna",
"en": "Poochyena",
"genus": "Pokémon Morsure",
"types": [
"ténèbres"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
261,
262
]
},
{
"id": 262,
"fr": "Grahyèna",
"en": "Mightyena",
"genus": "Pokémon Morsure",
"types": [
"ténèbres"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
261,
262
]
},
{
"id": 263,
"fr": "Zigzaton",
"en": "Zigzagoon",
"genus": "Pokémon Petit Raton",
"types": [
"normal"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
263,
264
]
},
{
"id": 264,
"fr": "Linéon",
"en": "Linoone",
"genus": "Pokémon Fonceur",
"types": [
"normal"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
263,
264
]
},
{
"id": 265,
"fr": "Chenipotte",
"en": "Wurmple",
"genus": "Pokémon Ver",
"types": [
"insecte"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
265,
266,
267
]
},
{
"id": 266,
"fr": "Armulys",
"en": "Silcoon",
"genus": "Pokémon Cocon",
"types": [
"insecte"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
265,
266,
267
]
},
{
"id": 267,
"fr": "Charmillon",
"en": "Beautifly",
"genus": "Pokémon Papillon",
"types": [
"insecte",
"vol"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
265,
266,
267
]
},
{
"id": 268,
"fr": "Blindalys",
"en": "Cascoon",
"genus": "Pokémon Cocon",
"types": [
"insecte"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
265,
266,
267
]
},
{
"id": 269,
"fr": "Papinox",
"en": "Dustox",
"genus": "Pokémon Papipoison",
"types": [
"insecte",
"poison"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
265,
266,
267
]
},
{
"id": 270,
"fr": "Nénupiot",
"en": "Lotad",
"genus": "Pokémon Aquaplante",
"types": [
"eau",
"plante"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
270,
271,
272
]
},
{
"id": 271,
"fr": "Lombre",
"en": "Lombre",
"genus": "Pokémon Jovial",
"types": [
"eau",
"plante"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
270,
271,
272
]
},
{
"id": 272,
"fr": "Ludicolo",
"en": "Ludicolo",
"genus": "Pokémon Insouciant",
"types": [
"eau",
"plante"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
270,
271,
272
]
},
{
"id": 273,
"fr": "Grainipiot",
"en": "Seedot",
"genus": "Pokémon Gland",
"types": [
"plante"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
273,
274,
275
]
},
{
"id": 274,
"fr": "Pifeuil",
"en": "Nuzleaf",
"genus": "Pokémon Malin",
"types": [
"plante",
"ténèbres"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
273,
274,
275
]
},
{
"id": 275,
"fr": "Tengalice",
"en": "Shiftry",
"genus": "Pokémon Malveillant",
"types": [
"plante",
"ténèbres"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
273,
274,
275
]
},
{
"id": 276,
"fr": "Nirondelle",
"en": "Taillow",
"genus": "Pokémon Minirondel",
"types": [
"normal",
"vol"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
276,
277
]
},
{
"id": 277,
"fr": "Hélédelle",
"en": "Swellow",
"genus": "Pokémon Hirondelle",
"types": [
"normal",
"vol"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
276,
277
]
},
{
"id": 278,
"fr": "Goélise",
"en": "Wingull",
"genus": "Pokémon Mouette",
"types": [
"eau",
"vol"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
278,
279
]
},
{
"id": 279,
"fr": "Bekipan",
"en": "Pelipper",
"genus": "Pokémon Oiseaudo",
"types": [
"eau",
"vol"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
278,
279
]
},
{
"id": 280,
"fr": "Tarsal",
"en": "Ralts",
"genus": "Pokémon Sentiment",
"types": [
"psy",
"normal"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
280,
281,
282
]
},
{
"id": 281,
"fr": "Kirlia",
"en": "Kirlia",
"genus": "Pokémon Émotion",
"types": [
"psy",
"normal"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
280,
281,
282
]
},
{
"id": 282,
"fr": "Gardevoir",
"en": "Gardevoir",
"genus": "Pokémon Étreinte",
"types": [
"psy",
"normal"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
280,
281,
282
]
},
{
"id": 283,
"fr": "Arakdo",
"en": "Surskit",
"genus": "Pokémon Maresurfeur",
"types": [
"insecte",
"eau"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
283,
284
]
},
{
"id": 284,
"fr": "Maskadra",
"en": "Masquerain",
"genus": "Pokémon Boule Œil",
"types": [
"insecte",
"vol"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
283,
284
]
},
{
"id": 285,
"fr": "Balignon",
"en": "Shroomish",
"genus": "Pokémon Champignon",
"types": [
"plante"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
285,
286
]
},
{
"id": 286,
"fr": "Chapignon",
"en": "Breloom",
"genus": "Pokémon Champignon",
"types": [
"plante",
"combat"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
285,
286
]
},
{
"id": 287,
"fr": "Parecool",
"en": "Slakoth",
"genus": "Pokémon Flâneur",
"types": [
"normal"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
287,
288,
289
]
},
{
"id": 288,
"fr": "Vigoroth",
"en": "Vigoroth",
"genus": "Pokémon Turbusinge",
"types": [
"normal"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
287,
288,
289
]
},
{
"id": 289,
"fr": "Monaflèmit",
"en": "Slaking",
"genus": "Pokémon Fainéant",
"types": [
"normal"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
287,
288,
289
]
},
{
"id": 290,
"fr": "Ningale",
"en": "Nincada",
"genus": "Pokémon Apprenti",
"types": [
"insecte",
"sol"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
290,
291
]
},
{
"id": 291,
"fr": "Ninjask",
"en": "Ninjask",
"genus": "Pokémon Ninja",
"types": [
"insecte",
"vol"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
290,
291
]
},
{
"id": 292,
"fr": "Munja",
"en": "Shedinja",
"genus": "Pokémon Exuvie",
"types": [
"insecte",
"spectre"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
290,
291
]
},
{
"id": 293,
"fr": "Chuchmur",
"en": "Whismur",
"genus": "Pokémon Chuchoteur",
"types": [
"normal"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
293,
294,
295
]
},
{
"id": 294,
"fr": "Ramboum",
"en": "Loudred",
"genus": "Pokémon Grosse Voix",
"types": [
"normal"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
293,
294,
295
]
},
{
"id": 295,
"fr": "Brouhabam",
"en": "Exploud",
"genus": "Pokémon Bruit Sourd",
"types": [
"normal"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
293,
294,
295
]
},
{
"id": 296,
"fr": "Makuhita",
"en": "Makuhita",
"genus": "Pokémon Tenace",
"types": [
"combat"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
296,
297
]
},
{
"id": 297,
"fr": "Hariyama",
"en": "Hariyama",
"genus": "Pokémon Cogneur",
"types": [
"combat"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
296,
297
]
},
{
"id": 298,
"fr": "Azurill",
"en": "Azurill",
"genus": "Pokémon Point Polka",
"types": [
"normal"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
298,
183,
184
]
},
{
"id": 299,
"fr": "Tarinor",
"en": "Nosepass",
"genus": "Pokémon Boussole",
"types": [
"roche"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
299
]
},
{
"id": 300,
"fr": "Skitty",
"en": "Skitty",
"genus": "Pokémon Chaton",
"types": [
"normal"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
300,
301
]
},
{
"id": 301,
"fr": "Delcatty",
"en": "Delcatty",
"genus": "Pokémon Guindé",
"types": [
"normal"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
300,
301
]
},
{
"id": 302,
"fr": "Ténéfix",
"en": "Sableye",
"genus": "Pokémon Obscurité",
"types": [
"ténèbres",
"spectre"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
302
]
},
{
"id": 303,
"fr": "Mysdibule",
"en": "Mawile",
"genus": "Pokémon Trompeur",
"types": [
"acier",
"normal"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
303
]
},
{
"id": 304,
"fr": "Galekid",
"en": "Aron",
"genus": "Pokémon Armurfer",
"types": [
"acier",
"roche"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
304,
305,
306
]
},
{
"id": 305,
"fr": "Galegon",
"en": "Lairon",
"genus": "Pokémon Armurfer",
"types": [
"acier",
"roche"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
304,
305,
306
]
},
{
"id": 306,
"fr": "Galeking",
"en": "Aggron",
"genus": "Pokémon Armurfer",
"types": [
"acier",
"roche"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
304,
305,
306
]
},
{
"id": 307,
"fr": "Méditikka",
"en": "Meditite",
"genus": "Pokémon Méditation",
"types": [
"combat",
"psy"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
307,
308
]
},
{
"id": 308,
"fr": "Charmina",
"en": "Medicham",
"genus": "Pokémon Méditation",
"types": [
"combat",
"psy"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
307,
308
]
},
{
"id": 309,
"fr": "Dynavolt",
"en": "Electrike",
"genus": "Pokémon Orage",
"types": [
"électrik"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
309,
310
]
},
{
"id": 310,
"fr": "Élecsprint",
"en": "Manectric",
"genus": "Pokémon Décharge",
"types": [
"électrik"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
309,
310
]
},
{
"id": 311,
"fr": "Posipi",
"en": "Plusle",
"genus": "Pokémon Acclameur",
"types": [
"électrik"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
311
]
},
{
"id": 312,
"fr": "Négapi",
"en": "Minun",
"genus": "Pokémon Acclameur",
"types": [
"électrik"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
312
]
},
{
"id": 313,
"fr": "Muciole",
"en": "Volbeat",
"genus": "Pokémon Luciole",
"types": [
"insecte"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
313
]
},
{
"id": 314,
"fr": "Lumivole",
"en": "Illumise",
"genus": "Pokémon Luciole",
"types": [
"insecte"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
314
]
},
{
"id": 315,
"fr": "Rosélia",
"en": "Roselia",
"genus": "Pokémon Épine",
"types": [
"plante",
"poison"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
406,
315
]
},
{
"id": 316,
"fr": "Gloupti",
"en": "Gulpin",
"genus": "Pokémon Estomac",
"types": [
"poison"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
316,
317
]
},
{
"id": 317,
"fr": "Avaltout",
"en": "Swalot",
"genus": "Pokémon Sac Poison",
"types": [
"poison"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
316,
317
]
},
{
"id": 318,
"fr": "Carvanha",
"en": "Carvanha",
"genus": "Pokémon Féroce",
"types": [
"eau",
"ténèbres"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
318,
319
]
},
{
"id": 319,
"fr": "Sharpedo",
"en": "Sharpedo",
"genus": "Pokémon Brutal",
"types": [
"eau",
"ténèbres"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
318,
319
]
},
{
"id": 320,
"fr": "Wailmer",
"en": "Wailmer",
"genus": "Pokémon Baleinboule",
"types": [
"eau"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
320,
321
]
},
{
"id": 321,
"fr": "Wailord",
"en": "Wailord",
"genus": "Pokémon Cachabouée",
"types": [
"eau"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
320,
321
]
},
{
"id": 322,
"fr": "Chamallot",
"en": "Numel",
"genus": "Pokémon Engourdi",
"types": [
"feu",
"sol"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
322,
323
]
},
{
"id": 323,
"fr": "Camérupt",
"en": "Camerupt",
"genus": "Pokémon Éruption",
"types": [
"feu",
"sol"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
322,
323
]
},
{
"id": 324,
"fr": "Chartor",
"en": "Torkoal",
"genus": "Pokémon Charbon",
"types": [
"feu"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
324
]
},
{
"id": 325,
"fr": "Spoink",
"en": "Spoink",
"genus": "Pokémon Rebond",
"types": [
"psy"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
325,
326
]
},
{
"id": 326,
"fr": "Groret",
"en": "Grumpig",
"genus": "Pokémon Magouilleur",
"types": [
"psy"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
325,
326
]
},
{
"id": 327,
"fr": "Spinda",
"en": "Spinda",
"genus": "Pokémon Panda Tache",
"types": [
"normal"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
327
]
},
{
"id": 328,
"fr": "Kraknoix",
"en": "Trapinch",
"genus": "Pokémon Piégeur",
"types": [
"sol"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
328,
329,
330
]
},
{
"id": 329,
"fr": "Vibraninf",
"en": "Vibrava",
"genus": "Pokémon Vibration",
"types": [
"sol",
"dragon"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
328,
329,
330
]
},
{
"id": 330,
"fr": "Libégon",
"en": "Flygon",
"genus": "Pokémon Mystique",
"types": [
"sol",
"dragon"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
328,
329,
330
]
},
{
"id": 331,
"fr": "Cacnea",
"en": "Cacnea",
"genus": "Pokémon Cactus",
"types": [
"plante"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
331,
332
]
},
{
"id": 332,
"fr": "Cacturne",
"en": "Cacturne",
"genus": "Pokémon Épouvantail",
"types": [
"plante",
"ténèbres"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
331,
332
]
},
{
"id": 333,
"fr": "Tylton",
"en": "Swablu",
"genus": "Pokémon Oiseaucoton",
"types": [
"normal",
"vol"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
333,
334
]
},
{
"id": 334,
"fr": "Altaria",
"en": "Altaria",
"genus": "Pokémon Virevolteur",
"types": [
"dragon",
"vol"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
333,
334
]
},
{
"id": 335,
"fr": "Mangriff",
"en": "Zangoose",
"genus": "Pokémon Chat Furet",
"types": [
"normal"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
335
]
},
{
"id": 336,
"fr": "Séviper",
"en": "Seviper",
"genus": "Pokémon Serpacroc",
"types": [
"poison"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
336
]
},
{
"id": 337,
"fr": "Séléroc",
"en": "Lunatone",
"genus": "Pokémon Météorite",
"types": [
"roche",
"psy"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
337
]
},
{
"id": 338,
"fr": "Solaroc",
"en": "Solrock",
"genus": "Pokémon Météorite",
"types": [
"roche",
"psy"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
338
]
},
{
"id": 339,
"fr": "Barloche",
"en": "Barboach",
"genus": "Pokémon Barbillon",
"types": [
"eau",
"sol"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
339,
340
]
},
{
"id": 340,
"fr": "Barbicha",
"en": "Whiscash",
"genus": "Pokémon Barbillon",
"types": [
"eau",
"sol"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
339,
340
]
},
{
"id": 341,
"fr": "Écrapince",
"en": "Corphish",
"genus": "Pokémon Brute",
"types": [
"eau"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
341,
342
]
},
{
"id": 342,
"fr": "Colhomard",
"en": "Crawdaunt",
"genus": "Pokémon Crapule",
"types": [
"eau",
"ténèbres"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
341,
342
]
},
{
"id": 343,
"fr": "Balbuto",
"en": "Baltoy",
"genus": "Pokémon Poupargile",
"types": [
"sol",
"psy"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
343,
344
]
},
{
"id": 344,
"fr": "Kaorine",
"en": "Claydol",
"genus": "Pokémon Poupargile",
"types": [
"sol",
"psy"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
343,
344
]
},
{
"id": 345,
"fr": "Lilia",
"en": "Lileep",
"genus": "Pokémon Lis d’Eau",
"types": [
"roche",
"plante"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
345,
346
]
},
{
"id": 346,
"fr": "Vacilys",
"en": "Cradily",
"genus": "Pokémon Bernacle",
"types": [
"roche",
"plante"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
345,
346
]
},
{
"id": 347,
"fr": "Anorith",
"en": "Anorith",
"genus": "Pokémon Crustage",
"types": [
"roche",
"insecte"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
347,
348
]
},
{
"id": 348,
"fr": "Armaldo",
"en": "Armaldo",
"genus": "Pokémon Blindage",
"types": [
"roche",
"insecte"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
347,
348
]
},
{
"id": 349,
"fr": "Barpau",
"en": "Feebas",
"genus": "Pokémon Poisson",
"types": [
"eau"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
349,
350
]
},
{
"id": 350,
"fr": "Milobellus",
"en": "Milotic",
"genus": "Pokémon Tendre",
"types": [
"eau"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
349,
350
]
},
{
"id": 351,
"fr": "Morphéo",
"en": "Castform",
"genus": "Pokémon Climat",
"types": [
"normal"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
351
]
},
{
"id": 352,
"fr": "Kecleon",
"en": "Kecleon",
"genus": "Pokémon Multicolor",
"types": [
"normal"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
352
]
},
{
"id": 353,
"fr": "Polichombr",
"en": "Shuppet",
"genus": "Pokémon Poupée",
"types": [
"spectre"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
353,
354
]
},
{
"id": 354,
"fr": "Branette",
"en": "Banette",
"genus": "Pokémon Marionnette",
"types": [
"spectre"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
353,
354
]
},
{
"id": 355,
"fr": "Skelénox",
"en": "Duskull",
"genus": "Pokémon Requiem",
"types": [
"spectre"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
355,
356
]
},
{
"id": 356,
"fr": "Téraclope",
"en": "Dusclops",
"genus": "Pokémon Appel",
"types": [
"spectre"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
355,
356
]
},
{
"id": 357,
"fr": "Tropius",
"en": "Tropius",
"genus": "Pokémon Fruit",
"types": [
"plante",
"vol"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
357
]
},
{
"id": 358,
"fr": "Éoko",
"en": "Chimecho",
"genus": "Pokémon Carillon",
"types": [
"psy"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
433,
358
]
},
{
"id": 359,
"fr": "Absol",
"en": "Absol",
"genus": "Pokémon Désastre",
"types": [
"ténèbres"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
359
]
},
{
"id": 360,
"fr": "Okéoké",
"en": "Wynaut",
"genus": "Pokémon Ravi",
"types": [
"psy"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
360,
202
]
},
{
"id": 361,
"fr": "Stalgamin",
"en": "Snorunt",
"genus": "Pokémon Capuche",
"types": [
"glace"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
361,
362
]
},
{
"id": 362,
"fr": "Oniglali",
"en": "Glalie",
"genus": "Pokémon Face",
"types": [
"glace"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
361,
362
]
},
{
"id": 363,
"fr": "Obalie",
"en": "Spheal",
"genus": "Pokémon Clap Clap",
"types": [
"glace",
"eau"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
363,
364,
365
]
},
{
"id": 364,
"fr": "Phogleur",
"en": "Sealeo",
"genus": "Pokémon Roule Boule",
"types": [
"glace",
"eau"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
363,
364,
365
]
},
{
"id": 365,
"fr": "Kaimorse",
"en": "Walrein",
"genus": "Pokémon Brise Glace",
"types": [
"glace",
"eau"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
363,
364,
365
]
},
{
"id": 366,
"fr": "Coquiperl",
"en": "Clamperl",
"genus": "Pokémon Bivalve",
"types": [
"eau"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
366,
367
]
},
{
"id": 367,
"fr": "Serpang",
"en": "Huntail",
"genus": "Pokémon Abysse",
"types": [
"eau"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
366,
367
]
},
{
"id": 368,
"fr": "Rosabyss",
"en": "Gorebyss",
"genus": "Pokémon Mer du Sud",
"types": [
"eau"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
366,
367
]
},
{
"id": 369,
"fr": "Relicanth",
"en": "Relicanth",
"genus": "Pokémon Longévité",
"types": [
"eau",
"roche"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
369
]
},
{
"id": 370,
"fr": "Lovdisc",
"en": "Luvdisc",
"genus": "Pokémon Rendezvous",
"types": [
"eau"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
370
]
},
{
"id": 371,
"fr": "Draby",
"en": "Bagon",
"genus": "Pokémon Tête de Roc",
"types": [
"dragon"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
371,
372,
373
]
},
{
"id": 372,
"fr": "Drackhaus",
"en": "Shelgon",
"genus": "Pokémon Endurant",
"types": [
"dragon"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
371,
372,
373
]
},
{
"id": 373,
"fr": "Drattak",
"en": "Salamence",
"genus": "Pokémon Dragon",
"types": [
"dragon",
"vol"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
371,
372,
373
]
},
{
"id": 374,
"fr": "Terhal",
"en": "Beldum",
"genus": "Pokémon Boulefer",
"types": [
"acier",
"psy"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
374,
375,
376
]
},
{
"id": 375,
"fr": "Métang",
"en": "Metang",
"genus": "Pokémon Pincefer",
"types": [
"acier",
"psy"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
374,
375,
376
]
},
{
"id": 376,
"fr": "Métalosse",
"en": "Metagross",
"genus": "Pokémon Pattefer",
"types": [
"acier",
"psy"
],
"gen": 3,
"leg": false,
"myth": false,
"chain": [
374,
375,
376
]
},
{
"id": 377,
"fr": "Regirock",
"en": "Regirock",
"genus": "Pokémon Pic Rocheux",
"types": [
"roche"
],
"gen": 3,
"leg": true,
"myth": false,
"chain": [
377
]
},
{
"id": 378,
"fr": "Regice",
"en": "Regice",
"genus": "Pokémon Iceberg",
"types": [
"glace"
],
"gen": 3,
"leg": true,
"myth": false,
"chain": [
378
]
},
{
"id": 379,
"fr": "Registeel",
"en": "Registeel",
"genus": "Pokémon Fer",
"types": [
"acier"
],
"gen": 3,
"leg": true,
"myth": false,
"chain": [
379
]
},
{
"id": 380,
"fr": "Latias",
"en": "Latias",
"genus": "Pokémon Éon",
"types": [
"dragon",
"psy"
],
"gen": 3,
"leg": true,
"myth": false,
"chain": [
380
]
},
{
"id": 381,
"fr": "Latios",
"en": "Latios",
"genus": "Pokémon Éon",
"types": [
"dragon",
"psy"
],
"gen": 3,
"leg": true,
"myth": false,
"chain": [
381
]
},
{
"id": 382,
"fr": "Kyogre",
"en": "Kyogre",
"genus": "Pokémon Bassinmarin",
"types": [
"eau"
],
"gen": 3,
"leg": true,
"myth": false,
"chain": [
382
]
},
{
"id": 383,
"fr": "Groudon",
"en": "Groudon",
"genus": "Pokémon Continent",
"types": [
"sol"
],
"gen": 3,
"leg": true,
"myth": false,
"chain": [
383
]
},
{
"id": 384,
"fr": "Rayquaza",
"en": "Rayquaza",
"genus": "Pokémon Cieux",
"types": [
"dragon",
"vol"
],
"gen": 3,
"leg": true,
"myth": false,
"chain": [
384
]
},
{
"id": 385,
"fr": "Jirachi",
"en": "Jirachi",
"genus": "Pokémon Souhait",
"types": [
"acier",
"psy"
],
"gen": 3,
"leg": false,
"myth": true,
"chain": [
385
]
},
{
"id": 386,
"fr": "Deoxys",
"en": "Deoxys",
"genus": "Pokémon ADN",
"types": [
"psy"
],
"gen": 3,
"leg": false,
"myth": true,
"chain": [
386
]
}
];
