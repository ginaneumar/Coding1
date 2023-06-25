//important elements
const gridContainer = document.querySelector(".grid-container");
const timerElement = document.querySelector("#timer");
const scoreElement = document.querySelector("#score");
const difficultyContainer = document.querySelector(".difficulty-container");
const scoreContainer = document.querySelector(".score-container");
const multipHighScoreContainer = document.querySelector(
  ".multip-high-score-container"
);
const singlepHighScoreContainer = document.querySelector(
  ".singlep-high-score-container"
);
const gameContainer = document.querySelector(".game-container");
const startButton = document.querySelector("#start-button");
const restartButton = document.querySelector("#restart-button");
const numPlayersInput = document.getElementById("num-players");
const playerContainer = document.getElementById("player-container");

//Sound
const muteButton = document.querySelector("#mute-button");
const soundOnIcon = document.querySelector("#mute-button .sound-on-icon");
const soundOffIcon = document.querySelector("#mute-button .sound-off-icon");

const flipSound = new Audio("./sounds/notification-sound-7062.mp3");
const dealSound = new Audio("./sounds/fast-simple-chop-5-6270.mp3");
const matchingPair = new Audio("./sounds/game-bonus-144751.mp3");
const gameSound = new Audio(
  "./sounds/comfort-atmosphere-pleasant-atmosphere-deep-thought-153275.mp3"
);
gameSound.loop = true;

//winscreen
const winScreen = document.getElementById("win-screen");
const highScore = document.getElementById("high-score");
const winScore = document.getElementById("win-score");
const winTime = document.getElementById("win-time");
const restartButtonWin = document.getElementById("restart-button-win");

//variables
let cards = [];
let flippedCards = [];
let players = [];
let currentPlayer = 1;
let isLocked = false;
let timerInterval;
let startTime;
let isMuted = false;
let multipHighScoreList = [];
let singlepHighScoreList = [];
let currentTimer;

// Start game button event listener
startButton.addEventListener("click", startGame);

// Restart button event listener
restartButton.addEventListener("click", restartGame);

//mute button
muteButton.addEventListener("click", toggleMute);

restartButtonWin.addEventListener("click", restartGame);

// adds/removes new inputs for player name
numPlayersInput.addEventListener("input", updatePlayerInputs);

// Event delegation for card clicks
gridContainer.addEventListener("click", (event) => {
  const card = event.target.closest(".card");
  if (!card || isLocked) return;

  const index = card.dataset.index;
  const isFlipped = card.classList.contains("flipped");

  if (!isFlipped) {
    flipSound.currentTime = 0; // Reset the current time of the sound
    flipSound.play(); // Play the flip sound
    flipSound.volume = 0.08;

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

// Load JSON data and start the game after data is fetched
function loadCardsAndStartGame(numPairs) {
  fetch("cards2.json")
    .then((res) => res.json())
    .then((data) => {
      cards = data.slice(0, numPairs); // Slice the data to match the selected number of pairs
      cards = [...cards, ...cards]; // Create card pairs by duplicating the data
      shuffleCards();
      generateCards(numPairs * 2); // Generate double the number of pairs for the grid
      startTimer();
    });
}

//sets amount of playing by name
function setPlayerAmount() {
  const playerInputs = Array.from(playerContainer.querySelectorAll("input")); //gets all inputs (player name)

  // Clear existing players array
  players.length = 0;

  // Add players to the players array
  playerInputs.forEach(function (input, index) {
    const playerName = input.value.trim();

    players.push({
      //add new Player to players object
      player: playerName || `Player ${index + 1}`, // player: Key, Score: Key
      score: 0, // O: Value
    });

    let score = document.createElement("span"); //creates span element for each player, to display score & name
    score.id = "p" + players[index].player;

    let scoreText = document.createTextNode(
      players[index].player + " Score: " + 0
    );

    score.appendChild(scoreText);
    scoreContainer.appendChild(score);
  });
}

// adds/removes new inputs for player name
function updatePlayerInputs() {
  const numPlayers = parseInt(numPlayersInput.value);

  // Remove existing player input fields
  playerContainer.innerHTML = "";

  // Add new player input fields
  for (let i = 0; i < numPlayers; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = `Player ${i + 1} name`;
    playerContainer.appendChild(input);
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

  //test
  // backFace.innerHTML = cards[index].name;
  //test

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
    const animationDuration = numPairs * 500; // Assuming 100ms per card

    dealSound.currentTime = 0; // Reset the current time of the sound
    dealSound.play(); // Play the deal sound
    flipSound.volume = 0.008;

    setTimeout(() => {
      dealSound.pause(); // Pause the deal sound after the calculated duration
    }, animationDuration);
  }, index * 100);

  return card;
}

// Generate cards in the grid
function generateCards(numPairs) {
  const numCards = numPairs * 2;
  const numColumns = Math.ceil(Math.sqrt(numCards));
  const numRows = Math.ceil(numCards / numColumns);

  //set the card sizes
  if (window.innerWidth <= 675) {
    gridContainer.style.gridTemplateColumns = `repeat(auto-fit, 45px)`;
    gridContainer.style.gridTemplateRows = `repeat(${numRows}, 45px)`;
  } else {
    gridContainer.style.gridTemplateColumns = `repeat(auto-fit, 85px)`;
    gridContainer.style.gridTemplateRows = `repeat(${numRows}, 85px)`;
  }

  gridContainer.innerHTML = ""; // Clear the grid container

  for (let i = 0; i < numCards && i < cards.length; i++) {
    if (i >= numPairs) {
      break; // Stop generating cards after reaching the desired number of pairs
    }

    const card = createCard(i);
    gridContainer.appendChild(card);
  }
}

// Shuffle the cards
function shuffleCards() {
  cards.sort(() => Math.random() - 0.5);
}

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
      matchingPair.volume = 0.08;
      setTimeout(() => {
        clearCard(card1);
        clearCard(card2);

        updateScore();
        checkGameEnd();

        isLocked = false;
      }, 1000);
    } else {
      //if player failed, next player => currentPlayer + 1
      if (currentPlayer == players.length)
        currentPlayer = 1; //if last player in list then start from beginging
      else currentPlayer++;

      setTimeout(() => {
        flipCard(card1);
        flipCard(card2);

        isLocked = false;
      }, 1000);
    }

    flippedCards = [];
  }
  setCurrentPlayer();
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

