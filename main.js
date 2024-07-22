const imageOne = 'images/dice-1.svg';
const imageTwo = 'images/dice-2.svg';
const imageThree = 'images/dice-3.svg';
const imageFour = 'images/dice-4.svg';
const imageFive = 'images/dice-5.svg';
const imageSix = 'images/dice-6.svg';
const crownImage = 'images/crown.svg';

let numbersPlayerOne = [];
let numbersPlayerTwo = [];

const playerOneButton = document.getElementById('b1');
const playerTwoButton = document.getElementById('b2');

const playerOneText = document.getElementById('p-one-score');
const playerTwoText = document.getElementById('p-two-score');

let clickCountOne = 0;
let clickCountTwo = 0;
let rollingPlayerOne = false;
let rollingPlayerTwo = false;

function diceAnimation(currentPlayer, callback) {
    if ((currentPlayer === 1 && rollingPlayerOne) || (currentPlayer === 2 && rollingPlayerTwo)) return;

    if (currentPlayer === 1) rollingPlayerOne = true;
    if (currentPlayer === 2) rollingPlayerTwo = true;

    let counter = 0;
    let lastRoll = 0;
    const interval = setInterval(() => {
        let randomNumberTwo = Math.floor(Math.random() * 6) + 1;
        lastRoll = randomNumberTwo; // Store the last roll

        switch (randomNumberTwo) {
            case 1:
                document.getElementById('dice').src = imageOne;
                break;
            case 2:
                document.getElementById('dice').src = imageTwo;
                break;
            case 3:
                document.getElementById('dice').src = imageThree;
                break;
            case 4:
                document.getElementById('dice').src = imageFour;
                break;
            case 5:
                document.getElementById('dice').src = imageFive;
                break;
            case 6:
                document.getElementById('dice').src = imageSix;
                break;
        }

        counter += 100; // Increment counter by the interval duration

        if (counter >= 1500) { // Stop after 1500 milliseconds (1.5 seconds)
            clearInterval(interval);
            if (currentPlayer === 1) {
                numbersPlayerOne.push(lastRoll);
                rollingPlayerOne = false;
            } else if (currentPlayer === 2) {
                numbersPlayerTwo.push(lastRoll);
                rollingPlayerTwo = false;
            }
            callback(); // Call the callback function after the animation completes
        }
    }, 100); // Interval time in milliseconds
}

function rollDicePlayerOne() {
    if (clickCountOne >= 3 || rollingPlayerOne) return;

    clickCountOne++;
    playerOneButton.disabled = true; // Disable button during rolling
    diceAnimation(1, () => {
        const totalScorePlayerOne = numbersPlayerOne.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        playerOneText.innerHTML = `Player one score: ${totalScorePlayerOne}`;
        playerOneButton.disabled = false; // Re-enable button after rolling

        if (clickCountOne >= 3 && clickCountTwo >= 3) {
            checkWinCondition();
        }
    });
}

function rollDicePlayerTwo() {
    if (clickCountTwo >= 3 || rollingPlayerTwo) return;

    clickCountTwo++;
    playerTwoButton.disabled = true; // Disable button during rolling
    diceAnimation(2, () => {
        const totalScorePlayerTwo = numbersPlayerTwo.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        playerTwoText.innerHTML = `Player two score: ${totalScorePlayerTwo}`;
        playerTwoButton.disabled = false; // Re-enable button after rolling

        if (clickCountOne >= 3 && clickCountTwo >= 3) {
            checkWinCondition();
        }
    });
}

playerOneButton.addEventListener('click', rollDicePlayerOne);

playerTwoButton.addEventListener('click', rollDicePlayerTwo);

function checkWinCondition() {
    const totalScorePlayerOne = numbersPlayerOne.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const totalScorePlayerTwo = numbersPlayerTwo.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    if (totalScorePlayerOne > totalScorePlayerTwo) {
        playerOneText.innerHTML = `Player 1 wins by ${totalScorePlayerOne - totalScorePlayerTwo} points!`;
        document.getElementById('dice').src = crownImage;
    } else if (totalScorePlayerOne < totalScorePlayerTwo) {
        playerTwoText.innerHTML = `Player 2 wins by ${totalScorePlayerTwo - totalScorePlayerOne} points!`;
        document.getElementById('dice').src = crownImage;
    } else {
        playerOneText.innerHTML = `It's a tie! Both players scored ${totalScorePlayerOne} points!`;
        playerTwoText.innerHTML = `It's a tie! Both players scored ${totalScorePlayerTwo} points!`;
    }
}
