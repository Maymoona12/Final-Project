const axios = require("axios");

const fetchCityImage = async (cityName, apiKey) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?key=${apiKey}&q=${cityName}&image_type=photo`
  );

  const image = data.hits[0]
    ? data.hits[0].webformatURL
    : "https://source.unsplash.com/random/640x480?city";
  return { image };
};

module.exports = { fetchCityImage };