function createHighscore() {
  if (players.length > 1) {
    for (let i = 0; i < players.length; i++) {
      //players list iterate (of gets the value)

      multipHighScoreList.push({
        //created new entry
        player: players[i].player,
        highScore: players[i].score,
      }); //adds new entry to highScoreList
    }

    multipHighScoreList.sort((player1, player2) => player2.highScore - player1.highScore); //sort array by DESC

    if (multipHighScoreList.length > 10) {
      multipHighScoreList.splice(10); //remove every element after index 10
    }
    //JSON.stringify parse to json format (localStorage)
    localStorage.setItem(
      "MultiplayerHighscores",
      JSON.stringify(multipHighScoreList)
    ); //add highScoreList to localStorage
  } else {
    //players list iterate (of gets the value)
    const timerText = winTime.textContent;

    singlepHighScoreList.push({
      //created new entry
      player: players[0].player,
      highScore: players[0].score,
      time: timerText,
    }); //adds new entry to highScoreList

    singlepHighScoreList.sort((player1, player2) => {
      //time sort
      const timeA = player1.time.slice(6); // slice after "Time:"
      const timeB = player2.time.slice(6); //

      const [minutesA, secondsA] = timeA.split(":").map(Number); // convert the minutes and seconds strings into numbers.
      const [minutesB, secondsB] = timeB.split(":").map(Number);

      // Compare the minutes and seconds
      if (minutesA !== minutesB) {
        return minutesA - minutesB; // Sort by minutes in ascending order
      } else {
        return secondsA - secondsB; // Sort by seconds in ascending order if minutes are equal
      }
    });

    if (singlepHighScoreList.length > 10) {
      singlepHighScoreList.splice(10); //remove every element after index 10
    }
    //JSON.stringify parse to json format (localStorage)
    localStorage.setItem(
      "SingleplayerHighscores",
      JSON.stringify(singlepHighScoreList)
    ); //add highScoreList to localStorage
  }
}

function displayHighscore() {
  let tmpMultipHighScoreList = JSON.parse(
    localStorage.getItem("MultiplayerHighscores")
  ); //gets highScoreList from localStorage
  if (tmpMultipHighScoreList != null) {
    //not empty
    for (let index in tmpMultipHighScoreList) {
      // (in gets the index)
      const scoreDiv = document.createElement("div");
      scoreDiv.textContent = `${parseInt(index) + 1}. Highscore of ${
        tmpMultipHighScoreList[index].player
      } Scored: ${tmpMultipHighScoreList[index].highScore}`;
      multipHighScoreContainer.appendChild(scoreDiv);
    }
  }
  let tmpSinglepHighScoreList = JSON.parse(
    localStorage.getItem("SingleplayerHighscores")
  ); //gets highScoreList from localStorage
  if (tmpSinglepHighScoreList != null) {
    //not empty
    for (let index in tmpSinglepHighScoreList) {
      // (in gets the index)
      const scoreDiv = document.createElement("div");
      scoreDiv.textContent = `${parseInt(index) + 1}. Highscore of ${
        tmpSinglepHighScoreList[index].player
      } Scored: ${tmpSinglepHighScoreList[index].highScore} in: ${
        tmpSinglepHighScoreList[index].time
      }`;
      singlepHighScoreContainer.appendChild(scoreDiv);
    }
  }
}
// Fills list with local Storage list
function getLocalStorageItems() {
  const tmpMultipHighScoreList = JSON.parse(
    localStorage.getItem("MultiplayerHighscores")
  );
  if (tmpMultipHighScoreList != null)
    multipHighScoreList = tmpMultipHighScoreList;

  const tmpSinglepHighScoreList = JSON.parse(
    localStorage.getItem("SingleplayerHighscores")
  );
  if (tmpSinglepHighScoreList != null)
    singlepHighScoreList = tmpSinglepHighScoreList;
}

