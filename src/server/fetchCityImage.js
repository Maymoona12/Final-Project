const axios = require("axios");

const fetchCityImage = async (cityName, apiKey) => {
  try {
    // Fetch the image from the Pixabay API
    const { data } = await axios.get(
      `https://pixabay.com/api/?key=${apiKey}&q=${cityName}&image_type=photo`
    );

    // If no image is found, use a default random city image
    const image = data.hits[0]
      ? data.hits[0].webformatURL
      : "https://source.unsplash.com/random/640x480?city";

    return { image };
  } catch (error) {
    console.error("Error fetching city image:", error.message); // Log any errors for debugging
    return {
      message: "Failed to fetch city image.",
      error: true,
    };
  }
};

module.exports = { fetchCityImage };
