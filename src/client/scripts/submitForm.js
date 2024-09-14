import axios from "axios";
import { calculateRemainingDays } from "./calculateRemainingDays";
import { checkInputValidity } from "./checkInputValidity";

const cityErrorElement = document.querySelector("#city-error");
const cityInputElement = document.querySelector("#city");
const dateErrorElement = document.querySelector("#date-error");
const departureDateInput = document.querySelector("#date");
const JourneyDataElement = document.getElementById('Journey-data'); // Select the Journey-data section

// Handle form submission
const handleFormSubmission = async (event) => {
  event.preventDefault();

  if (!checkInputValidity()) {
    return;
  }

  try {
    const city = cityInputElement.value;
    const location = await fetchCityData(city);

    if (location.error) {
      cityErrorElement.textContent = location.message;
      cityErrorElement.style.display = "block";
      return;
    }

    cityErrorElement.style.display = "none";
    const { name, longitude, latitude } = location;

    if (departureDateInput) {
      const departureDate = departureDateInput.value;
      const daysRemaining = calculateRemainingDays(departureDate);
      const weatherData = await fetchWeatherData(longitude, latitude, daysRemaining);

      if (weatherData.error) {
        dateErrorElement.textContent = weatherData.message;
        dateErrorElement.style.display = "block";
        return;
      }

      dateErrorElement.style.display = "none";
      const imageData = await fetchCityImage(name);

      updateDisplay(daysRemaining, name, imageData, weatherData);

      // Show the #Journey-data section after the data is successfully fetched
      JourneyDataElement.style.display = 'block';
    } else {
      console.error("Departure date input is missing.");
    }
  } catch (error) {
    console.error("Error in handleFormSubmission:", error.message);
  }
};

// Fetch city data
const fetchCityData = async (cityName) => {
  try {
    const { data } = await axios.post("http://localhost:8000/getCity", { city: cityName });
    return data;
  } catch (error) {
    console.error("Error fetching city data:", error);
    return { message: "Error retrieving city data", error: true };
  }
};

// Fetch weather data
const fetchWeatherData = async (lng, lat, daysRemaining) => {
  try {
    const { data } = await axios.post("http://localhost:8000/getWeather", { lat, lng, daysRemaining });
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return {};
  }
};

// Fetch city image
const fetchCityImage = async (cityName) => {
  try {
    const { data } = await axios.post("http://localhost:8000/getImage", { cityName });
    return data;
  } catch (error) {
    console.error("Error fetching city image:", error);
    return {};
  }
};

// Update the display with fetched data
const updateDisplay = (daysRemaining, cityName, imageData, weatherData) => {
  document.querySelector("#Journey-duration").innerHTML = `Your journey starts in ${daysRemaining} days`;
  document.querySelector(".city-name").innerHTML = `City: ${cityName}`;

  document.querySelector(".weather-info").innerHTML =
    daysRemaining > 7
      ? `Current weather: ${weatherData.description}`
      : `Expected weather: ${weatherData.description}`;

  document.querySelector(".temperature").innerHTML =
    daysRemaining > 7
      ? `Forecast temperature: ${weatherData.temp}&degC`
      : `Temperature: ${weatherData.temp} &degC`;

  document.querySelector(".max-temp").innerHTML =
    daysRemaining > 7 ? `Max Temperature: ${weatherData.app_max_temp}&degC` : "";
  document.querySelector(".min-temp").innerHTML =
    daysRemaining > 7 ? `Min Temperature: ${weatherData.app_min_temp}&degC` : "";

  if (imageData && imageData.image) {
    document.querySelector(".city-image").src = imageData.image;
  } else {
    document.querySelector(".city-image").alt = "Image not available.";
  }
};

document.querySelector('form').addEventListener('submit', handleFormSubmission);

export { handleFormSubmission };
