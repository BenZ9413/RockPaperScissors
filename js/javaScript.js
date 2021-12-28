/* 
User inputs his choice
Computer generates his choice
choices are compared and a winner is selected
write the result */

/*The computer generates randomly rock, paper or scissors*/
function computerPlays () {
    let computerChoice = Math.floor(Math.random()*3);
    switch (computerChoice) {
        case 0:
            return computerChoice = "Rock";
            break
        case 1:
            return computerChoice = "Paper";
            break
        case 2:
            return computerChoice = "Scissors";
            break
    }
}

/*The user prompts rock, paper or scissors*/
let userPlays = () => {
    let userChoice = prompt('Rock, Paper or Scissors?');
    userChoice = userChoice[0].toUpperCase() + userChoice.slice(1).toLowerCase();
    if (userChoice != 'Rock' && userChoice != 'Paper' && userChoice != 'Scissors') {
        throw new Error("Invalid entry! Please reload the page and try again.");
    }
    return userChoice;
}

/*Plays one round of Rock, Paper, Scissors*/
function playRound(choice1, choice2) {
    const win = `You win! ${choice1} beats ${choice2}.`;
    const lose = `You lose! ${choice2} beats ${choice1}.`;
    const draw = `It's a draw! ${choice1} is the same as ${choice2}.`;

    if (choice1 == "Rock") {
        switch (choice2) {
            case "Rock":
                return draw;
                break
            case "Paper":
                return lose;
                break
            case "Scissors":
                return win;
                break
        }
    } else if (choice1 == "Paper") {
        switch (choice2) {
            case "Rock":
                return win;
                break
            case "Paper":
                return draw;
                break
            case "Scissors":
                return lose;
                break
        }
    } else {
        switch (choice2) {
            case "Rock":
                return lose;
                break
            case "Paper":
                return win;
                break
            case "Scissors":
                return draw;
                break
        }
    }
}

/*Plays a finite number of games and determines the winner*/
function play(numberOfRounds) {
    let scoreUser = 0;
    let scoreComputer = 0;

    for (let i = 0; i < numberOfRounds; i++) {
        let roundResult = playRound(userPlays(), computerPlays());
        console.log(roundResult);
        if (roundResult[4] == 'w') {
            scoreUser++
        } else if (roundResult[4] == 'l') {
            scoreComputer++
        }
        console.log(`The score User ${scoreUser} : ${scoreComputer} Computer.`);
    }

    if (scoreUser > scoreComputer) {
        console.log("The User is the winner.");
    } else if (scoreUser < scoreComputer) {
        console.log("The Computer is the winner.");
    } else {
        console.log("It\'s a draw.")
    }
}

play(3);