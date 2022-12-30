let cards = {}; // will later be filled with the data
let req = new XMLHttpRequest();
req.open("GET", "./tarot-images.json", false);
req.send(null);
if (req.status == 200) {
  // 200 request status
  cards = JSON.parse(req.responseText);
}

// Variables
const deckCard = document.querySelectorAll(".deck-row .card");
const pickedCardsWrp = document.querySelector(".picked-cards-wrp");
const secondRow = document.querySelectorAll(".deck-row")[1];
const popup = document.querySelector(".popup");
const popupCard = document.querySelector(".popup-wrp__card .card img");
const exitBtn = document.querySelector(".popup-wrp__card button");
const exit = document.querySelector(".exit");
const cardName = document.querySelector(".desc-h1");
const body = document.querySelector("body");
const shuffleBtn = document.querySelector(".new-shuffle");
const saveBtn = document.querySelector(".save-layout");

let pickedCards = [];

// Functions
function randomCard() {
  // Variables
  let randomNr = Math.floor(Math.random() * cards.cards.length + 1);
  const reverse = Math.random() > 0.5;
  const cardDiv = document.createElement("div");
  const card = document.createElement("img");

  // Removing last card
  secondRow.removeChild(secondRow.lastElementChild);

  // Creating cards
  cardDiv.classList.add("picked-card");
  cardDiv.classList.add("card");
  cardDiv.appendChild(card);

  // Avoiding duplication
  pickedCards.forEach((card) => {
    if (card === randomNr) {
      console.log(card);
      while (randomNr === card) {
        randomNr = Math.floor(Math.random() * cards.cards.length + 1);
      }
    }
  });

  pickedCards.push(randomNr);

  // Chaging card image
  card.src = `./cards/${cards.cards[randomNr].img}`;

  // Dealing with reversed cards
  if (reverse) {
    cardDiv.classList.add("reversed");
    popupCard.classList.add("reversed");
    cardName.classList.add("reversed-text");
  } else {
    cardDiv.classList.remove("reversed");
    popupCard.classList.remove("reversed");
    cardName.classList.remove("reversed-text");
  }

  // Adding card to wrapper
  pickedCardsWrp.appendChild(cardDiv);
  cardDiv.setAttribute("id", `${randomNr}`);

  // POPUP
  popup.classList.remove("d-none");
  popupCard.src = `./cards/${cards.cards[randomNr].img}`;
  cardName.innerHTML = `${cards.cards[randomNr].name}`;
  body.style.overflow = "hidden";

  const pickedCard = document.querySelectorAll(".picked-card");

  pickedCard.forEach((card) => {
    card.addEventListener("click", function () {
      console.log(card.id);
      popup.classList.remove("d-none");
      body.style.overflow = "hidden";

      popupCard.src = `./cards/${cards.cards[card.id].img}`;
      cardName.innerHTML = `${cards.cards[card.id].name}`;

      if (card.classList.contains("reversed")) {
        popupCard.classList.add("reversed");
        cardName.classList.add("reversed-text");
      } else {
        popupCard.classList.remove("reversed");
        cardName.classList.remove("reversed-text");
      }
    });
  });
}

function closePopup() {
  popup.classList.add("d-none");
  body.style.overflow = "";
}

function openPopup() {
  console.log("hey");
  popup.classList.remove("d-none");
}

function reload() {
  location.reload();
}

function saveLayout() {
  console.log(pickedCards);

  // Add the pickedCards array to the browser's memory. When you load the you can create new html elements like you've done in the randomCard() based on the numbers in the array
}

//Event listeners
deckCard.forEach((card) => {
  card.addEventListener("click", randomCard);
});

exit.addEventListener("click", closePopup);
exitBtn.addEventListener("click", closePopup);

shuffleBtn.addEventListener("click", reload);
saveBtn.addEventListener("click", saveLayout);
