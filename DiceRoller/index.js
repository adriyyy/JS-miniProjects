const diceResult = document.getElementById("diceResult");
const diceImages = document.getElementById("diceImages");

function diceRoller()
{
    const nrOfDices = Number(document.getElementById("nrOfDices").value);
    const dices = [];
    const images = [];
    for(i = 0; i < nrOfDices; i++)
    {
        dices[i] = Math.floor(Math.random()*6) + 1;
        images[i] = `<img src="dice_images/dice${dices[i]}.png" alt="dice ${dices[i]}">`;

    }
    diceResult.textContent = `dice: ${dices.join(", ")}`; 
    diceImages.innerHTML = images.join("");
}  

