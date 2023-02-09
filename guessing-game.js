const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let min;
let max;
let secretNumber;
let numAttempts;

const randomInRange = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const askLimit = () => {
    rl.question("Enter number of attempts: ", askRange);
}

const askRange = (num) => {
    numAttempts = Number(num);
    if (numAttempts < 1) {
        console.log("Attempts must be 1 or more!");
        askLimit();
    }
    rl.question("Enter a max number: ", askMinNumber);
}

const askMinNumber = (num) => {
    max = Number(num);
    rl.question("Enter a min number: ", setRange);
}

const setRange = (num) => {
    min = Number(num);
    if (max < min) {
        console.log("Max must be higher than min!");
        askLimit();
    } else {
        secretNumber = randomInRange(min, max);
        console.log("I'm thinking of a number between " + min + " and " + max);
        console.log("You have " + numAttempts + " attempts to guess the secret number!");
        askGuess();
    }
}

const checkGuess = (num) => {
    if (Number(num) > secretNumber) {
        console.log("Too high.");
        return false;
    }
    if (Number(num) < secretNumber) {
        console.log("Too low.");
        return false;
    }
    if (Number(num) === secretNumber) {
        console.log("Correct!");
        return true;
    }
}

const askGuess = () => {
    rl.question('Enter a guess: ', (answer) => {
        let guess = checkGuess(answer);
        numAttempts--;

        if (guess) {
            console.log("You win!");
            rl.close();

        } else {
            if (numAttempts === 0) {
                console.log("You lose! The answer was " + secretNumber + " :)");
                rl.close();

            } else {
                console.log("You have " + numAttempts + " attempts remaining!");
                askGuess();
            }
        }
    });
}

askLimit();
