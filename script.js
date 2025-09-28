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

//Tableaux pour chaque round
let phrasesRound = [
    ["quiz", "gypsy", "fjord"], //round 1
    ["maison rouge", "petit chat noir"], //round 2
    ["round 3", "mdr"]
];

//Liste des malus/bonus
let effects = ["chronoZero", "bonusTemps", "melangeClavier", "freezeChrono", "resetScore", "moitieTemps", "doublePoints"];

const points = document.getElementById('points');
let input = document.getElementById('txt');
let mot = document.getElementById('mot');

let point = 0;
let phraseIndex = 0;
let roundIndex = 0;

let effectMap = new Map();
let randomKeyB = new Map(keyB);
let lettresNormales;

let gameBox = document.querySelector('.game-box');
let timerElement = document.getElementById('timer');
mot.innerHTML = phrasesRound[roundIndex][phraseIndex];

//Timer du jeu
let timerId;
let n = 60;
function startTimer() {
    // si un timer tourne déjà, on l'arrête
    if (timerId) {
        clearInterval(timerId);
    }

    input.disabled = false;

    // lance un nouveau setInterval
    timerId = setInterval(() => {
        timerElement.textContent = n;

        if (n === 0) {
            clearInterval(timerId);
            timerId = null;
            input.disabled = true;
            endGame();
            endScreen.style.display = "flex";
        }
        n--;
    }, 1000);
}

// Ramdom effect : malus ou bonus

function randomEffect(tab, lettresPiegeesDuRound) {

    for (let i = 0; i < lettresPiegeesDuRound.length; i++) {

        let r = Math.floor(Math.random() * tab.length);

        effectMap.set(lettresPiegeesDuRound[i], tab[r]);

        tab.splice(r, 1);
    }

    return effectMap;
}

//Mélange des lettres
function randomKeyb(arr) {
    const keys = Array.from(keyB.keys()).filter(k => arr.includes(keyB.get(k)));
    const values = [...arr];

    let keyMap = new Map();

    for (let i = 0; i < keys.length; i++) {

        let randomIndex = Math.floor(Math.random() * values.length);

        keyMap.set(keys[i], values[randomIndex]);

        values.splice(randomIndex, 1);
    }

    return keyMap;
}


//Fonction qui actionne les effets


function applyEffect(nom) {

    function triggerImpact(element, className, duration = 400) {
        element.classList.add(className);
        setTimeout(() => {
            element.classList.remove(className);
            element.style.color = ''; // Réinitialiser la couleur
        }, duration);
    }

    switch (nom) {
        //Les Malus
        case "chronoZero":
            triggerImpact(gameBox, 'impact-shake', 600);
            timerElement.style.color = 'red';
            n = 0;
            break;

        case "melangeClavier":
            triggerImpact(gameBox, 'impact-shake', 400);
            randomKeyB = randomKeyb(lettresNormales);
            break;

        case "resetScore":
            triggerImpact(points, 'impact-shake', 400);
            points.style.color = 'red';
            point = 0;
            break;

        case "moitieTemps":
            triggerImpact(timerElement, 'impact-shake', 400);
            timerElement.style.color = 'orange';
            n = Math.floor(n / 2);
            break;

        //Les Bonus
        case "freezeChrono":
            clearInterval(timerId);
            setTimeout(() => {

                startTimer();
            }, 10000);
            break;

        case "bonusTemps":
            triggerImpact(timerElement, 'points-bonus', 500);
            timerElement.style.color = 'lightgreen';

            n += 30;
            break;

        case "doublePoints":
            triggerImpact(points, 'points-bonus', 500);
            points.style.color = 'gold';

            point *= 2;
            break;
    }

    point = Math.max(0, point);

    return "effet ok"
}


