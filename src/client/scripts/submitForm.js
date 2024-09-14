import axios from "axios";
import { calculateRemainingDays } from "./calculateRemainingDays";
import { checkInputValidity } from "./checkInputValidity";

// Select DOM elements for error messages, inputs, and the Journey-data section
const cityErrorElement = document.querySelector("#city-error");
const cityInputElement = document.querySelector("#city");
const dateErrorElement = document.querySelector("#date-error");
const departureDateInput = document.querySelector("#date");
const JourneyDataElement = document.getElementById('Journey-data'); // Select the Journey-data section

/**
 * Handles form submission by validating input, fetching data, and updating the display.
 * @param {Event} event - The form submission event.
 */
const handleFormSubmission = async (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  // Check if the input data is valid
  if (!checkInputValidity()) {
    return; // Exit if input is not valid
  }

  try {
    const city = cityInputElement.value; // Get the city input value
    const location = await fetchCityData(city); // Fetch city data

    if (location.error) {
      // Display error message if city data fetch fails
      cityErrorElement.textContent = location.message;
      cityErrorElement.style.display = "block";
      return;
    }

    // Hide the city error message if successful
    cityErrorElement.style.display = "none";
    const { name, longitude, latitude } = location; // Extract city details

    if (departureDateInput) {
      const departureDate = departureDateInput.value; // Get the departure date
      const daysRemaining = calculateRemainingDays(departureDate); // Calculate remaining days
      const weatherData = await fetchWeatherData(longitude, latitude, daysRemaining); // Fetch weather data

      if (weatherData.error) {
        // Display error message if weather data fetch fails
        dateErrorElement.textContent = weatherData.message;
        dateErrorElement.style.display = "block";
        return;
      }

      // Hide the date error message if successful
      dateErrorElement.style.display = "none";
      const imageData = await fetchCityImage(name); // Fetch city image

      // Update the display with fetched data
      updateDisplay(daysRemaining, name, imageData, weatherData);

      // Show the #Journey-data section after the data is successfully fetched
      JourneyDataElement.style.display = 'block';
    } else {
      console.error("Departure date input is missing."); // Log an error if departure date is missing
    }
  } catch (error) {
    console.error("Error in handleFormSubmission:", error.message); // Log any unexpected errors
  }
};

/**
 * Fetches city data from the server.
 * @param {string} cityName - The name of the city to fetch.
 * @returns {Object} - The city data or an error message.
 */
const fetchCityData = async (cityName) => {
  try {
    const { data } = await axios.post("http://localhost:8000/getCity", { city: cityName });
    return data; // Return the city data
  } catch (error) {
    console.error("Error fetching city data:", error);
    return { message: "Error retrieving city data", error: true }; // Return an error message
  }
};

/**
 * Fetches weather data from the server.
 * @param {number} lng - The longitude of the city.
 * @param {number} lat - The latitude of the city.
 * @param {number} daysRemaining - The number of days remaining until the journey.
 * @returns {Object} - The weather data or an empty object.
 */
const fetchWeatherData = async (lng, lat, daysRemaining) => {
  try {
    const { data } = await axios.post("http://localhost:8000/getWeather", { lat, lng, daysRemaining });
    return data; // Return the weather data
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return {}; // Return an empty object in case of error
  }
};

/**
 * Fetches a city image from the server.
 * @param {string} cityName - The name of the city to fetch the image for.
 * @returns {Object} - The image data or an empty object.
 */
const fetchCityImage = async (cityName) => {
  try {
    const { data } = await axios.post("http://localhost:8000/getImage", { cityName });
    return data; // Return the image data
  } catch (error) {
    console.error("Error fetching city image:", error);
    return {}; // Return an empty object in case of error
  }
};

/**
 * Updates the display with the fetched journey data.
 * @param {number} daysRemaining - The number of days remaining until the journey.
 * @param {string} cityName - The name of the city.
 * @param {Object} imageData - The image data for the city.
 * @param {Object} weatherData - The weather data for the city.
 */
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

  // Update city image if available
  if (imageData && imageData.image) {
    document.querySelector(".city-image").src = imageData.image;
  } else {
    document.querySelector(".city-image").alt = "Image not available."; // Set alt text if image is not available
  }
};

// Add event listener to handle form submission
document.querySelector('form').addEventListener('submit', handleFormSubmission);

// Export the form submission handler for use in other modules
export { handleFormSubmission };
