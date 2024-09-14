import { calculateRemainingDays } from "../scripts/calculateRemainingDays";

const today = new Date();
const presentDate = new Date();
presentDate.setDate(today.getDate() + 5);

test("should return the number of days remaining from today to the specified date", () => {
  expect(calculateRemainingDays(presentDate)).toBe(5);
});
