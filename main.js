const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown'];
const cards = [...colors, ...colors];
let firstCard = null;
let secondCard = null;
let canClick = true;
let timer = 0;
let timerInterval;
let matchedPairs = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(cards);

const gameBoard = document.getElementById('game-board');
const winMessage = document.getElementById('win-message');
const timerElement = document.getElementById('timer');

cards.forEach((color, index) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.color = color;
    cardElement.dataset.index = index;
    cardElement.addEventListener('click', handleCardClick);
    gameBoard.appendChild(cardElement);
});

function handleCardClick(event) {
    if (!canClick) return;

    const selectedCard = event.target;

    if (selectedCard === firstCard || selectedCard.classList.contains('flipped')) {
        return;
    }

    selectedCard.classList.add('flipped');
    selectedCard.style.backgroundColor = selectedCard.dataset.color;

    if (!firstCard) {
        firstCard = selectedCard;
    } else {
        secondCard = selectedCard;
        canClick = false;
        checkForMatch();
    }
}

function checkForMatch() {
    if (firstCard.dataset.color === secondCard.dataset.color) {
        firstCard.removeEventListener('click', handleCardClick);
        secondCard.removeEventListener('click', handleCardClick);
        firstCard = null;
        secondCard = null;
        canClick = true;
        matchedPairs++;

        if (matchedPairs === colors.length) {
            stopTimer();
            winMessage.style.display = 'block';
            winMessage.innerHTML = `Parabéns! Você completou o jogo em ${timer} segundos. <br><button onclick="restartGame()">Reiniciar</button>`;
        }
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.style.backgroundColor = '#ccc';
            secondCard.style.backgroundColor = '#ccc';
            firstCard = null;
            secondCard = null;
            canClick = true;
        }, 1000);
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        timer++;
        timerElement.textContent = timer;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function restartGame() {
    timer = 0;
    timerElement.textContent = timer;
    matchedPairs = 0;
    winMessage.style.display = 'none';
    shuffle(cards);
    resetBoard();
    startTimer();
}

function resetBoard() {
    const cardElements = document.querySelectorAll('.card');
    cardElements.forEach(card => {
        card.classList.remove('flipped');
        card.style.backgroundColor = '#ccc';
        card.addEventListener('click', handleCardClick);
    });
}

startTimer();
