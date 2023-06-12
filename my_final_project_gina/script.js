const gridContainer = document.querySelector(".grid-container"); // Select grid container element
let cards = []; // Array to store the cards
let flippedCards = [];

let isLocked = false;

// Load JSON data and generate cards after data is fetched
fetch("cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data]; // Create card pairs by duplicating the data
    shuffleCards();
    generateCards();
  });

// Function to shuffle the cards using the Fisher-Yates algorithm, but i got a simpler version
function shuffleCards() {
  cards.sort(() => Math.random() - 0.5);
}

// generate cards in the grid
function generateCards() {
  const numCards = 8 * 5;

  //new div element for cards, and add card class to card element, Store card index as a data attribute
  for (let i = 0; i < numCards && i < cards.length; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-index", i);

    // Create front face, add card-font to front face element
    const frontFace = document.createElement("div");
    frontFace.classList.add("card-front");

    // Create image element for backside, set image source
    const frontSideImg = document.createElement("img");
    frontSideImg.src = "frontside.jpeg"; // Set the image source

    frontFace.appendChild(frontSideImg); // Append the backside image to the front face
    card.appendChild(frontFace); // Append the front face to the card

    // Create the back face of the card
    const backFace = document.createElement("div");
    backFace.classList.add("card-back"); // Add the 'card-back' class to the back face element

    // Create image element for the card icon
    const backImg = document.createElement("img");
    backImg.src = cards[i].image; // Set the image source from the JSON data

    backImg.style.visibility = "hidden"; // Hide the backside image initially
    backImg.style.backgroundColor = "white"; // background color of front face

    backFace.appendChild(backImg); // Append the card icon image to the back face
    card.appendChild(backFace); // Append the back face to the card

    gridContainer.appendChild(card); // Append the card to the grid container

    // Add event listener to flip the card on click
    card.addEventListener("click", () => {
      const index = card.dataset.index; // Get the card index from the data attribute
      const isFlipped = card.classList.contains("flipped"); // already flipped?

      if (!isFlipped && !isLocked) {
        // < 2 card can be flipped
        card.classList.add("flipped");
        flippedCards.push(card); //add to Array

        setTimeout(() => {
          backImg.style.visibility = "visible"; // icon visible
          frontFace.style.transform = "rotateY(180deg)"; //flippen

          if (flippedCards.length === 2) {
            //by 2 card compare them
            compareCards();
          }
        }, 100);
      }
    });
  }
}

function compareCards() {
  if (flippedCards.length === 2) {
    isLocked = true; // lock other cards
    const card1 = flippedCards[0];
    const card2 = flippedCards[1];

    const symbol1 = cards[parseInt(card1.dataset.index)].name;
    const symbol2 = cards[parseInt(card2.dataset.index)].name;

    if (symbol1 === symbol2) {
      setTimeout(() => {
        card1.innerHTML = ""; // empty card
        card2.innerHTML = "";

        card1.style.border = "none"; //remove border too so its really empty
        card2.style.border = "none";

        checkGameEnd();
        isLocked = false; // remove the lock
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

// Restart button event listener
const restartButton = document.querySelector("#restart-button");
restartButton.addEventListener("click", restartGame);

// Restart the game function
function restartGame() {
  gridContainer.innerHTML = ""; // Clear the grid container
  flippedCards = []; // Reset flipped cards array
  isLocked = false; // Unlock cards

  // Load JSON data and generate cards after data is fetched
  fetch("cards.json")
    .then((res) => res.json())
    .then((data) => {
      cards = [...data, ...data]; // Create card pairs by duplicating the data
      shuffleCards();
      generateCards();
    });
}

function flipCard(card) {
  const frontFace = card.querySelector(".card-front");
  const backImg = card.querySelector(".card-back img");

  card.classList.remove("flipped");
  setTimeout(() => {
    frontFace.style.transform = "rotateY(0)";
    backImg.style.visibility = "hidden";
  }, 100);
}

function checkGameEnd() {
  const flippedCards = document.querySelectorAll(".card.flipped");

  if (flippedCards.length === cards.length) {
    // Das Spiel ist beendet
    console.log("Spiel beendet!");
  }
}
