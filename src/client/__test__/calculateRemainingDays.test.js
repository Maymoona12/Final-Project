import { calculateRemainingDays } from "../scripts/calculateRemainingDays";

// Create a new Date object for today's date
const today = new Date();
// Create a new Date object for the date 5 days in the future
const presentDate = new Date();
presentDate.setDate(today.getDate() + 5); // Set the date to 5 days from today

test("should return the number of days remaining from today to the specified date", () => {
  // Test that calculateRemainingDays returns the correct number of days between today and the future date
  expect(calculateRemainingDays(presentDate)).toBe(5);
});
