// Imports your SCSS stylesheet
import '@/styles/index.scss';

// select all cards
const cards: NodeListOf<HTMLElement> = document.querySelectorAll('.card');

// tracking of cards and attempts
let flippedCards: HTMLElement[] = [];
let attemptsLeft: number = 3;
let matchedPairs: number = 0;

// attempt display update
const attemptsElement = document.getElementById("attempts") as HTMLElement;
attemptsElement.textContent = attemptsLeft.toString();

// card event listeners
cards.forEach((card) => {
    card.addEventListener("click", () => handleCardClick(card));
});

// card click function
function handleCardClick(card: HTMLElement): void {
    if (flippedCards.length < 2 && !card.classList.contains("revealed")) {
        card.classList.add("revealed");
        card.textContent = card.dataset.value || "";
        flippedCards.push(card);
    }

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

// card match function
function checkMatch(): void {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        matchedPairs++;
        flippedCards = [];

        if (matchedPairs === 3) {
            (document.getElementById("message") as HTMLElement).textContent = "You Won!";
        }
    } else {
        card1.classList.remove("revealed");
        card1.textContent = "";
        card2.classList.remove("revealed");
        card2.textContent = "";

        attemptsLeft--;
        attemptsElement.textContent = attemptsLeft.toString();

        if (attemptsLeft === 0) {
            (document.getElementById("message") as HTMLElement).textContent = "Game Over!";
        }
    }

    flippedCards = [];
}

// restart button function
document.getElementById("restart")?.addEventListener("click", resetGame);

// reset game function
function resetGame(): void {
    flippedCards = [];
    attemptsLeft = 3;
    matchedPairs = 0;
    attemptsElement.textContent = attemptsLeft.toString();
    (document.getElementById("message") as HTMLElement).textContent = "";

    cards.forEach((card) => {
        card.classList.remove("revealed");
        card.textContent = "";
    });
}