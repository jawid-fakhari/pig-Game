'use strict';
/*Selecting elements*/
const diceImg = document.querySelector('.dice');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const scorePlay0 = document.querySelector('#score--0');
const scorePlay1 = document.querySelector('#score--1');

const currentScoreP0 = document.querySelector('#current--0');
const currentScoreP1 = document.querySelector('#current--1');

let totScors, currentScore, activePlayer, playing;

/*functions*/
//iniziatore 
function init() {
    /*conditions*/
    totScors = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    scorePlay0.textContent = 0;
    scorePlay1.textContent = 0;
    currentScoreP0.textContent = 0;
    currentScoreP1.textContent = 0;
    diceImg.classList.add('hidden');
    
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
}
init();

const switchPlayer = function () {
    //switch player
    //document.querySelector(`.player--${activePlayer}`).classList.toggle('player--active');
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
    currentScore = 0;
    currentScoreP0.textContent = 0;
    currentScoreP1.textContent = 0;
    //si deve cambiare active player qui, se active player è 0 allora diventa 1 o viceversa
    activePlayer = activePlayer === 0 ? 1 : 0;
}
//roll dice function
const rollFunc = function () {
    if (playing) {
        let randNumber = Math.trunc(Math.random() * 6 + 1);
        diceImg.classList.remove('hidden');
        diceImg.src = `dice-${randNumber}.png`;

        if (randNumber === 1) {
            switchPlayer();
        } else {
            currentScore += randNumber;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        }
    }
}
//total score calculation
const totalScoreFunc = function () {
    if (playing) {
        totScors[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = totScors[activePlayer];
        if (totScors[activePlayer] >= 20) {
            playing = false;
            diceImg.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            //
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }
}

/*click event handler */

//roll dice button
btnRollDice.addEventListener('click', rollFunc);
btnHold.addEventListener('click', totalScoreFunc);
btnNewGame.addEventListener('click', init);