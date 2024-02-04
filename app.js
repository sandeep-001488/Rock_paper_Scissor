let userScore = 0
let compScore = 0
let sumOfBothScore=0;

const choices = document.querySelectorAll(".choice")
const msg=document.querySelector("#msg")

const userScorePara=document.querySelector("#user-score")
const compScorePara=document.querySelector("#comp-score")

const genCompChoice = () => {
    const options = ["rock", "paper", "scissor"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
}

const drawGame=()=>{
    console.log("match was drawn !")
    msg.innerText="Match is drawn !Doesn't matter, try once more"
    msg.style.backgroundColor="#081b31"
}
// const finalWinner=()=>{
//     if(sumOfBothScore>11){
//           if(userScore>compScore){
//              msg.innerText=`Hurray !!finally You won the match by ${userScore-compScore} points`;
          
//              msg.style.backgroundColor="green"
//           }
//           else{
//              msg.innerText=`ohh!! try again ...You lost the match by ${compScore-userScore}`;
             
//              msg.style.backgroundColor="red"
//           }
//     }
//     msg.innerText="ur chance is over";
//     msg.style.backgroundColor="pink"

//  }
 

const showWinner=(userWin,userChoice,compChoice)=>{
    if (sumOfBothScore >= 11) {
        if(userScore>compScore){
                         msg.innerText=`Hurray !!finally You won the match by ${userScore-compScore} points`;
                      
                         msg.style.backgroundColor="green"
                      }
                      else{
                         msg.innerText=`ohh!! try again ...You lost the match by ${compScore-userScore}`;
                         
                         msg.style.backgroundColor="red"
                      }
        return;
    }
    if(userWin){
        userScore++;
        sumOfBothScore++;
        // if(sumOfBothScore>11){
        //     finalWinner();
        // }
        userScorePara.innerText=userScore
        console.log("hurray!!! u won");
        msg.innerText=`Congratulations!!!You won this chance->${userChoice} beats ${compChoice}`
        msg.style.backgroundColor="green"
    } else{
        compScore++;
        sumOfBothScore++;
        if(sumOfBothScore>11){
            finalWinner();
        }
        compScorePara.innerText=compScore;
        console.log("u lose , try again");
        msg.innerText=`Oooopppsss !! u lost this chance, where->${compChoice} beats ${userChoice}`
        msg.style.backgroundColor="red"
    }
}


const playGame = (userChoice) => {
    console.log("user choice = ", userChoice);
    // generate computer choice
    const compChoice = genCompChoice()
    console.log("comp choice = ", compChoice)

    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = compChoice === "paper" ? false : true;
        }
        else if (userChoice === "paper") {
            userWin = compChoice === "scissor" ? false : true;
        } else {

            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin,userChoice,compChoice)
    }
}

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id")
        playGame(userChoice)
    })
})