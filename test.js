// let cards = {};

// fetch("./tarot-images.json")
//   .then((res) => res.json())
//   .then((data) => showcards(data));

// function showcards(event) {
//   //   console.log(event.cards[1].name);
//   cards = event.cards;

//   //   obj = event.cards;

//   //   event.cards.forEach((element) => {
//   //     console.log(element);
//   //   });
//   console.log(cards);
// }

// console.log(cards);

// Works;
let cards = {}; // will later be filled with the data
let req = new XMLHttpRequest();
req.open("GET", "./tarot-images.json", false);
req.send(null);
if (req.status == 200) {
  // 200 request status
  cards = JSON.parse(req.responseText);
}

const cardName = document.querySelector(".card-name");
const cardImg = document.querySelector(".card-img");
const button = document.querySelector(".button");

// console.log(cards.cards);
// randomCard();

function randomCard() {
  const randonNr = Math.floor(Math.random() * 78 + 1);
  const reverse = Math.random() > 0.5;

  cardName.innerHTML = cards.cards[randonNr].name;
  cardImg.src = `./cards/${cards.cards[randonNr].img}`;

  if (reverse) {
    cardImg.classList.add("reversed");
  } else {
    cardImg.classList.remove("reversed");
  }
}

//Event listeners
button.addEventListener("click", randomCard);
