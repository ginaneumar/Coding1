const gridContainer = document.querySelector(".grid-container");
const timerElement = document.querySelector("#timer");
const scoreElement = document.querySelector("#score");
const difficultyContainer = document.querySelector(".difficulty-container");
const gameContainer = document.querySelector(".game-container");
const startButton = document.querySelector("#start-button");
const restartButton = document.querySelector("#restart-button");

const flipSound = new Audio("./sounds/notification-sound-7062.mp3");
const collectSound = new Audio("collect_sound.mp3");
const dealSound = new Audio("./sounds/daisy_wheel_word_processor-29353.mp3");
const matchingPair = new Audio("./sounds/game-bonus-144751.mp3");
const gameSound = new Audio(
  "./sounds/comfort-atmosphere-pleasant-atmosphere-deep-thought-153275.mp3"
);

gameSound.loop = true; // Enable looping

let cards = [];
let flippedCards = [];
let isLocked = false;
let score = 0;
let timerInterval;
let startTime;

// Start game button event listener
startButton.addEventListener("click", startGame);

// Restart button event listener
restartButton.addEventListener("click", restartGame);

// Load JSON data and start the game after data is fetched
function loadCardsAndStartGame(numPairs) {
  fetch("cards.json")
    .then((res) => res.json())
    .then((data) => {
      cards = data.slice(0, numPairs); // Slice the data to match the selected number of pairs
      cards = [...cards, ...cards]; // Create card pairs by duplicating the data
      shuffleCards();
      generateCards(numPairs * 2); // Generate double the number of pairs for the grid
      startTimer();
    });
}

// Generate cards in the grid
function generateCards(numPairs) {
  const numCards = numPairs * 2;
  const numColumns = Math.ceil(Math.sqrt(numCards));
  const numRows = Math.ceil(numCards / numColumns);

  gridContainer.innerHTML = ""; // Clear the grid container

  gridContainer.style.gridTemplateColumns = `repeat(auto-fit, 140px)`;
  gridContainer.style.gridTemplateRows = `repeat(${numRows}, 140px)`;

  for (let i = 0; i < numCards && i < cards.length; i++) {
    if (i >= numPairs) {
      break; // Stop generating cards after reaching the desired number of pairs
    }

    const card = createCard(i);
    gridContainer.appendChild(card);
  }
}

// Shuffle the cards using the Fisher-Yates algorithm
function shuffleCards() {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
}

// Create a single card element
function createCard(index) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("data-index", index);

  const frontFace = document.createElement("div");
  frontFace.classList.add("card-front");

  const frontSideImg = document.createElement("img");
  frontSideImg.src = "frontside.jpeg";
  frontFace.appendChild(frontSideImg);
  card.appendChild(frontFace);

  const backFace = document.createElement("div");
  backFace.classList.add("card-back");

  const backImg = document.createElement("img");
  backImg.src = cards[index].image;
  backImg.style.visibility = "hidden";
  backImg.style.backgroundColor = "white";
  backFace.appendChild(backImg);
  card.appendChild(backFace);

  card.style.visibility = "hidden";

  setTimeout(() => {
    card.classList.add("deal-animation");
    card.style.visibility = "visible";
    setTimeout(() => {
      card.classList.remove("deal-animation");
    }, 100);

    const numPairs = cards.length / 2;
    const animationDuration = numPairs * 100; // Assuming 100ms per card

    dealSound.currentTime = 0; // Reset the current time of the sound
    dealSound.play(); // Play the deal sound

    setTimeout(() => {
      dealSound.pause(); // Pause the deal sound after the calculated duration
    }, animationDuration);
  }, index * 100);

  return card;
}

// Event delegation for card clicks
gridContainer.addEventListener("click", (event) => {
  const card = event.target.closest(".card");
  if (!card || isLocked) return;

  const index = card.dataset.index;
  const isFlipped = card.classList.contains("flipped");

  if (!isFlipped) {
    flipSound.currentTime = 0; // Reset the current time of the sound
    flipSound.play(); // Play the flip sound

    card.classList.add("flipped");
    flippedCards.push(card);

    setTimeout(() => {
      const backImg = card.querySelector(".card-back img");
      backImg.style.visibility = "visible";
      const frontFace = card.querySelector(".card-front");
      frontFace.style.transform = "rotateY(180deg)";

      if (flippedCards.length === 2) {
        compareCards();
      }
    }, 100);
  }
});

// Compare the flipped cards
function compareCards() {
  if (flippedCards.length === 2) {
    isLocked = true;
    const card1 = flippedCards[0];
    const card2 = flippedCards[1];

    const symbol1 = cards[parseInt(card1.dataset.index)].name;
    const symbol2 = cards[parseInt(card2.dataset.index)].name;

    if (symbol1 === symbol2) {
      matchingPair.play();
      setTimeout(() => {
        clearCard(card1);
        clearCard(card2);

        checkGameEnd();

        score++;

        updateScore();

        isLocked = false;
      }, 1000);
    } else {
      setTimeout(() => {
        flipCard(card1);
        flipCard(card2);

        isLocked = false;
      }, 1000);
    }

    flippedCards = [];
  }
}

// Clear the card by removing its content
function clearCard(card) {
  card.innerHTML = "";
  card.style.border = "none";
}

// Flip the card back to the initial state
function flipCard(card) {
  const frontFace = card.querySelector(".card-front");
  const backImg = card.querySelector(".card-back img");

  card.classList.remove("flipped");
  setTimeout(() => {
    frontFace.style.transform = "rotateY(0)";
    backImg.style.visibility = "hidden";
  }, 100);
}

// Check if the game has ended
function checkGameEnd() {
  const flippedCards = document.querySelectorAll(".card.flipped");

  if (flippedCards.length === cards.length) {
    console.log("Game Over!");
    stopTimer();
    // winScreen();
  }
}


// function winScreen() {
//   const winScreen = document.querySelector("#win-screen");
//   winScreen.style.display = "block";

//   // Add event listener to the "Play Again" button
//   const playAgainButton = document.querySelector("#restart-button-win");
//   playAgainButton.addEventListener("click", restartGame);
// }

// Update the score element
function updateScore() {
  scoreElement.textContent = `Score: ${score}`;
}

// Start the timer
function startTimer() {
  startTime = new Date().getTime();

  timerInterval = setInterval(() => {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;

    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);

    timerElement.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
  }, 1000);
}

// Format the time with leading zeros
function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

// Stop the timer
function stopTimer() {
  clearInterval(timerInterval);
  timerElement.textContent = "00:00";
}

// Start the game with the selected difficulty
function startGame() {
  const difficultySelect = document.querySelector("#difficulty");
  const selectedDifficulty = difficultySelect.value;
  let numPairs;

  switch (selectedDifficulty) {
    case "easy":
      numPairs = 15;
      break;
    case "medium":
      numPairs = 20;
      break;
    case "hard":
      numPairs = 25;
      break;
    case "extra-hard":
      numPairs = 35;
      break;
    default:
      numPairs = 15;
  }

  flippedCards = [];
  isLocked = false;
  score = 0;
  updateScore();
  stopTimer();

  loadCardsAndStartGame(numPairs);

  gameSound.play();
  gameSound.volume = 0.03; // Set the volume to 50%

  difficultyContainer.style.display = "none";
  gameContainer.style.display = "block";
}

// Restart the game
function restartGame() {
  // winScreen.style.display = "none";
  difficultyContainer.style.display = "block";
  gameContainer.style.display = "none";
}

// Initialize the game
function init() {
  difficultyContainer.style.display = "block";
  gameContainer.style.display = "none";
}

init();
