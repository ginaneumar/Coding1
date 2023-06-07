const gridContainer = document.querySelector(".grid-container"); // Select grid container element
let cards = []; // Array to store the cards

// Load JSON data and generate cards after data is fetched
fetch("cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data]; // Create card pairs by duplicating the data
    shuffleCards(); // Shuffle the cards randomly
    generateCards(); // Generate the cards in the grid
  });

// Function to shuffle the cards using the Fisher-Yates algorithm, but i got a simpler version
function shuffleCards() {
  cards.sort(() => Math.random() - 0.5);
}

// Function to generate the cards in the grid
function generateCards() {
  const numCards = 8 * 5; // Number of cards in the grid

  for (let i = 0; i < numCards && i < cards.length; i++) {
    const card = document.createElement("div"); // Create a new div element for the card
    card.classList.add("card"); // Add the 'card' class to the card element
    card.setAttribute("data-index", i); // Store the card index as a data attribute

    // Create the front face of the card
    const frontFace = document.createElement("div");
    frontFace.classList.add("card-front"); // Add the 'card-front' class to the front face element

    // Create the image element for the backside of the card
    const backsideImg = document.createElement("img");
    backsideImg.src = "backside.jpeg"; // Set the image source
    backsideImg.alt = "Card Back"; // Set the alt attribute for accessibility

    frontFace.appendChild(backsideImg); // Append the backside image to the front face
    card.appendChild(frontFace); // Append the front face to the card

    // Create the back face of the card
    const backFace = document.createElement("div");
    backFace.classList.add("card-back"); // Add the 'card-back' class to the back face element

    // Create the image element for the card icon
    const backImg = document.createElement("img");
    backImg.src = cards[i].image; // Set the image source from the JSON data
    backImg.alt = "Card Icon"; // Set the alt attribute for accessibility
    backImg.style.visibility = "hidden"; // Hide the backside image initially
    backImg.style.backgroundColor = "white"; // Set the background color of the image to white

    backFace.appendChild(backImg); // Append the card icon image to the back face
    card.appendChild(backFace); // Append the back face to the card

    gridContainer.appendChild(card); // Append the card to the grid container

    // Add event listener to flip the card on click
    card.addEventListener("click", () => {
      const index = card.dataset.index; // Get the card index from the data attribute
      const isFlipped = card.classList.contains("flipped"); // already flipped?

      if (!isFlipped && flippedCards.length < 2) { // < 2 card can be flipped 
        card.classList.add("flipped"); 
        flippedCards.push(card); //add to Array

        setTimeout(() => {
          backImg.style.visibility = "visible";  // icon visible
          frontFace.style.transform = "rotateY(180deg)"; //flippen

          if (flippedCards.length === 2) { //by 2 card compare them
            compareCards();
          }
        }, 100);
      }
    });
  }
}
