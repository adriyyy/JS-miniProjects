//declarare

const scoreText = document.querySelector("#scoreText");
const restartBtn = document.querySelector("#restartBtn");
const gameBoard = document.querySelector("canvas");
const c = gameBoard.getContext("2d");
const gameHeight = gameBoard.height;
const gameWidth = gameBoard.width;
const boardColor = "green";
const ballColor = "yellow";
const plateAColor = "lightblue";
const plateBColor = "tomato";
let intervalId;
let scoreA = 0;
let scoreB = 0;
let velocity = 1;
const plateWidth = 25;
const plateHeight = 100;
const ballRadius = 15;
const plateSpeed = 50;
const possibleDirection = [-1, 1];
const direction =
{
    x: undefined,
    y: undefined
}
let ball = 
{
    x: gameWidth / 2,
    y: gameHeight / 2
}

let plateA =
{
    x: 0,
    y: 0
}
let plateB =
{
    x: gameWidth - plateWidth,
    y: gameHeight - plateHeight
}

//event listener

document.addEventListener("keydown", movePlates);
restartBtn.addEventListener("click", restartGame);

//functii

initGame();

function initGame()
{
    generateDirection();
    drawBall();
    animate();
}

function animate()
{
    intervalId = setInterval(() => 
    {
        clearBoard();
        drawBall();
        updateBall();
        drawPlates();
        checkColission();
        checkBall();
    }, 10);
}

function clearBoard()
{
    c.fillStyle = boardColor;
    c.fillRect(0, 0, gameWidth, gameHeight);
}

function generateDirection()
{
    direction.x = possibleDirection[Math.floor(Math.random() * possibleDirection.length)];
    direction.y = possibleDirection[Math.floor(Math.random() * possibleDirection.length)];
}

function drawPlates()
{
    c.fillStyle = plateAColor;
    c.fillRect(plateA.x, plateA.y, plateWidth, plateHeight);
    c.strokeRect(plateA.x, plateA.y, plateWidth, plateHeight);
    c.fillStyle = plateBColor;
    c.fillRect(plateB.x, plateB.y, plateWidth, plateHeight);
    c.strokeRect(plateB.x, plateB.y, plateWidth, plateHeight);
}

function drawBall()
{
    c.beginPath();
    c.fillStyle = ballColor;
    c.lineWidth = 2;
    c.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2, false);
    c.fill();
    c.stroke();
}

function updateBall()
{
    ball.x += velocity * direction.x;
    ball.y += velocity * direction.y;
}

function movePlates(event)
{
    const AUp = 87;
    const ADown = 83;
    const BUp = 38;
    const BDown = 40;

    switch(true)
    {
        case (AUp == event.keyCode && plateA.y > 0):
            plateA.y += -plateSpeed;
            break;
        case (ADown == event.keyCode  && plateA.y < gameHeight - plateHeight):
            plateA.y += plateSpeed;
            break;
        case (BUp == event.keyCode && plateB.y > 0):
            plateB.y += -plateSpeed;
            break;
        case (BDown == event.keyCode  && plateB.y < gameHeight - plateHeight):
            plateB.y += plateSpeed;
            break;
    }
}

function checkColission()
{
    if(ball.x + ballRadius >= gameWidth - plateWidth)
        if(ball.y + ballRadius >= plateB.y && ball.y <= plateB.y + plateHeight)
        {
            ball.x = gameHeight - plateWidth - ballRadius; //daca mingea ramane blocata
            direction.x = -direction.x;
            velocity += 0.5;
        }
    if(ball.x - ballRadius <= plateWidth)
        if(ball.y + ballRadius >= plateA.y && ball.y <= plateA.y + plateHeight)
        {
            ball.x = plateWidth + ballRadius; //daca mingea ramane blocata
            direction.x = -direction.x;
            velocity += 1;
        }
    if(ball.y + ballRadius >= gameHeight) direction.y = - direction.y;
    if(ball.y - ballRadius <= 0) direction.y = - direction.y;
}

function checkBall()
{
    if(ball.x >= gameWidth)
    {
        scoreA += 1;
        scoreText.textContent = `${scoreA} : ${scoreB}`;
        ball.x = gameWidth / 2;
        ball.y = gameHeight / 2;
        velocity = 1;
        generateDirection();
    }
    else if(ball.x <= 0)
    {
        scoreB += 1;
        scoreText.textContent = `${scoreA} : ${scoreB}`;
        ball.x = gameWidth / 2;
        ball.y = gameHeight / 2;
        velocity = 1;
        generateDirection();
    }
}

function restartGame()
{
    scoreA = 0;
    scoreB = 0;
    scoreText.textContent = `${scoreA} : ${scoreB}`;
    clearInterval(intervalId);
    ball = 
    {
        x: gameWidth / 2,
        y: gameHeight / 2
    }
    plateA =
    {
        x: 0,
        y: 0
    }
    plateB =
    {
        x: gameWidth - plateWidth,
        y: gameHeight - plateHeight
    }
    initGame();
}