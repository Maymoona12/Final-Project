const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const { fetchCityCoordinates } = require("./fetchCityCoordinates");
const { fetchWeatherData } = require("./fetchWeatherData");
const { fetchCityImage } = require("./fetchCityImage");

dotenv.config();
const app = express();

// Middleware configuration
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("dist"));
app.use(cors());

const weatherApiKey = process.env.WEATHER_API_KEY;
const pixabayApiKey = process.env.PIXABAY_API_KEY;

const port = 8000;

// Route definitions
app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.post("/getCity", async (req, res) => {
  const { city } = req.body;
  const locationData = await fetchCityCoordinates(city);
  res.send(locationData);
});

app.post("/getWeather", async (req, res) => {
  const { lat, lng, remainingDays } = req.body;
  const weatherInfo = await fetchWeatherData(lat, lng, remainingDays, weatherApiKey);
  res.send(weatherInfo);
});

app.post("/getImage", async (req, res) => {
  const { cityName } = req.body;
  const imageUrl = await fetchCityImage(cityName, pixabayApiKey);
  res.send(imageUrl);
});

app.listen(port, () => console.log(`Server running on port ${port}`));
