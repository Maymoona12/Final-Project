function clearJourneyData() {
  const JourneyContainer = document.getElementById("Journey-data"); // Get the container where journey information is displayed
  const cityField = document.getElementById("city"); // Get the city input field
  const dateField = document.getElementById("date"); // Get the date input field

  // Check if the journey data container exists in the DOM
  if (JourneyContainer) {
    JourneyContainer.innerHTML = ""; // Clear all the content inside the journey container
    JourneyContainer.classList.add("hidden"); // Hide the container after clearing the content
  }

  // Clear the city input field, if it exists
  if (cityField) cityField.value = "";

  // Clear the date input field, if it exists
  if (dateField) dateField.value = "";
}

export { clearJourneyData };
