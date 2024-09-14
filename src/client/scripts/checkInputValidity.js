import { calculateRemainingDays } from "./calculateRemainingDays";

// Function to validate user input for the city and departure date fields
const checkInputValidity = () => {
  const cityField = document.getElementById("city"); // Get the city input field element
  const dateField = document.getElementById("date"); // Get the date input field element
  const cityErrorElement = document.getElementById("city-error"); // Get the element to display city errors
  const dateErrorElement = document.getElementById("date-error"); // Get the element to display date errors

  // Check if the error elements exist in the DOM
  if (!cityErrorElement || !dateErrorElement) {
    console.error("Error elements are missing from the DOM");
    return false; // Stop the function if error elements are missing
  }

  // Initially hide the error messages before validation starts
  cityErrorElement.style.display = "none";
  dateErrorElement.style.display = "none";

  // Check if the city input field is empty
  if (!cityField.value) {
    cityErrorElement.textContent = "City name is required"; // Set error message for missing city name
    cityErrorElement.style.display = "block"; // Show the error message
    return false; // Return false if city input is invalid
  }

  // Check if the date input field is empty
  if (!dateField.value) {
    dateErrorElement.textContent = "Departure date is required"; // Set error message for missing date
    dateErrorElement.style.display = "block"; // Show the error message
    return false; // Return false if date input is invalid
  }

  // Check if the provided date is in the past
  if (calculateRemainingDays(dateField.value) < 0) {
    dateErrorElement.textContent = "Date cannot be in the past"; // Set error message for past date
    dateErrorElement.style.display = "block"; // Show the error message
    return false; // Return false if the date is invalid
  }

  // If both city and date inputs are valid, return true
  return true;
};

export { checkInputValidity };
