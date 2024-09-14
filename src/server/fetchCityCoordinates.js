const axios = require("axios"); // Importing axios to make HTTP requests
const dotenv = require("dotenv"); // Importing dotenv to load environment variables

dotenv.config(); // Loading environment variables from the .env file

// Function to fetch city coordinates using the GeoNames API
async function fetchCityCoordinates(city) {
  try {
    // Making an HTTP GET request to the GeoNames API
    const response = await axios.get(`https://secure.geonames.org/searchJSON`, {
      params: {
        q: city, // City name to search for
        maxRows: 1, // Limiting the result to the first match
        username: process.env.GEONAMES_USERNAME, // Passing the GeoNames username from environment variables
      },
    });

    const locationData = response.data.geonames; // Extracting the 'geonames' array from the API response

    // If no location data is found or the array is empty, return an error message
    if (!locationData || locationData.length === 0) {
      return {
        message: "City not found. Please check your spelling.",
        error: true,
      };
    }

    // Destructuring the name, latitude, and longitude from the first result in the array
    const { name, lat, lng } = locationData[0];
    return { name, lat, lng }; // Returning the city name, latitude, and longitude
  } catch (error) {
    // Handling specific cases where the API call fails due to authorization issues
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized: Please verify your GeoNames username.");
    } else {
      // Logging any other errors encountered during the request
      console.error("Error fetching city coordinates:", error.message);
    }

    // Returning a failure message if the API request fails
    return {
      message: "Failed to fetch city coordinates.",
      error: true,
    };
  }
}

module.exports = { fetchCityCoordinates }; // Exporting the function for use in other parts of the application
