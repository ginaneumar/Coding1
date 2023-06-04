const gridContainer = document.querySelector(".grid-container");
let cards = []; // Array to store the card initialize

fetch("cards.json") //loading icons from JSON File
  .then((res) => res.json())
  .then((data) => {
    //dupicate icons for card pairs
    cards = [...data, ...data];
    shuffleCards();
    generateCards();
  });

function shuffleCards() {
  for (let i = cards.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[randomIndex]] = [cards[randomIndex], cards[i]];
  }
}

function generateCards() {
  const numCards = 8 * 5; // Anzahl der gewünschten Karten (8 Spalten x 5 Reihen)

  for (let i = 0; i < numCards; i++) {
    // Überprüfe, ob alle Karten bereits generiert wurden
    if (i >= cards.length) {
      break;
    }

    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card-front">
        <img src="${cards[i].icon}" alt="Card Icon">
      </div>
      <div class="card-back"></div>
    `;
    gridContainer.appendChild(card);
  }
}

