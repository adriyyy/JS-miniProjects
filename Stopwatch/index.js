const display = document.getElementById("display");

let startTime = 0;
let elapsedTime = 0;
let intervalId;
let started = 0;

function start()
{
    if(!started)
    {
        startTime = Date.now()-elapsedTime;
        started = 1;
        intervalId = setInterval(update, 10);
    }
}

function stop()
{
    clearInterval(intervalId);
    started = 0;
}

function reset()
{
    startTime = 0;
    display.textContent = `00:00:00:00`;
    clearInterval(intervalId);
    elapsedTime = 0;
    started = 0;
}

function update()
{
    elapsedTime = Date.now() - startTime;
    let hours = Math.floor(elapsedTime / 1000 / 3600);
    let minutes = Math.floor(elapsedTime / 1000 / 60 % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let miliseconds = Math.floor(elapsedTime / 10 % 100);
    display.textContent = `${hours.toString().padStart(2,0)}:${minutes.toString().padStart(2,0)}:${seconds.toString().padStart(2,0)}:${miliseconds.toString().padStart(2,0)}`;
}