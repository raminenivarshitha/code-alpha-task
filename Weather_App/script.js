const apiKey = "YOUR_API_KEY";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const loading = document.getElementById("loading");
const error = document.getElementById("error");
const weather = document.getElementById("weather");

const city = document.getElementById("city");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const weatherIcon = document.getElementById("weatherIcon");

async function getWeather(cityName) {

    if(cityName.trim() === ""){
        alert("Please enter a city name.");
        return;
    }

    loading.style.display = "block";
    weather.style.display = "none";
    error.style.display = "none";

    try{

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);

        if(!response.ok){
            throw new Error("City not found");
        }

        const data = await response.json();

        city.textContent =
            `${data.name}, ${data.sys.country}`;

        temperature.textContent =
            `${Math.round(data.main.temp)}°C`;

        description.textContent =
            data.weather[0].description;

        feelsLike.textContent =
            `${Math.round(data.main.feels_like)}°C`;

        humidity.textContent =
            `${data.main.humidity}%`;

        wind.textContent =
            `${data.wind.speed} m/s`;

        pressure.textContent =
            `${data.main.pressure} hPa`;

        weatherIcon.src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

        weatherIcon.alt =
            data.weather[0].main;

        sunrise.textContent =
            new Date(data.sys.sunrise * 1000)
            .toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            });

        sunset.textContent =
            new Date(data.sys.sunset * 1000)
            .toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            });

        // Dynamic Background

        const main = data.weather[0].main;

        switch(main){

            case "Clear":
                document.body.style.background =
                    "linear-gradient(135deg,#56CCF2,#2F80ED)";
                break;

            case "Clouds":
                document.body.style.background =
                    "linear-gradient(135deg,#757F9A,#D7DDE8)";
                break;

            case "Rain":
            case "Drizzle":
                document.body.style.background =
                    "linear-gradient(135deg,#4B79A1,#283E51)";
                break;

            case "Thunderstorm":
                document.body.style.background =
                    "linear-gradient(135deg,#232526,#414345)";
                break;

            case "Snow":
                document.body.style.background =
                    "linear-gradient(135deg,#E6DADA,#274046)";
                break;

            default:
                document.body.style.background =
                    "linear-gradient(135deg,#4facfe,#00f2fe)";
        }

        weather.style.display = "block";

    }
    catch(err){

        error.style.display = "block";

    }
    finally{

        loading.style.display = "none";

    }

}

searchBtn.addEventListener("click", () => {

    getWeather(cityInput.value);

});

cityInput.addEventListener("keypress", (e) => {

    if(e.key === "Enter"){

        getWeather(cityInput.value);

    }

});

// Default City
getWeather("London");