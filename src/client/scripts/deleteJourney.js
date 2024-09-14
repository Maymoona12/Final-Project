function clearJourneyData() {
  const JourneyContainer = document.getElementById("Journey-data");
  const cityField = document.getElementById("city");
  const dateField = document.getElementById("date");

  if (JourneyContainer) {
    JourneyContainer.innerHTML = ""; // Remove content
    JourneyContainer.classList.add("hidden");
  }
  if (cityField) cityField.value = "";
  if (dateField) dateField.value = "";
}

export { clearJourneyData };
