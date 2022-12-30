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

let pickedCards = [];
// let cardDrawCount = 77;

// const cardName = document.querySelector(".card-name");
// const cardImg = document.querySelector(".card-img");
// const button = document.querySelector(".button");

// console.log(cards.cards);
// randomCard();

// Functions
function randomCard() {
  //   cardDrawCount -= 1;

  // cardsCopy = structuredClone(cards);

  let randomNr = Math.floor(Math.random() * cards.cards.length + 1);
  const reverse = Math.random() > 0.5;
  console.log(randomNr);

  const cardDiv = document.createElement("div");
  const card = document.createElement("img");

  secondRow.removeChild(secondRow.lastElementChild);

  cardDiv.classList.add("picked-card");
  cardDiv.classList.add("card");
  cardDiv.appendChild(card);

  pickedCards.forEach((card) => {
    if (card === randomNr) {
      console.log(card);
      while (randomNr === card) {
        randomNr = Math.floor(Math.random() * cards.cards.length + 1);
      }
    }
  });

  pickedCards.push(randomNr);

  card.src = `./cards/${cards.cards[randomNr].img}`;

  if (reverse) {
    cardDiv.classList.add("reversed");
    popupCard.classList.add("reversed");
    cardName.classList.add("reversed-text");
  } else {
    cardDiv.classList.remove("reversed");
    popupCard.classList.remove("reversed");
    cardName.classList.remove("reversed-text");
  }

  pickedCardsWrp.appendChild(cardDiv);
  cardDiv.setAttribute("id", `${randomNr}`);

  // POPUP
  // popup.classList.remove("d-none");
  // popupCard.src = `./cards/${cards.cards[randomNr].img}`;
  // cardName.innerHTML = `${cards.cards[randomNr].name}`;

  // Local storage

  //   pickedCards.push(randomNr);
  //   localStorage.setItem("picked-cards", JSON.stringify(pickedCards));
  //   //   let storedCards = JSON.parse(localStorage.getItem("picked-cards"));

  //   //...

  //   const newArrayItem = pickedCards.length - 1;

  const pickedCard = document.querySelectorAll(".picked-card");

  pickedCard.forEach((card) => {
    card.addEventListener("click", function () {
      console.log(card.id);
      popup.classList.remove("d-none");

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

  // let index = randomNr;
  // cards.cards.splice(index, 1);

  //   cardDiv.addEventListener("click", function () {
  //     console.log(this.id);
  //     popup.classList.remove("d-none");

  //     popupCard.src = `./cards/${cardsCopy.cards[this.id + 1].img}`;
  //     cardName.innerHTML = `${cardsCopy.cards[this.id + 1].name}`;

  //     if (reverse) {
  //       cardDiv.classList.add("reversed");
  //       popupCard.classList.add("reversed");
  //       cardName.classList.add("reversed-text");
  //     } else {
  //       cardDiv.classList.remove("reversed");
  //       popupCard.classList.remove("reversed");
  //       cardName.classList.remove("reversed-text");
  //     }
  //   });
}

function closePopup() {
  popup.classList.add("d-none");
}

function openPopup() {
  console.log("hey");
  popup.classList.remove("d-none");
}

//Event listeners
deckCard.forEach((card) => {
  card.addEventListener("click", randomCard);
});

exit.addEventListener("click", closePopup);
exitBtn.addEventListener("click", closePopup);

// pickedCards.forEach((asd) => {
//   asd.addEventListener("click", openPopup);
// });

// for (let i = 0; i < pickedCards.length; i++) {
//   (function (index) {
//     pickedCards[index].addEventListener("click", function () {
//       console.log("you clicked region number " + index);
//     });
//   })(i);
// }
// deckCard.addEventListener("click", randomCard);
