"use strict";

// #1) Selectiong Elements
const score0El = document.querySelector("#score--0"); //using # because it is an id, not a class
const score1El = document.getElementById("score--1"); //It's also possible to get elements by id this way.
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnRules = document.querySelector(".btn--rules");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnClose = document.querySelector(".close-modal");
const winnerMessage = document.querySelector(".winner");

// #2) Starting Conditions

// We must declare the variables out of the function, because, if it is within the function code, it will only be read inside the code
let scores, currentScore, activePlayer, playing;

const startingConditions = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0; // this code is to make the changing of players (0 is player 1 and 1 is player 2)
  playing = true; //this will be a boolean value to make the game stop after reaching 100 points
  winnerMessage.classList.add("hidden");

  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add("hidden");

  current0El.textContent = current1El.textContent = currentScore;
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

startingConditions();

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
  activePlayer = activePlayer === 0 ? 1 : 0; //If active player is 0, it should become 1, when not, it should become 0
};

// #3) Rolling the dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1. Start by generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //2. Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`; //by doing that, we generate the correct image of each dice

    //3. Check if it is 1: if true, switch to next player
    if (dice !== 1) {
      // If it is not 1, add dice to current score
      currentScore += dice;

      //By writing the code like this we can manage to sum in different current scores!
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// #4) Implementing the Hold button
btnHold.addEventListener("click", function () {
  if (playing) {
    // 1., add current score to active player's score
    scores[activePlayer] += currentScore; //scores [1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100, if so, finish the game,
    if (scores[activePlayer] >= 50) {
      // Finish the game!
      winnerMessage.textContent = `Congratulations! Player ${
        activePlayer + 1
      } won the game! 🏆`;
      winnerMessage.classList.remove("hidden");
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
    } else {
      //if not, switch players
      switchPlayer();
    }
  }
});

// #5) Implementing the New Game button
btnNew.addEventListener("click", startingConditions);

// #6) Implementing the Game Rules button
btnRules.addEventListener("click", function () {
  // The class 'hidden' in the CSS file has the display set to 'none', that's why we need to remove that class in order for the message to appear!
  //console.log('Button Clicked');
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

const closeModal = function () {
  // The class 'hidden' in the CSS file has the display set to 'none', that's why we need to add that class in order for the message to disapear!
  //console.log('Modal Closed');
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnClose.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
  // We must specify the '.key', because the keys on the keyboards are like objects, and the parameter key is one of them
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    //Reading below: if the modal does not contain the hidden class (which means it is not hidden), pressing 'esc' will then add this class
    closeModal();
  }
});
