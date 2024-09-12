function clearTripData() {
    const tripContainer = document.getElementById("trip-data");
    const cityField = document.getElementById("city");
    const dateField = document.getElementById("date");
  
    tripContainer.classList.add("hidden");
    tripContainer.innerHTML = ""; // Remove content
    cityField.value = "";
    dateField.value = "";
  }
  
  export { clearTripData };
  