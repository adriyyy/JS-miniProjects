const apiKey = `f6a71c235b85ac00f5da57c9d82a1709`;
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

weatherForm.addEventListener("submit", async event =>
{
    event.preventDefault();
    const city = cityInput.value;
    if(city)
    {
        try
        {
            const weatherData = await getWeatherData(city);
            displayData(weatherData);
        }
        catch(error)
        {
            console.error(error);
            errorDisplay(error);
        }
    }
    else
    {
        const error = `Please enter a city`;
        errorDisplay(error)
    }
}
)

async function getWeatherData(city)
{
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if(!response.ok)
    {
        throw new Error(`Please enter a valid city`);
    }
    return await response.json();
    
}

function displayData(weatherData)
{
    console.log(weatherData);
    const { name: city, 
            main:{temp, humidity}, 
            weather:[{description, id}] } = weatherData;
    
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const emojiDisplay = document.createElement("p");

    card.textContent ="";
    card.style.display = "flex";

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp-273.16).toFixed(1)} °C`;
    humidityDisplay.textContent = `humidity: ${humidity}%`;
    descDisplay.textContent = description;
    emojiDisplay.textContent = getEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    emojiDisplay.classList.add("emojiDisplay");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(emojiDisplay);
}

function getEmoji(id)
{
    switch(true)
    {
        case (id >= 200 && id < 300):
            return `⛈️`;
        case (id >= 300 && id < 400):
            return `🌧️`;
        case (id >= 500 && id < 600):
            return `🌧️`;
        case (id >= 600 && id < 700):
            return `❄️`;
        case (id >= 700 && id < 800):
            return `☁️`;
        case (id === 800):
            return `☀️`;
        case (id >= 800 && id < 900):
            return `⛅`;
    }
}

function errorDisplay(message)
{
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    card.style.display = "flex";
    card.textContent = "";
    card.appendChild(errorDisplay);
}