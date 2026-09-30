// AgriTrack ZW - Homepage Weather Display

import { getAllProvinceWeather } from "./api.js";

const weatherContainer = document.getElementById("weather-container");
const weatherMessage = document.getElementById("weather-message");

async function displayWeather() {
    try {
        const provinceWeather = await getAllProvinceWeather();

        weatherMessage.textContent = "Current weather conditions:";

        provinceWeather.forEach(province => {
            const current = province.weather.current;

            const card = document.createElement("div");
            card.classList.add("weather-card");

            card.innerHTML = `
                <h3>${province.name}</h3>
                <p><strong>Temperature:</strong> ${current.temperature_2m} °C</p>
                <p><strong>Humidity:</strong> ${current.relative_humidity_2m}%</p>
                <p><strong>Wind Speed:</strong> ${current.wind_speed_10m} km/h</p>
                <p><strong>Weather Code:</strong> ${current.weather_code}</p>
            `;

            weatherContainer.appendChild(card);
        });

    } catch (error) {
        weatherMessage.textContent = error.message;
        weatherContainer.innerHTML = "";
    }
}

displayWeather();