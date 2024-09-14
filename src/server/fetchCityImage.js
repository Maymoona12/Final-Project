const axios = require("axios"); // Importing axios for making HTTP requests

// Function to fetch a city image from the Pixabay API
const fetchCityImage = async (cityName, apiKey) => {
  // Making an HTTP GET request to the Pixabay API using the city name and API key
  const { data } = await axios.get(
    `https://pixabay.com/api/?key=${apiKey}&q=${cityName}&image_type=photo`
  );

  // Check if any images are returned, if yes, use the first one, otherwise provide a default image
  const image = data.hits[0]
    ? data.hits[0].webformatURL // If the API returns images, use the URL of the first image
    : "https://source.unsplash.com/random/640x480?city"; // Fallback to a random city image from Unsplash if no results are found

  return { image }; // Return the image URL as an object
};

module.exports = { fetchCityImage }; // Exporting the function for use in other parts of the application

