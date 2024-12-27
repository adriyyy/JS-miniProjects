const compRes = document.getElementById("compRes");
const playerRes = document.getElementById("playerRes");
const resultMes = document.querySelector(".resultMes");
const compPts = document.getElementById("compPts");
const playerPts = document.getElementById("playerPts");

let compScore = 0;
let playerScore = 0;
let compChoice;
const possibleChoices = [`rock`, `paper`, `scissors`];

function gameOn(playerChoice)
{
    resultMes.classList.remove("wonResult", "loseResult");
    compChoice = possibleChoices[Math.floor(Math.random() * 3)];
    playerRes.textContent = playerChoice;
    compRes.textContent = compChoice;
    console.log(compChoice);
    if(compChoice === playerChoice) resultMes.textContent = `IT'S A TIE!`;
    else 
    {
        switch(playerChoice)
        {
            case `rock`:
                resultMes.textContent = compChoice === `scissors` ? `YOU WON!` : `YOU LOST!`;
                break;
            case `paper`:
                resultMes.textContent = compChoice === `rock` ? `YOU WON!` : `YOU LOST!`;
                break;
            case `scissors`:
                resultMes.textContent = compChoice === `paper` ? `YOU WON!` : `YOU LOST!`;
                break;
        }

        switch(resultMes.textContent)
        {
            case `YOU WON!`:
                resultMes.classList.add("wonResult");
                playerScore++;
                playerPts.textContent = playerScore;
                break;
            case `YOU LOST!`:
                resultMes.classList.add("loseResult");
                compScore++;
                compPts.textContent = compScore;
                break;
        }
    }
} 