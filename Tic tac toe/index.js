const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
let computerDecide = false;
let running = false;

const winConditions = 
[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let options = ["", "", "", "", "", "", "", "", ""];

initGame();

function initGame()
{
    running = true;
    statusText.textContent = 'Your turn!';
    restartBtn.addEventListener("click", restartGame);
    cells.forEach(cell => cell.addEventListener("click", updateCell));
}

function updateCell()
{
    if(this.textContent != "" || !running || computerDecide) return;
    else 
    {
        this.textContent = 'X';
        options[this.getAttribute("cellIndex")] = 'X';
        if(!checkWinner())
        {
            statusText.textContent = `Computer's turn`;
            computerDecide = true;
            setTimeout(compChoice, 1000);
        }
        else statusText.textContent = 'You won!';
    }

}

function checkWinner()
{
    for(i = 0; i < winConditions.length; i++)
    {
        let cellA = options[winConditions[i][0]];
        let cellB = options[winConditions[i][1]];
        let cellC = options[winConditions[i][2]];
        if(cellA == "" || cellB == "" || cellC == "" ) continue;
        else if(cellA == cellB && cellB == cellC) 
        {
            running = false;
            return true;
        }
    }
}

function compChoice()
{
    let place = Math.floor(Math.random() * (options.length + 1));
    if(options[place] != "") compChoice();
    else
    {
        computerDecide = false;
        options[place] = 'O';
        cells[place].textContent = 'O';
        if(!checkWinner()) statusText.textContent = 'Your turn';
        else statusText.textContent = 'Computer won!'; 
    }
}

function restartGame()
{
    running = false;
    cells.forEach(cell => cell.textContent = "");
    options = ["", "", "", "", "", "", "", "", ""];
    initGame();   
}