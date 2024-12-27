const display = document.getElementById("display");
let previous = null;

function appendToDisplay(content)
{
    if(display.value === `Error`) clearDisplay();
    if(!((content == `.` || content == `+` || content == `-` || content == `*` || content == `/`)&&
            (previous == `.` || previous == `+` || previous == `-` || previous == `*` || previous == `/`)))
    {
        display.value += content;
        previous = content;
    }
}

function clearDisplay()
{
    display.value = "";
}

function calculate()
{
    try
    {
        display.value = eval(display.value);
        if(display.value == `Infinity`|| isNaN(display.value)) throw new Error(`Error`);
    }
    catch(error)
    {
        display.value = `Error`;
    }
}