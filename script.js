const moles = document.querySelectorAll('.mole');
const molesCount = moles.length;
let lastMoleIndex = -1;

const raisedMoles = [];

function getRandomMole() {
    let randomMoleIndex = Math.floor(Math.random() * molesCount);

    if (randomMoleIndex !== lastMoleIndex && !raisedMoles.includes(randomMoleIndex)) {
        lastMoleIndex = randomMoleIndex;

        return randomMoleIndex;
    } else {
        return getRandomMole();
    }
}

function raiseMole(idx) {
    moles[idx].classList.add('raise-mole');

    raisedMoles.push(idx);
}

function lowerMole(idx) {
    moles[idx].classList.remove('raise-mole');

    raisedMoles.splice(raisedMoles.indexOf(idx), 1);
}

moles.forEach((mole, i) =>
    mole.addEventListener('click', () => {
        lowerMole(i);
    }),
);

let intervalId = null;

const gameStateButton = document.querySelector('.game-state-button');

function startGame() {
    gameStateButton.textContent = 'Stop';

    intervalId = setInterval(() => {
        if (raisedMoles.length === molesCount) return;

        let idx = getRandomMole();

        raiseMole(idx);
    }, 1000);
}

function stopGame() {
    gameStateButton.textContent = 'Start';

    clearInterval(intervalId);
}

gameStateButton.addEventListener('click', (e) => {
    if (e.currentTarget.textContent === 'Start') {
        startGame();
    } else {
        stopGame();
    }
});
