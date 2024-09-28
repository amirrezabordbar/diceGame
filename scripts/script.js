"use strict";
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");
const diceImg = document.querySelector(".dice");
let scores, activePlayer, currentScore, playing;

const init = function () {
    scores = [0, 0];
    activePlayer = 0;
    currentScore = 0;
    playing = true;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    diceImg.classList.add("hidden");
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
}
init();

// این فانکشن برای جلوگیری از تکرار است اضافی کد ها است
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle("player--active");
    player1El.classList.toggle("player--active");
};

// وقتی که روی دکمه رول کلیک شد
btnRoll.addEventListener("click", function () {
    if (playing) {
        document.querySelector(".dice").classList.remove("hidden");
        const dice = Math.trunc(Math.random() * 6) + 1;
        diceImg.src = `./imgs/dice-${dice}.png`;
        // اگر عدد یک بود
        if (dice !== 1) {
            currentScore = currentScore + dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

// وقتی که روی دکمه هولد کلیک شد
btnHold.addEventListener("click", function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // بررسی امتیاز برای برنده شدن
        if (scores[activePlayer] >= 100) {
            playing = false;
            diceImg.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }
});

// وقتی که روی بازی مجدد کلیک شد
btnNew.addEventListener("click", init);