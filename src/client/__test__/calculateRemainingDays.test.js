import { calculateRemainingDays } from "../scripts/calculateRemainingDays";

const today = new Date();
const futureDate = new Date();
futureDate.setDate(today.getDate() + 5);

test("should return the number of days remaining from today to the specified date", () => {
  expect(calculateRemainingDays(futureDate)).toBe(5);
});
