import { calculateRemainingDays } from "./calculateRemainingDays";

const checkInputValidity = () => {
  const cityField = document.getElementById("city");
  const dateField = document.getElementById("date");
  const cityErrorElement = document.getElementById("city-error");
  const dateErrorElement = document.getElementById("date-error");

  if (!cityErrorElement || !dateErrorElement) {
    console.error("Error elements are missing from the DOM");
    return false;
  }

  cityErrorElement.style.display = "none";
  dateErrorElement.style.display = "none";

  if (!cityField.value) {
    cityErrorElement.textContent = "City name is required";
    cityErrorElement.style.display = "block";
    return false;
  }
  if (!dateField.value) {
    dateErrorElement.textContent = "Departure date is required";
    dateErrorElement.style.display = "block";
    return false;
  }
  if (calculateRemainingDays(dateField.value) < 0) {
    dateErrorElement.textContent = "Date cannot be in the past";
    dateErrorElement.style.display = "block";
    return false;
  }
  return true;
};

export { checkInputValidity };
