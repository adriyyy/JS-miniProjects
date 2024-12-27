const myDiv = document.getElementById("myDiv");
const myButton = document.getElementById("myButton");
let clicked = 0;

myButton.addEventListener("click", event =>
{
    myDiv.style.backgroundColor = "tomato";
    myDiv.textContent = "HEYYY!😠";
    clicked = 1;
}
)

myButton.addEventListener("mouseover", event =>
{
    if(!clicked)
    {
        myDiv.style.backgroundColor = "yellow";
        myDiv.textContent = "Come on😗";
    }
}
)

myButton.addEventListener("mouseleave", event =>
{
    if(!clicked)
        {    
            myDiv.style.backgroundColor = "lightgreen";
            myDiv.textContent = "Touch me🫡";

        }
    }
)