function round() {
    // 1. Initialisation/Affichage
    mot.innerHTML = phrasesRound[roundIndex][phraseIndex];
    input.value = "";
    points.innerHTML = point;
    let lettresPiegees = [];

    // 2. Configuration des Effets

    // Système de lettre bonus et malus 

    let letters = Array.from(keyB.values());

    let lettreHorsMot = letters.filter(letter => !mot.innerHTML.split('').includes(letter));

    //Prendre une lettre aléatoire pour les effets
    let maxPiegees = Math.min(lettreHorsMot.length, Math.floor(Math.random() * 3) + 2);

    while (lettresPiegees.length < maxPiegees) {
        let total = lettreHorsMot.length;
        let i = Math.floor(Math.random() * total);

        let lettrePiegee = lettreHorsMot[i];
        lettresPiegees.push(lettrePiegee);

        lettreHorsMot.splice(i, 1);
    }

    // Liste des malus/bonus dans une copie
    let effectsCopy = [...effects];
    effectMap = randomEffect(effectsCopy, lettresPiegees);

    // 3. Configuration du Clavier
    lettresNormales = letters.filter(letter => !Array.from(effectMap.keys()).includes(letter));
    randomKeyB = randomKeyb(lettresNormales);

    // 4. Lancement du Chrono
    n = 60 + (roundIndex * 60);
    startTimer()
}

/*
//Annuler couper / copier / coller dans l'input 
input.oncut = input.oncopy = input.onpaste = function (event) {
    event.preventDefault();
};
*/
function endGame() {
    // afficher le score final
    document.getElementById("finalScore").textContent = point;

    // récupérer le meilleur score sauvegardé
    let best = localStorage.getItem("bestScore");
    if (best === null || point > best) {
        best = point;
        localStorage.setItem("bestScore", best);
    }

    // afficher le meilleur score
    document.getElementById("bestScore").textContent = best;
}

//Savoir quand une touche est appuyer dans l'input
input.addEventListener('keypress', (e) => {

    e.preventDefault();

    // 1. Vérifiez s'il s'agit d'une lettre piégée
    let code = e.code;
    let effectKey = keyB.get(code);

    if (effectMap.has(effectKey)) {
        let effet = effectMap.get(effectKey);
        applyEffect(effet);
        console.log(`Effet activé : ${effet}`);

        return;
    }

    // 2. Gérer l'ajout de la lettre à l'input
    if (randomKeyB.has(code)) {
        input.value += randomKeyB.get(code);
    }

    // 3. Le code de validation d'un mot
    if (e.key == 'Enter') {

        if (input.value == phrasesRound[roundIndex][phraseIndex]) {
            phraseIndex++;
            point++;
            goodAnswer.currentTime = 0;
            goodAnswer.play();
        } else {
            point--;
            point = Math.max(0, point);
            wrongAnswer.currentTime = 0;
            wrongAnswer.play();
            gameBox.classList.add('shake');

            setTimeout(() => {
                gameBox.classList.remove("shake");
            }, 400);
        }

        if (phraseIndex >= phrasesRound[roundIndex].length) {
            phraseIndex = 0;
            roundIndex++;
        }

        if (roundIndex >= phrasesRound.length) {
            clearInterval(timerId);
            input.disabled = true;
        } else if (phraseIndex === 0 && roundIndex > 0) {
            // Si un nouveau round doit commencer
            round();
            roundNum.innerHTML = `ROUND ${roundIndex}`;
            document.querySelector('.overlay').style.display = 'flex';

            setTimeout(() => {
                document.querySelector('.overlay').style.display = 'none';
            }, 2800);
        }

        if (roundIndex < phrasesRound.length && phraseIndex < phrasesRound[roundIndex].length) {
            mot.innerHTML = phrasesRound[roundIndex][phraseIndex];
        } else {
            endGame();
            endScreen.style.display = "flex";
        }

        input.value = "";
        points.innerHTML = point;
        point = Math.max(0, point);

    }
})

//Lancement du premier round pour démarrer le jeu
document.getElementById('playGame').addEventListener('click', () => {
    round();
    document.getElementById('playGame').style.display = "none";
});
