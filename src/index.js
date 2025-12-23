import "../style.css";
import weatherIcons, { getWeatherIcon } from "./data.js";

// Add console logs for debugging
console.log("Weather app initialized");
console.log("Weather icons loaded:", weatherIcons);

// Move displayError function before fetchWeather
function displayError(message) {
  const weatherContainer = document.getElementById("weather-container");
  weatherContainer.innerHTML = `
    <div class="error-message">
      <h3>Oops! Something went wrong</h3>
      <p>${message}</p>
      <button id="retry-button">Try Again</button>
    </div>
  `;

  document.getElementById("retry-button").addEventListener("click", () => {
    const city = document.getElementById("city-search").value.trim();
    if (city) fetchWeather(city);
  });
}

async function fetchWeather(city) {
  console.log(`Fetching weather for ${city}`);
  const api_key = "SCQWQ3WCJ4JC3BL2X9ZRG6V86";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${api_key}&contentType=json`;

  try {
    const request = await fetch(url);

    if (!request.ok) {
      throw new Error(`HTTP error! status: ${request.status}`);
    }

    const response = await request.json();
    console.log("Weather data received:", response);
    displayWeather(response);
  } catch (error) {
    console.error("Failed to fetch weather:", error);
    displayError(error.message);
  }
}

function displayWeather(data) {
  // Get DOM elements
  const weatherContainer = document.getElementById("weather-container");
  const searchInput = document.getElementById("city-search");
  const searchButton = document.getElementById("search-button");

  // Clear previous weather data
  weatherContainer.innerHTML = "";

  // Create current weather section
  const currentSection = document.createElement("div");
  currentSection.className = "current-weather";

  const currentTemp = Math.round(data.currentConditions.temp);
  const iconPath = getWeatherIcon(data.currentConditions.conditions);
  const iconElement = document.createElement("img");
  iconElement.src = iconPath;
  iconElement.alt = data.currentConditions.conditions;
  iconElement.className = "weather-icon";

  const locationElement = document.createElement("h2");
  locationElement.className = "location";
  locationElement.textContent = data.resolvedAddress;

  const tempElement = document.createElement("div");
  tempElement.className = "temperature";
  tempElement.textContent = `${currentTemp}°C`;

  const conditionsElement = document.createElement("div");
  conditionsElement.className = "conditions";
  conditionsElement.textContent = data.currentConditions.conditions;

  currentSection.appendChild(locationElement);
  currentSection.appendChild(iconElement);
  currentSection.appendChild(tempElement);
  currentSection.appendChild(conditionsElement);

  // Create forecast section
  const forecastSection = document.createElement("div");
  forecastSection.className = "forecast";

  const forecastTitle = document.createElement("h3");
  forecastTitle.textContent = "7-Day Forecast";
  forecastSection.appendChild(forecastTitle);

  const forecastGrid = document.createElement("div");
  forecastGrid.className = "forecast-grid";

  // Get next 7 days forecast
  const forecastDays = data.days.slice(1, 8);

  forecastDays.forEach((day) => {
    const dayCard = document.createElement("div");
    dayCard.className = "day-card";

    const date = new Date(day.datetime);
    const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
    const dayDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    const dayNameElement = document.createElement("div");
    dayNameElement.className = "day-name";
    dayNameElement.textContent = dayName;

    const dayDateElement = document.createElement("div");
    dayDateElement.className = "day-date";
    dayDateElement.textContent = dayDate;

    const dayIconPath = getWeatherIcon(day.conditions);
    const dayIconElement = document.createElement("img");
    dayIconElement.src = dayIconPath;
    dayIconElement.alt = day.conditions;
    dayIconElement.className = "day-icon";

    const dayTempElement = document.createElement("div");
    dayTempElement.className = "day-temp";
    dayTempElement.textContent = `${Math.round(day.temp)}°C`;

    const dayConditionsElement = document.createElement("div");
    dayConditionsElement.className = "day-conditions";
    dayConditionsElement.textContent = day.conditions;

    dayCard.appendChild(dayNameElement);
    dayCard.appendChild(dayDateElement);
    dayCard.appendChild(dayIconElement);
    dayCard.appendChild(dayTempElement);
    dayCard.appendChild(dayConditionsElement);

    forecastGrid.appendChild(dayCard);
  });

  forecastSection.appendChild(forecastGrid);

  // Add sections to container
  weatherContainer.appendChild(currentSection);
  weatherContainer.appendChild(forecastSection);
}

// Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("city-search");
  const searchButton = document.getElementById("search-button");

  // Add click event listener to search button
  searchButton.addEventListener("click", () => {
    const city = searchInput.value.trim();
    if (city) {
      console.log(`Searching for weather in ${city}`);
      fetchWeather(city);
    } else {
      console.log("Please enter a city name");
      alert("Please enter a city name");
    }
  });

  // Add keypress event listener to search input for Enter key
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const city = searchInput.value.trim();
      if (city) {
        console.log(`Searching for weather in ${city}`);
        fetchWeather(city);
      } else {
        console.log("Please enter a city name");
        alert("Please enter a city name");
      }
    }
  });

  // Load default city
  fetchWeather("New York");
});
