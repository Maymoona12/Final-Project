const axios = require("axios");

const fetchWeatherData = async (lat, lng, remainingDays, apiKey) => {
  if (!remainingDays) {
    return {
      message: "Please enter a valid date.",
      error: true,
    };
  }
  if (remainingDays < 0) {
    return {
      message: "Date cannot be in the past.",
      error: true,
    };
  }
  if (remainingDays > 0 && remainingDays <= 7) {
    const { data } = await axios.get(
      `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&units=M&key=${apiKey}`
    );
    const { weather, temp } = data.data[0];
    return { description: weather.description, temp };
  } else if (remainingDays > 7) {
    const { data } = await axios.get(
      `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&units=M&days=${remainingDays}&key=${apiKey}`
    );
    const { weather, temp, app_max_temp, app_min_temp } = data.data[data.data.length - 1];
    return { description: weather.description, temp, app_max_temp, app_min_temp };
  }
};

module.exports = { fetchWeatherData };
