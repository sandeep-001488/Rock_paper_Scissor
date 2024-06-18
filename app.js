let userScore = 0;
let compScore = 0;
let sumOfBothScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () => {
    const options = ["rock", "paper", "scissor"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const drawGame = () => {
    msg.innerText = "Match is drawn! Doesn't matter, try once more";
    msg.style.backgroundColor = "#081b31";
    msg.style.marginLeft = '-200px';
};

const disableChoices = () => {
    choices.forEach(choice => {
        choice.style.pointerEvents = "none";
    });
};

const enableChoices = () => {
    choices.forEach(choice => {
        choice.style.pointerEvents = "auto";
    });
};

const resetGame = () => {
    userScore = 0;
    compScore = 0;
    sumOfBothScore = 0;
    userScorePara.innerText = userScore;
    compScorePara.innerText = compScore;
    msg.innerText = "";
    msg.style.backgroundColor = "";
    msg.style.marginLeft = '';
    enableChoices();
    const restartBtn = document.querySelector("#restart-btn");
    if (restartBtn) {
        restartBtn.remove();
    }
};

const finalWinner = () => {
    if (sumOfBothScore >= 11) {
        if (userScore > compScore) {
            msg.innerText = `Hurray!! Finally you won the match by ${userScore - compScore} points`;
            msg.style.backgroundColor = "green";
            msg.style.marginLeft = '-200px';
        } else {
            msg.innerText = `Ohh!! Try again... You lost the match by ${compScore - userScore}`;
            msg.style.backgroundColor = "red";
            msg.style.marginLeft = '-200px';
        }
        disableChoices();
        createRestartButton();
        return;
    }
};

const showWinner = (userWin, userChoice, compChoice) => {
    if (sumOfBothScore >= 11) {
        finalWinner();
        return;
    }
    if (userWin) {
        userScore++;
        sumOfBothScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `Congratulations!!! You won this chance -> ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
        msg.style.marginLeft = '-250px';
    } else {
        compScore++;
        sumOfBothScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `Oooopppsss!! You lost this chance, where -> ${compChoice} beats ${userChoice}`;
        msg.style.backgroundColor = "red";
        msg.style.marginLeft = '-250px';
    }
};

const playGame = (userChoice) => {
    const compChoice = genCompChoice();
    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = compChoice === "scissor" ? false : true;
        } else {
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
};

const createRestartButton = () => {
    const restartBtn = document.createElement("button");
    restartBtn.id = "restart-btn";
    restartBtn.innerText = "Restart Game";
    restartBtn.style.marginTop = "20px";
    restartBtn.style.fontWeight = "500";
    restartBtn.style.marginLeft = "670px";
    restartBtn.style.backgroundColor = " #081b31";
    restartBtn.style.color = "white";
    restartBtn.classList.add("large-button");
    restartBtn.classList.add("animate-button");

    restartBtn.addEventListener("click", resetGame);
    document.body.appendChild(restartBtn);
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});
