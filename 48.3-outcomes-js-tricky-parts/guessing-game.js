function guessingGame() {
    const target = parseInt(Math.random() * 100);
    let count = 0;
    let isWon = false;

    return (guess) => {
        if (isWon) {
            return "The game is over, you already won!";
        }
        count++;
        if (guess === target) {
            isWon = true;
            return `You win! You found ${guess} in ${count} guesses.`
        }
        if (guess > target) {
            return `${guess} is too high!`;
        }
        if (guess < target) {
            return `${guess} is too low!`;
        }
    }
}


module.exports = { guessingGame };
