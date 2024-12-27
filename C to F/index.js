const theTemp = document.getElementById("theTemp");
const toFahrenheit = document.getElementById("toFahrenheit");
const toCelsius = document.getElementById("toCelsius");
const result = document.getElementById("result");
let temp;

function convert()
{
    if(toFahrenheit.checked)
    {
        temp =  9/5 * Number(theTemp.value) + 32;
        result.textContent = temp.toFixed(1) + `°F`;
    }
    else if(toCelsius.checked)
    {
        temp = (Number(theTemp.value) - 32) * 5/9;
        result.textContent = temp.toFixed(1) + `°C`;       
    }
    else result.textContent = `Please select a unit.`;
}