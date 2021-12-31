// Start a new game
const btnFirst = document.querySelector('#start');
btnFirst.addEventListener('click', setup);

let scoreUser = 0;
let scoreComputer = 0;

// Setup the game 
function setup () {
    const btnStart = document.querySelector('#start');
    btnStart.parentElement.removeChild(btnStart);
    const headerStart = document.querySelector('h1');
    headerStart.parentElement.removeChild(headerStart);
    const scoreboardScore = document.createElement('h1');
    scoreboardScore.classList.add('score');
    scoreboardScore.textContent = ` User ${scoreUser} : ${scoreComputer} Computer`;
    const buttons = document.createElement('div');
    buttons.classList.add('buttons');

    // Create the buttons for the user to choose from
    const possibleUserChoices = ['Rock', 'Paper', 'Scissors'];
    possibleUserChoices.forEach (choice => {
        const i = document.createElement('button');
        i.textContent = `${choice}`;
        i.classList.add('userClick');
        buttons.appendChild(i);
    });

    // Create a placeholder for the result string
    const resultString = document.createElement('div');
    resultString.classList.add('resultString');

    // Append the children to the parent container
    const container = document.querySelector('.container');
    container.appendChild(scoreboardScore);
    container.appendChild(buttons);
    container.appendChild(resultString);

    // Start the Game
    startTheGame();
};

// Start the game 
function startTheGame () {
    let roundsPlayed = 0;

    const btn = document.querySelectorAll('.userClick');
    btn.forEach (choice => {
        choice.addEventListener('click', function(e) {
            const choice1 = userPlays(e);
            const choice2 = computerPlays();
            const roundResult = compareChoices(choice1, choice2); //returns array with -1/0/1 for l/d/w and result string why the result is like it is
            const newScore = updateScore(roundResult[0], scoreUser, scoreComputer); // old- returns array of newScoreUser and newScoreComputer
            changeScoreboard(newScore[0], newScore[1], roundResult[1]);
            const isGameOver = checkIfGameOver(roundsPlayed); // returns true or false
            if (isGameOver) {
                changeLayoutToResultButton();
            } else {
                oldScoreUser = newScore[0];
                oldScoreComputer = newScore[1];
                roundsPlayed++
            };
        });
    });
};


/*The user clicks rock, paper or scissors*/
function userPlays(e) {
    let userChoice = e.target.textContent;
    return userChoice;
};


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
    };
};


/*Plays one round of Rock, Paper, Scissors*/
function compareChoices(choice1, choice2) {
    const win = [1, `You win! ${choice1} beats ${choice2}.`];
    const lose = [-1, `You lose! ${choice2} beats ${choice1}.`];
    const draw = [0, `It's a draw! ${choice1} is the same as ${choice2}.`];

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
};

/*Plays a finite number of games and determines the winner*/
function updateScore(roundResult, oldScoreUser, oldScoreComputer) {

    switch (roundResult) {
        case -1:
            scoreUser = oldScoreUser;
            scoreComputer = oldScoreComputer + 1;
            break
        case 0:
            scoreUser = oldScoreUser;
            scoreComputer = oldScoreComputer;
            break
        case 1:
            scoreUser = oldScoreUser + 1;
            scoreComputer = oldScoreComputer;
            break
    };

    return [scoreUser, scoreComputer]; 
};

// Change the score & show the result of the round
function changeScoreboard (newScoreUser, newScoreComputer, resultString) {
    const score = document.querySelector('.score');
    score.textContent = `User ${newScoreUser} : ${newScoreComputer} Computer`;

    const placeholderResultString = document.querySelector('.resultString');
    placeholderResultString.textContent = `${resultString}`;
};

// Check if Game is over
function checkIfGameOver (roundsPlayed) {
    if (roundsPlayed == 4) {
        return true;
    } else {
        return false;
    };
};

// Change layout to result button
function changeLayoutToResultButton () {
    // remove the buttons
    const btns = document.querySelectorAll('.userClick');
    const buttons = document.querySelector('.buttons');
    btns.forEach (item => {
        buttons.removeChild(item);
    });
    // Add a show result button
    const buttonShowResult = document.createElement('button');
    buttonShowResult.textContent = 'Show Result';
    buttonShowResult.classList.add('buttonResult');
    buttons.appendChild(buttonShowResult);
    // On Click write who the winner is and change the writing on the button to new game
    const showResult = document.querySelector('.buttonResult');
    showResult.addEventListener('click', showTheResult);
};

// Show the result
function showTheResult () {
    const win = `You win! Congratulations!`;
    const draw = 'It\'s a draw! Do you want to give it another try?';
    const lose = 'You lose! Please try again.';

    const resultLine = document.querySelector('.resultString');
    resultLine.classList.add('result');
    const actualScore = document.querySelector('.score').textContent;
    let finalScoreUser = scoreUser; 
    let finalScoreComputer = scoreComputer; 
    
    if (finalScoreUser > finalScoreComputer) {
        resultLine.textContent = win;
    } else if (finalScoreUser < finalScoreComputer) {
        resultLine.textContent = lose;
    } else {
        resultLine.textContent = draw;
    };
    
    const btn = document.querySelector('.buttonResult');
    btn.removeEventListener('click', showTheResult);
    btn.textContent = 'New Game';
    btn.addEventListener('click', startNewGame);
}

// Prepare everything, so that the setup-method can work properly
function startNewGame () {
    const container = document.querySelector('.container');
    //remove all the elements
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    };
    //add the starter elements so that the setup-method can work properly
    const header = document.createElement('h1');
    header.textContent = 'Rock, Paper, Scissors - Best of 5';
    container.appendChild(header);
    const buttonStart = document.createElement('button');
    buttonStart.setAttribute('id', 'start');
    container.appendChild(buttonStart);

    //run the setup for the new round
    scoreUser = 0;
    scoreComputer = 0;
    setup();
};