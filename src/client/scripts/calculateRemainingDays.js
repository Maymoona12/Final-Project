// Function to calculate the number of remaining days from today to a target departure date
const calculateRemainingDays = (departureDate) => {
  const today = new Date(); // Get the current date
  const targetDate = new Date(departureDate); // Convert the given departure date to a Date object

  // Calculate the difference in time between the target date and today's date in milliseconds
  const timeDiffere = targetDate.getTime() - today.getTime();

  // Convert the time difference from milliseconds to days and round up using Math.ceil
  // (1000 ms * 3600 seconds/hour * 24 hours/day gives the total milliseconds in a day)
  return Math.ceil(timeDiffere / (1000 * 3600 * 24));
};

export { calculateRemainingDays }; // Export the function for use in other modules
