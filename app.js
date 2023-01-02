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
const exit = document.querySelectorAll(".close");
const cardName = document.querySelector(".desc-h1");
const body = document.querySelector("body");
const shuffleBtn = document.querySelector(".new-shuffle");

const saveBtn = document.querySelector(".save-layout");
const saveLayoutBtn = document.querySelector(".save-popup .button.primary");
const loadBtn = document.querySelector(".load-layout");
const loadLayoutBtn = document.querySelector(
  ".save-popup.load .button.primary"
);
const deleteLayoutBtn = document.querySelector(
  ".save-popup.load .button.secondary"
);
const savePopup = document.querySelector(".save-popup");
const loadPopup = document.querySelector(".save-popup.load");
const loadCardWrp = document.querySelector(".load-card-wrp");

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
  savePopup.classList.add("d-none");
  loadPopup.classList.add("d-none");

  body.style.overflow = "";
}

function openPopup() {
  console.log("hey");
  popup.classList.remove("d-none");
}

function openSavePopup() {
  savePopup.classList.remove("d-none");
}

function openLoadPopup() {
  // Clearing previously loaded layouts
  while (loadCardWrp.lastElementChild) {
    loadCardWrp.removeChild(loadCardWrp.lastElementChild);
  }

  loadPopup.classList.remove("d-none");

  let localLibrary;

  if (localStorage.getItem("library") === null) {
    localLibrary = [];
  } else {
    localLibrary = JSON.parse(localStorage.getItem("library"));
  }

  localLibrary.forEach((item) => {
    // Variables
    const cardIndex = localLibrary.indexOf(item);
    const cardDiv = document.createElement("div");
    const card = document.createElement("img");
    const loadCard = document.createElement("div");
    const loadCardP = document.createElement("p");
    const loadCardH3 = document.createElement("h3");

    //  Adding classes
    cardDiv.classList.add("picked-card");
    cardDiv.classList.add("card");
    loadCard.classList.add("load-card");
    loadCard.id = cardIndex;
    loadCardP.classList.add("save-date");
    loadCardH3.classList.add("layout-name");

    // Adding content
    card.src = `./cards/${cards.cards[item.thumbnail].img}`;
    loadCardP.innerText = item.date;
    loadCardH3.innerText = item.name;

    // Appending children
    cardDiv.appendChild(card);
    loadCard.appendChild(cardDiv);
    loadCard.appendChild(loadCardP);
    loadCard.appendChild(loadCardH3);
    loadCardWrp.appendChild(loadCard);

    // Reverso
    if (item.reverse) {
      cardDiv.classList.add("reversed");
    }
  });

  const loadCards = document.querySelectorAll(".load-card");
  loadCards.forEach((instace) => {
    instace.addEventListener("click", () => {
      let selectCheck = document.querySelector(".load-card.selected");

      if (selectCheck === null) {
        instace.classList.add("selected");
      } else {
        selectCheck.classList.remove("selected");
        instace.classList.add("selected");
      }
    });
  });
}

function reload() {
  location.reload();
}

function saveLayout() {
  const layoutName = savePopup.querySelector(".input-text").value;

  // Adding current date
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  let reverse;

  today = dd + "/" + monthNames[today.getMonth()] + "/" + yyyy;

  const firstCard = document.querySelectorAll(".picked-cards .picked-card")[0];

  if (firstCard.classList.contains("reversed")) {
    reverse = true;
  } else {
    reverse = false;
  }

  layoutObj = {
    name: layoutName,
    cards: pickedCards,
    thumbnail: pickedCards[0],
    date: today,
    reverse: reverse,
  };

  let localLibrary;

  if (localStorage.getItem("library") === null) {
    localLibrary = [];
  } else {
    localLibrary = JSON.parse(localStorage.getItem("library"));
  }

  localLibrary.push(layoutObj);
  localStorage.setItem("library", JSON.stringify(localLibrary));

  closePopup();
}