// Check if the game has ended
function checkGameEnd() {
  const flippedCards = document.querySelectorAll(".card.flipped");

  if (flippedCards.length === cards.length) {
    stopTimer();

    const endTime = new Date().getTime();
    const elapsedTime = (endTime - startTime) / 1000;
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = Math.floor(elapsedTime % 60);

    winTime.textContent = `Time: ${formatTime(minutes)}:${formatTime(seconds)}`;
    createHighscore();
    displayHighscore();

    gameContainer.style.display = "none";
    winScreen.style.display = "block";
  }
}
//Check which players turn
function setCurrentPlayer() {
  for (let i = 1; i <= players.length; i++) {
    const score = document.getElementById("p" + players[i - 1].player);
    score.style.fontWeight = i === currentPlayer ? "bold" : "normal"; //the currentPlayer equals to index gets bold
  }
}

// Update the score element
function updateScore() {
  let score = document.getElementById("p" + players[currentPlayer - 1].player);
  players[currentPlayer - 1].score++;
  if (players[currentPlayer - 1].player != null) { //currentPlayer - 1, bc of array index starts at 0
    score.innerHTML =
      players[currentPlayer - 1].player +
      " Score: " +
      players[currentPlayer - 1].score;
  } else { //for "Player 1"
    score.innerHTML =
      "Player " +
      currentPlayer -
      1 +
      " Score: " +
      players[currentPlayer - 1].score;
  }
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
  difficultyContainer.style.display = "none";
  gameContainer.style.display = "block";
  setPlayerAmount();
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
  // updateScore();
  stopTimer();

  loadCardsAndStartGame(numPairs);

  gameSound.play();
  gameSound.volume = 0.008;
  setCurrentPlayer();
}

function toggleMute() {
  isMuted = !isMuted;

  if (isMuted) {
    soundOnIcon.style.display = "none";
    soundOffIcon.style.display = "inline-block";
    setAllSoundsMuted(true);
  } else {
    soundOnIcon.style.display = "inline-block";
    soundOffIcon.style.display = "none";
    setAllSoundsMuted(false);
  }
}

function setAllSoundsMuted(muted) {
  flipSound.muted = muted;
  dealSound.muted = muted;
  matchingPair.muted = muted;
  gameSound.muted = muted;
}

// Restart the game
function restartGame() {
  winScreen.style.display = "none";
  difficultyContainer.style.display = "block";
  gameContainer.style.display = "none";

  // Reset game variables
  flippedCards = [];
  isLocked = false;
  score = 0;
  players = [];
  currentPlayer = 1;

  while (multipHighScoreContainer.firstChild) {
    multipHighScoreContainer.removeChild(multipHighScoreContainer.firstChild);
  }
  while (singlepHighScoreContainer.firstChild) {
    singlepHighScoreContainer.removeChild(singlepHighScoreContainer.firstChild);
  }
  while (scoreContainer.firstChild) {
    scoreContainer.removeChild(scoreContainer.firstChild);
  }
  // updateScore();
  stopTimer();

  // Clear the grid container
  gridContainer.innerHTML = "";

  // Stop and reset all sounds
  flipSound.pause();
  flipSound.currentTime = 0;
  dealSound.pause();
  dealSound.currentTime = 0;
  matchingPair.pause();
  matchingPair.currentTime = 0;
  gameSound.pause();
  gameSound.currentTime = 0;

  // Reset mute button state
  isMuted = false;
  soundOnIcon.style.display = "inline-block";
  soundOffIcon.style.display = "none";
  setAllSoundsMuted(false);

  // Reset timer and score
  timerElement.textContent = "00:00";
}

// Initialize the game, call at start of page reload
function init() {
  getLocalStorageItems();
  updatePlayerInputs(); //display inputfield at start
  difficultyContainer.style.display = "block";
  gameContainer.style.display = "none";
}

init();
