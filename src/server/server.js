const express = require("express"); // Importing Express framework to create the server
const bodyParser = require("body-parser"); // Importing body-parser to parse incoming request bodies
const cors = require("cors"); // Importing CORS to allow cross-origin requests
const dotenv = require("dotenv"); // Importing dotenv to load environment variables from a .env file

const { fetchCityCoordinates } = require("./fetchCityCoordinates"); // Importing function to fetch city coordinates
const { fetchWeatherData } = require("./fetchWeatherData"); // Importing function to fetch weather data
const { fetchCityImage } = require("./fetchCityImage"); // Importing function to fetch city images

dotenv.config(); // Load environment variables from .env file

const app = express(); // Initialize the Express application

// Middleware configuration
app.use(express.json()); // Built-in middleware to parse incoming requests with JSON payloads
app.use(bodyParser.json()); // Additional middleware to parse JSON bodies (could be redundant with express.json())
app.use(express.static("dist")); // Serve static files from the "dist" directory
app.use(cors()); // Enable CORS for all requests

// Retrieve API keys from environment variables for use in the API calls
const weatherApiKey = process.env.WEATHER_API_KEY;
const pixabayApiKey = process.env.PIXABAY_API_KEY;

const port = 8000; // Define the port for the server to listen on

// Route definitions

// Root route: Serves the index.html file when the user visits the root URL
app.get("/", (req, res) => {
  res.sendFile("index.html");
});

// POST route to get city coordinates based on city name
app.post("/getCity", async (req, res) => {
  const { city } = req.body; // Extract city name from the request body
  const locationData = await fetchCityCoordinates(city); // Fetch city coordinates using the provided function
  res.send(locationData); // Send the fetched coordinates back to the client
});

// POST route to get weather data based on latitude, longitude, and days remaining to the trip
app.post("/getWeather", async (req, res) => {
  const { lat, lng, remainingDays } = req.body; // Extract lat, lng, and remainingDays from the request body
  const weatherInfo = await fetchWeatherData(lat, lng, remainingDays, weatherApiKey); // Fetch weather data using the provided function
  res.send(weatherInfo); // Send the weather data back to the client
});

// POST route to get an image of the city based on the city name
app.post("/getImage", async (req, res) => {
  const { cityName } = req.body; // Extract city name from the request body
  const imageUrl = await fetchCityImage(cityName, pixabayApiKey); // Fetch city image using the provided function
  res.send(imageUrl); // Send the image URL back to the client
});

// Export the app instance for testing
// This allows the Express app to be imported and tested with tools like Jest and Supertest
module.exports = app;

// If the file is run directly (not imported), start the server on the defined port
if (require.main === module) {
  app.listen(port, () => console.log(`Server running on port ${port}`)); // Start the server and log the running port
}