function loadLayout() {
  // Checking for library
  if (localStorage.getItem("library") === null) {
    localLibrary = [];
  } else {
    localLibrary = JSON.parse(localStorage.getItem("library"));
  }

  // Clearing existing cards on table
  while (pickedCardsWrp.lastElementChild) {
    pickedCardsWrp.removeChild(pickedCardsWrp.lastElementChild);
  }

  // Variables
  const selectedCard = document.querySelector(".load-card.selected");
  const selectedLayout = localLibrary[selectedCard.id].cards;
  const selectedReverse = localLibrary[selectedCard.id].reverse;

  let counter = 1;
  let cardCounter = 0;

  // Creating cards
  while (counter <= selectedLayout.length) {
    const cardDiv = document.createElement("div");
    const card = document.createElement("img");

    cardDiv.classList.add("picked-card");
    cardDiv.classList.add("card");
    cardDiv.appendChild(card);

    cardDiv.firstElementChild.src = `./cards/${
      cards.cards[selectedLayout[cardCounter]].img
    }`;

    // Reverse
    if (selectedReverse) {
      cardDiv.classList.add("reversed");
      popupCard.classList.add("reversed");
      cardName.classList.add("reversed-text");
    } else {
      cardDiv.classList.remove("reversed");
      popupCard.classList.remove("reversed");
      cardName.classList.remove("reversed-text");
    }

    // // Setting card id
    cardDiv.setAttribute("id", `${selectedLayout[cardCounter]}`);

    // Adding card to wrapper
    pickedCardsWrp.appendChild(cardDiv);

    // Adding popup function
    cardDiv.addEventListener("click", function () {
      console.log(cardDiv.id);
      popup.classList.remove("d-none");
      body.style.overflow = "hidden";
      popupCard.src = `./cards/${cards.cards[cardDiv.id].img}`;
      cardName.innerHTML = `${cards.cards[cardDiv.id].name}`;
      if (cardDiv.classList.contains("reversed")) {
        popupCard.classList.add("reversed");
        cardName.classList.add("reversed-text");
      } else {
        popupCard.classList.remove("reversed");
        cardName.classList.remove("reversed-text");
      }
    });

    // Removing cards from card row
    secondRow.removeChild(secondRow.lastElementChild);

    pickedCards.push(selectedLayout[cardCounter]);

    counter++;
    cardCounter++;
  }

  loadPopup.classList.add("d-none");
}

function deleteLayout() {
  // Checking for library
  if (localStorage.getItem("library") === null) {
    localLibrary = [];
  } else {
    localLibrary = JSON.parse(localStorage.getItem("library"));
  }

  // Removing item from localLibrary
  const selectedCard = document.querySelector(".load-card.selected");
  const selectedCardID = document.querySelector(".load-card.selected").id;
  // const selectedLayout = localLibrary[selectedCard.id];

  console.log(localLibrary);

  const index = selectedCardID;

  if (index > -1) {
    // only splice array when item is found
    localLibrary.splice(index, 1); // 2nd parameter means remove one item only
  }

  console.log(localLibrary);

  // Removing card from DOM
  selectedCard.remove();

  // Update local storage
  localStorage.clear();
  localStorage.setItem("library", JSON.stringify(localLibrary));
}

//Event listeners
deckCard.forEach((card) => {
  card.addEventListener("click", randomCard);
});

exit.forEach((instace) => {
  instace.addEventListener("click", closePopup);
});

// exit.addEventListener("click", closePopup);
exitBtn.addEventListener("click", closePopup);

shuffleBtn.addEventListener("click", reload);

saveBtn.addEventListener("click", openSavePopup);
saveLayoutBtn.addEventListener("click", saveLayout);
loadBtn.addEventListener("click", openLoadPopup);
loadLayoutBtn.addEventListener("click", loadLayout);

deleteLayoutBtn.addEventListener("click", deleteLayout);

// Clear local storage
// localStorage.clear();
