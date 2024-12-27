const images = document.querySelectorAll(".container img");
let index = 0;
let intervalId;

initializer();

function initializer()
{
    showSlide();
    slidesInterval();
}

function slidesInterval()
{
    if(intervalId) clearInterval(intervalId);
    intervalId = setInterval(next, 5000);
}

function showSlide()
{
    if(index === images.length) index = 0;
    else if(index < 0) index = images.length - 1; 
    images.forEach((img, i) =>
    {
        img.classList.toggle("displaySlide", i === index);
    }
    )
}

function next()
{
    index++;
    showSlide();
    slidesInterval();
}

function previous()
{
    index--;
    showSlide();
    clearInterval(intervalId);
}