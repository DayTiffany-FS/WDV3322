// Imports your SCSS stylesheet
import '@/styles/index.scss';

// Select all cards
const cards: NodeListOf<HTMLElement> = document.querySelectorAll('.card');

// Tracking of cards and attempts
let flippedCards: HTMLElement[] = [];
let attemptsLeft: number = 3;
let matchedPairs: number = 0;

// Create deck with values (1-10, J, Q, K, A)
const cardValues: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// Generate 3 pairs of cards function
function generateRandomPairs() {
    let deck: string[] = [];
    let pairsNeeded = 3;

    // Pick 3 pairs randomly (ensuring 2 identical cards per pair)
    while (pairsNeeded > 0) {
        const value = cardValues[Math.floor(Math.random() * cardValues.length)];
        // Ensure there are only 2 identical cards per pair
        if (deck.filter(card => card === value).length < 2) {
            deck.push(value);
            deck.push(value); // Add second card for the pair
            pairsNeeded--;
        }
    }

    // Shuffle the deck to randomize the pairs' positions
    deck = deck.sort(() => Math.random() - 0.5);
    return deck;
}

// Assign values to cards
const shuffledValues = generateRandomPairs();
cards.forEach((card, index) => {
    card.dataset.value = shuffledValues[index];
});

// Attempt display update
const attemptsElement = document.getElementById("attempts") as HTMLElement;
attemptsElement.textContent = attemptsLeft.toString();

// Card event listeners
cards.forEach((card) => {
    card.addEventListener("click", () => handleCardClick(card));
});

// Card click function
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

// Card match function
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

// Restart button function
document.getElementById("restart")?.addEventListener("click", resetGame);

// Reset game function
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

    // Re-generate and shuffle the pairs
    const newShuffledValues = generateRandomPairs();
    cards.forEach((card, index) => {
        card.dataset.value = newShuffledValues[index];
    });
}