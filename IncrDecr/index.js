const IncreaseBtn = document.getElementById("IncreaseBtn");
const ResetBtn = document.getElementById("ResetBtn");
const DecreaseBtn = document.getElementById("DecreaseBtn");
const CountLabel = document.getElementById("CountLabel");

let count = 0;

IncreaseBtn.onclick = function()
{
    count++;
    CountLabel.textContent = count;
}

ResetBtn.onclick = function()
{
    count = 0;
    CountLabel.textContent = count;
}

DecreaseBtn.onclick = function()
{
    count--;
    CountLabel.textContent = count;
}