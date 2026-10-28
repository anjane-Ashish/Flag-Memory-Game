
const API_URL = "https://countries.dev/alpha/";
const countryCodes = ["JP", "IN", "FR", "BR", "CA", "IT", "AU", "DE"];
const gameBoard = document.querySelector("#game-board");
const player1ScoreElement = document.querySelector("#score1");
const player2ScoreElement = document.querySelector("#score2");
const turnElement = document.querySelector("#turn");
const restartButton = document.querySelector("#restart-btn");

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let currentPlayer = 1;
let scores = [0, 0];
let matchedPairs = 0;

// 1. Fetch country data
async function fetchCountries() {
    const countries = [];

    for (const code of countryCodes) {
        const response = await fetch(API_URL + code);

        if (!response.ok) {
            throw new Error(`Failed to fetch ${code}`);
        }

        const data = await response.json();

        countries.push({
            name: data.name,
            flag: data.flags.svg
        });
    }

    return countries;
}

// 2. Shuffle cards using Fisher-Yates
function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

// 3. Create two cards for each country
function createCards(countries) {
    cards = [];

    for (const country of countries) {
        cards.push(
            { ...country, id: crypto.randomUUID() },
            { ...country, id: crypto.randomUUID() }
        );
    }

    shuffleCards(cards);
}

// 4. Render the cards
function renderCards() {
    gameBoard.innerHTML = "";

    cards.forEach((card, index) => {
        const cardElement = document.createElement("div");

        cardElement.classList.add("card");
        cardElement.dataset.index = index;
        cardElement.textContent = "🌍";

        cardElement.addEventListener("click", () => {
            flipCard(cardElement, card);
        });

        gameBoard.appendChild(cardElement);
    });
}

// 5. Reveal a card
function flipCard(cardElement, card) {
    if (
        lockBoard ||
        cardElement.classList.contains("revealed") ||
        cardElement.classList.contains("matched")
    ) {
        return;
    }

    cardElement.classList.add("revealed");
    cardElement.textContent = "";

    const img = document.createElement("img");
    img.src = card.flag;
    img.alt = `Flag of ${card.name}`;
    img.classList.add("image");

    cardElement.appendChild(img);

    if (firstCard === null) {
        firstCard = { card, element: cardElement };
        return;
    }

    secondCard = { card, element: cardElement };
    checkMatch();
}

// 6. Compare the two cards
function checkMatch() {
    lockBoard = true;

    if (firstCard.card.name === secondCard.card.name) {
        handleMatch();
    } else {
        handleMismatch();
    }
}

// 7. Correct match
function handleMatch() {
    firstCard.element.classList.add("matched");
    secondCard.element.classList.add("matched");

    scores[currentPlayer - 1]++;
    matchedPairs++;
    currentPlayer = currentPlayer === 1 ? 2 : 1;

    updateScoreboard();
    resetSelection();

    if (matchedPairs === 8) {
        endGame();
        return;
    }

    lockBoard = false;
}

// 8. Incorrect match
function handleMismatch() {
    setTimeout(() => {
        hideCard(firstCard.element);
        hideCard(secondCard.element);

        resetSelection();

        currentPlayer = currentPlayer === 1 ? 2 : 1;
        updateScoreboard();

        lockBoard = false;
    }, 1000);
}

// 9. Hide a card
function hideCard(cardElement) {
    cardElement.classList.remove("revealed");
    cardElement.innerHTML = "🌍";
}

// 10. Reset the current selection
function resetSelection() {
    firstCard = null;
    secondCard = null;
}

// 11. Update scores and turn
function updateScoreboard() {
    player1ScoreElement.textContent = scores[0];
    player2ScoreElement.textContent = scores[1];
    turnElement.textContent = `Player ${currentPlayer}'s Turn`;
}

// 12. Finish the game
function endGame() {
    lockBoard = true;

    if (scores[0] > scores[1]) {
        turnElement.textContent = "Player 1 Wins!";
    } else if (scores[1] > scores[0]) {
        turnElement.textContent = "Player 2 Wins!";
    } else {
        turnElement.textContent = "It's a Draw!";
    }
}

// 13. Start or restart
async function startGame() {
    lockBoard = true;
    gameBoard.innerHTML = "";
    turnElement.textContent = "Loading flags...";

    try {
        const countries = await fetchCountries();

        scores = [0, 0];
        currentPlayer = 1;
        matchedPairs = 0;
        firstCard = null;
        secondCard = null;

        createCards(countries);
        renderCards();
        updateScoreboard();

        lockBoard = false;
    } catch (error) {
        console.error(error);
        turnElement.textContent = "Failed to load flags. Try again.";
    }
}

restartButton.addEventListener("click", startGame);

startGame();
