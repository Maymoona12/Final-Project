const axios = require("axios"); // Importing axios for making HTTP requests

// Function to fetch weather data based on latitude, longitude, remaining days, and API key
const fetchWeatherData = async (lat, lng, remainingDays, apiKey) => {
  // Check if remainingDays is provided
  if (!remainingDays) {
    return {
      message: "Please enter a valid date.", // Return an error message if no date is provided
      error: true,
    };
  }
  
  // Check if the date is in the past
  if (remainingDays < 0) {
    return {
      message: "Date cannot be in the past.", // Return an error message if the date is in the past
      error: true,
    };
  }

  // If the trip is within the next 7 days, fetch the current weather
  if (remainingDays > 0 && remainingDays <= 7) {
    const { data } = await axios.get(
      `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&units=M&key=${apiKey}` // Weather API call for current weather data
    );
    const { weather, temp } = data.data[0]; // Destructure the response to get weather description and temperature
    return { description: weather.description, temp }; // Return the current weather description and temperature
  } 
  // If the trip is more than 7 days away, fetch the weather forecast for the trip date
  else if (remainingDays > 7) {
    const { data } = await axios.get(
      `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&units=M&days=${remainingDays}&key=${apiKey}` // Weather API call for forecast data
    );
    // Get the forecast for the last day (the day of the trip)
    const { weather, temp, app_max_temp, app_min_temp } = data.data[data.data.length - 1];
    // Return the forecast weather description, current temperature, and apparent max and min temperatures
    return { description: weather.description, temp, app_max_temp, app_min_temp };
  }
};

module.exports = { fetchWeatherData }; // Exporting the function for use in other parts of the application
