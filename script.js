"use strict";
// selecting element
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");
const currentscore0 = document.getElementById("current--0");
const currentscore1 = document.getElementById("current--1");
const dice = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");

// starting conditions
dice.classList.add("hidden");
let currentscore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;

// switch player
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentscore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
};
// press button roll
btnRoll.addEventListener("click", function () {
  if (playing) {
    dice.classList.remove("hidden");
    let numroll = Math.trunc(Math.random() * 6) + 1;
    dice.src = `dice-${numroll}.png`;

    // check for rolls 1
    if (numroll !== 1) {
      // current score
      currentscore += numroll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentscore;
    } else {
      switchPlayer();
    }
  }
});

// press button hold
btnHold.addEventListener("click", function () {
  if (playing) {
    // hold point for current player
    scores[activePlayer] += currentscore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // check if a player win with score >=100
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // switch next player
      switchPlayer();
    }
  }
});

// press button new
btnNew.addEventListener("click", function () {
  document.querySelector(`.player--winner`).classList.remove("player--winner");
  dice.classList.add("hidden");
  currentscore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
  score0.textContent = 0;
  score1.textContent = 0;
  currentscore0.textContent = 0;
  currentscore1.textContent = 0;
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
});
