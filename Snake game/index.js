const restartBtn = document.querySelector("#restartBtn");
const scoreText = document.querySelector("#scoreText");
const gameBoard = document.querySelector("canvas");
const c = gameBoard.getContext("2d");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const unitSize = 25;
const snakeColor = "bisque";
const snakeContour = "black";
const foodColor = "red";
const boardColor = "white";
const textColor = "black";
let running = false;
let xVelocity = unitSize;
let intervalId;
let yVelocity = 0;
let time = 100;
let score = 0;
let snake = 
[
    {x: unitSize * 4, y: 0},
    {x: unitSize * 3, y: 0},
    {x: unitSize * 2, y: 0},
    {x: unitSize, y: 0},
    {x: 0, y: 0},
];
const food =
{
    x: undefined,
    y: undefined
}
let head =
{
    x: snake[0].x,
    y: snake[0].y
}

window.addEventListener("keydown", changeDirection);
restartBtn.addEventListener("click", restartGame);

startGame();

function startGame()
{
    running = true;
    generateFood();
    drawFood();
    drawSnake();
    animation();
}

function drawFood()
{
    c.fillStyle = foodColor;
    c.fillRect(food.x, food.y, unitSize, unitSize);
}

function generateFood() {
    let validPosition = false;
    while (!validPosition) {
        food.x = Math.floor(Math.random() * (gameWidth - unitSize) / unitSize) * unitSize;
        food.y = Math.floor(Math.random() * (gameHeight - unitSize) / unitSize) * unitSize;
        // Verifică dacă hrana se suprapune cu corpul șarpelui
        validPosition = !snake.some(segment => segment.x === food.x && segment.y === food.y);
    }
}

function animation()
{
    if(running)
    {
        intervalId = setTimeout(() => {
                            clearBoard();
                            moveSnake();
                            drawSnake();
                            drawFood();
                            checkGameOver();
                            animation();
                        }, time);
    }
    else
    {
        displayGameOver();
    }
}

function clearBoard()
{
    c.fillStyle = boardColor;
    c.fillRect(0, 0, gameWidth, gameHeight);
}

function drawSnake()
{
    c.fillStyle = snakeColor;
    c.strokeStyle = snakeContour;
    c.lineWidth = 2;
    snake.forEach(square =>
    {
        c.fillRect(square.x, square.y, unitSize, unitSize);
        c.strokeRect(square.x, square.y, unitSize, unitSize);
    }
    )
}

function moveSnake()
{
    head = 
    {
        x: snake[0].x + xVelocity,
        y: snake[0].y + yVelocity 
    }
    snake.unshift(head);
    if(head.x == food.x && head.y == food.y)
    {
        generateFood();
        score++;
        scoreText.textContent = score;
        time -= 2;
    }
    else snake.pop();
}

function changeDirection(event)
{
    if(running)
    {
        const goingUp = (yVelocity == -unitSize);
        const goingDown = (yVelocity == unitSize);
        const goingRight = (xVelocity == unitSize);
        const goingLeft = (xVelocity == -unitSize);
    
        switch(true)
        {
            case (event.key == "ArrowDown" && !goingUp):
                xVelocity = 0;
                yVelocity = unitSize;
                drawSnake();
                break;
            case (event.key == "ArrowUp" && !goingDown):
                xVelocity = 0;
                yVelocity = -unitSize;
                drawSnake();
                break;
            case (event.key == "ArrowRight" && !goingLeft):
                xVelocity = unitSize;
                yVelocity = 0;
                drawSnake();
                break;
            case (event.key == "ArrowLeft" && !goingRight):
                xVelocity = -unitSize;
                yVelocity = 0;
                drawSnake();
                break;
        }   
    }
}

function checkGameOver()
{
    switch(true)
    {
        case (snake[0].x >= gameWidth): 
            running = false;
            break;
        case (snake[0].y >= gameHeight): 
            running = false;
            break;
        case (snake[0].x < 0): 
            running = false;
            break;
        case (snake[0].y < 0): 
            running = false;
            break;
    }

    for(i = 1; i < snake.length; i++)
    {
        if(snake[0].x == snake[i]. x && snake[0].y == snake[i].y) running = false;
    }
}

function displayGameOver()
{
    c.fillStyle = textColor;
    c.textAlign = 'center';
    c.font = '50px Bangers, Arial';
    c.fillText('Game over!', gameWidth / 2, gameHeight / 2);
}

function restartGame()
{
    clearBoard();
    running = false;
    xVelocity = unitSize;
    yVelocity = 0;
    score = 0;
    time = 100;
    clearInterval(intervalId);
    scoreText.textContent = score;
    snake = 
    [
        {x: unitSize * 4, y: 0},
        {x: unitSize * 3, y: 0},
        {x: unitSize * 2, y: 0},
        {x: unitSize, y: 0},
        {x: 0, y: 0},
    ];
    startGame();
}