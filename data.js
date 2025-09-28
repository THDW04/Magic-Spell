//Tableaux pour chaque round

let phrasesRound = [
    ["QUIZ", "gypsy", "fjord", "lynx", "vex", "pique", "nymph", "wax", "jazz", "blitz"], //round 1
    ["maison rouge", "petit chat noir", "le vent souffle", "jouet préféré", "pomme verte", "ami fidèle", "livre ouvert", "pluie fine", "jour heureux", "oiseau chante"], //round 2
    ["L’archipel reculé abrite des créatures mythiques", "La symphonie inachevée résonne dans la grande salle", "Le philosophe médite sur les paradoxes de l’existence", "Les sculptures anciennes racontent l’histoire des civilisations", "Le vent hurlant disperse les feuilles dans la cour", "L’alchimiste mélange les élixirs avec précision", "La tempête nocturne efface les traces sur le sable", "Le manuscrit ancien révèle des secrets oubliés", "La lumière tamisée accentue les ombres mystérieuses", "Le jardin labyrinthique déroute même les visiteurs expérimentés"], //round 3
    ["L’ornithologue documente minutieusement les comportements migratoires des oiseaux rares", "La complexité des algorithmes cryptographiques nécessite une analyse rigoureuse", "L’hypothèse relativiste modifie profondément notre compréhension de l’espace-temps", "La bibliothèque médiévale contient des manuscrits délicatement enluminés et fragiles", "Les négociations diplomatiques internationales requièrent tact et prudence extrême", "L’ingénierie aérospatiale impose des calculs précis et des mesures rigoureuses", "Le compositeur expérimental crée une œuvre dissonante mais fascinante", "L’étude des neurosciences cognitives dévoile des mécanismes cérébraux complexes", "L’expédition scientifique traverse des zones inhospitalières et difficiles d’accès", "La traduction des textes anciens exige une connaissance approfondie de la langue et du contexte historique"], //round 4
    ["Anticonstitutionnellement est le mot le plus long que peu osent taper rapidement", "Les superordinateurs quantiques simulent des phénomènes physiques complexes", "L’épistémologie des sciences cognitives explore des paradigmes profondément abstraits", "La lexicographie historique déchiffre des manuscrits anciens et cryptiques", "Les fractales mathématiques révèlent des motifs infiniment complexes et fascinants", "L’astrobiologie théorique imagine la vie dans des environnements extrêmes de l’univers", "Le processus de transmutation chimique nécessite un contrôle précis des variables expérimentales", "Les oxymores linguistiques stimulent l’imagination et la créativité cognitive", "La microélectronique de pointe exige une minutie et une précision exceptionnelles", "La philosophie analytique examine des arguments logiques subtils et exigeants"] //round 5
];



//créer une map avec toutes les lettres de l'alphabet
const keyB = new Map([
    ["KeyA", "A"],
    ["KeyB", "B"],
    ["KeyC", "C"],
    ["KeyD", "D"],
    ["KeyE", "E"],
    ["KeyF", "F"],
    ["KeyG", "G"],
    ["KeyH", "H"],
    ["KeyI", "I"],
    ["KeyJ", "J"],
    ["KeyK", "K"],
    ["KeyL", "L"],
    ["KeyM", "M"],
    ["KeyN", "N"],
    ["KeyO", "O"],
    ["KeyP", "P"],
    ["KeyQ", "Q"],
    ["KeyR", "R"],
    ["KeyS", "S"],
    ["KeyT", "T"],
    ["KeyU", "U"],
    ["KeyV", "V"],
    ["KeyW", "W"],
    ["KeyX", "X"],
    ["KeyY", "Y"],
    ["KeyZ", "Z"],
    ["Digit2", "é"],
    ["Digit7", "è"],
    ["Digit0", "à"],
    ["Quote", "ù"]
]);

//listes des malus/bonus
let effects = ["reverseScreen", "chronoZero", "bonusTemps", "melangeClavier", "freezeChrono", "resetScore", "moitieTemps", "doublePoints", "bouclier", "aideLettre"]


//Fonctions
let effectFuntion = {
    chronoZero: "effetChronoZero",
    bonusTemps: "effetBonusTemps",
    melangeClavier: "effetMelangeClavier",
    freezeChrono: "effetFreezeChrono",
    resetScore: "effetResetScore",
    moitieTemps: "effetMoitieTemps",
    doublePoints: "effetDoublePoints",
    bouclier: "effetBouclier",
    aideLettre: "effetAideLettre",
    //reverseScreen: "effetReverseScreen"
};