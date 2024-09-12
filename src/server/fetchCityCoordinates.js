const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

async function fetchCityCoordinates(city) {
  try {
    const response = await axios.get(`https://secure.geonames.org/searchJSON`, {
      params: {
        q: city,
        maxRows: 1,
        username: process.env.GEONAMES_USERNAME,
      },
    });

    const locationData = response.data.geonames;

    if (!locationData || locationData.length === 0) {
      return {
        message: "City not found. Please check your spelling.",
        error: true,
      };
    }

    const { name, lat, lng } = locationData[0];
    return { name, lat, lng };
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized: Please verify your GeoNames username.");
    } else {
      console.error("Error fetching city coordinates:", error.message);
    }
    return {
      message: "Failed to fetch city coordinates.",
      error: true,
    };
  }
}

module.exports = { fetchCityCoordinates };
