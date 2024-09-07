import axios from "axios";

// Select form and input elements
const form = document.querySelector("form");
const cityInp = document.querySelector("#city");
const dateInp = document.querySelector("#flightDate");

// Select error message elements
const city_error = document.querySelector("#city_error");
const date_error = document.querySelector("#date_error");

// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  // Check if the function is working fine
  console.log("I am working fine");

  // Validate form inputs before calling the APIs
  if (!validate_inputs()) {
    return;
  }

  // Get the location first and make sure the call is successful
  const Location = await getCityLoc();

  // Handle failing call to location
  if (Location && Location.error) {
    city_error.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i>${Location.message}`;
    city_error.style.display = "block";
    return;
  } else if (Location && !Location.error) {
    // Extract longitude, latitude, and name
    const { lng, lat, name } = Location;

    // Get the date of the flight
    const date = dateInp.value;

    // Check if the user didn't input the date
    if (!date) {
      console.log("Please enter the date");
      date_error.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i>Please enter the date`;
      date_error.style.display = "block";
      return;
    }

    // Proceed if longitude and latitude are available
    if (lng && lat) {
      // Calculate remaining days before the flight
      const remainingDays = getRdays(date);

      // Get the weather data
      const weather = await getWeather(lng, lat, remainingDays);
      if (weather && weather.error) {
        date_error.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i>${weather.message}`;
        date_error.style.display = "block";
        return;
      }

      // Get the picture of the city
      const pic = await getCityPic(name);

      // Update the UI with the retrieved data
      updateUI(remainingDays, name, pic, weather);
    }
  }
};

// Validate form inputs
const validate_inputs = () => {
  city_error.style.display = "none";
  date_error.style.display = "none";

  if (!cityInp.value) {
    city_error.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i>You need to enter the city`;
    city_error.style.display = "block";
    return false;
  }

  if (!dateInp.value) {
    date_error.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i>Please enter the date`;
    date_error.style.display = "block";
    return false;
  }

  if (getRdays(dateInp.value) < 0) {
    date_error.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i>Date cannot be in the past`;
    date_error.style.display = "block";
    return false;
  }

  city_error.style.display = "none";
  date_error.style.display = "none";

  return true;
};

// Get city location
const getCityLoc = async () => {
  if (cityInp.value) {
    try {
      // Serialize the form data
      const formData = new FormData(form);

      // Convert FormData to a plain object
      const formObj = {};
      formData.forEach((value, key) => {
        formObj[key] = value;
      });

      // Send the request with the serialized form data
      const { data } = await axios.post("http://localhost:8000/getCity", formObj, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return data;
    } catch (error) {
      city_error.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i>Failed to fetch city data. Please try again later.`;
      city_error.style.display = "block";
      console.error("Error fetching city data:", error);
      return null;
    }
  } else {
    city_error.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i>This field cannot be left empty`;
    city_error.style.display = "block";
    return null;
  }
};

// Get weather data
const getWeather = async (lng, lat, remainingDays) => {
  const { data } = await axios.post("http://localhost:8000/getWeather", {
    lng,
    lat,
    remainingDays,
  });

  return data;
};

// Calculate remaining days
const getRdays = (date) => {
  const startDate = new Date();
  const endDate = new Date(date);
  const timeDiff = endDate.getTime() - startDate.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysDiff;
};

// Get city picture from Pixabay
const getCityPic = async (city_name) => {
  const { data } = await axios.post("http://localhost:8000/getCityPic", {
    city_name,
  });
  const { image } = data;
  return image;
};

// Update the UI with retrieved data
const updateUI = (Rdays, city, pic, weather) => {
  document.querySelector("#Rdays").innerHTML = `
    Your trip starts in ${Rdays} days from now
  `;
  document.querySelector(".cityName").innerHTML = `Location: ${city}`;
  document.querySelector(".weather").innerHTML =
    Rdays > 7
      ? `Weather is: ${weather.description}`
      : `Weather is expected to be: ${weather.description}`;
  document.querySelector(".temp").innerHTML =
    Rdays > 7
      ? `Forecast: ${weather.temp}&degC`
      : `Temperature: ${weather.temp} &degC`;
  document.querySelector(".max-temp").innerHTML =
    Rdays > 7 ? `Max-Temp: ${weather.app_max_temp}&degC` : "";
  document.querySelector(".min-temp").innerHTML =
    Rdays > 7 ? `Min-Temp: ${weather.app_min_temp}&degC` : "";
  document.querySelector(".cityPic").innerHTML = `
    <img 
      src="${pic}" 
      alt="an image that describes the city nature"
    >
  `;
  document.querySelector(".flight_data").style.display = "block";
};

export { handleSubmit };
