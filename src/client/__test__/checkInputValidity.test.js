import { checkInputValidity } from "../scripts/checkInputValidity";
import { calculateRemainingDays } from "../scripts/calculateRemainingDays";

// Mock the calculateRemainingDays function to control its behavior during tests
jest.mock("../scripts/calculateRemainingDays", () => ({
  calculateRemainingDays: jest.fn(),
}));

describe("checkInputValidity", () => {
  let cityField;
  let dateField;
  let cityErrorElement;
  let dateErrorElement;

  // Set up the DOM elements before each test
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="city" />
      <input id="date" type="date" />
      <div id="city-error" style="display: none;"></div>
      <div id="date-error" style="display: none;"></div>
    `;

    // Initialize DOM elements for use in tests
    cityField = document.getElementById("city");
    dateField = document.getElementById("date");
    cityErrorElement = document.getElementById("city-error");
    dateErrorElement = document.getElementById("date-error");
  });

  // Clear any mock data after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test if an error message is displayed when the city field is empty
  test("should display an error message if the city field is empty", () => {
    cityField.value = "";
    dateField.value = "2024-09-01"; // Valid date

    const result = checkInputValidity();

    // Check that the function returns false and displays the correct error message
    expect(result).toBe(false);
    expect(cityErrorElement.style.display).toBe("block");
    expect(cityErrorElement.textContent).toBe("City name is required");
  });

  // Test if an error message is displayed when the date field is empty
  test("should display an error message if the date field is empty", () => {
    cityField.value = "London";
    dateField.value = "";

    const result = checkInputValidity();

    // Check that the function returns false and displays the correct error message
    expect(result).toBe(false);
    expect(dateErrorElement.style.display).toBe("block");
    expect(dateErrorElement.textContent).toBe("Departure date is required");
  });

  // Test if an error message is displayed when the date is in the past
  test("should display an error message if the date is in the past", () => {
    cityField.value = "London";
    dateField.value = "2024-08-01"; // Past date

    // Mock calculateRemainingDays to return a negative value indicating past date
    calculateRemainingDays.mockReturnValue(-10);

    const result = checkInputValidity();

    // Check that the function returns false and displays the correct error message
    expect(result).toBe(false);
    expect(dateErrorElement.style.display).toBe("block");
    expect(dateErrorElement.textContent).toBe("Date cannot be in the past");
  });

  // Test if the function returns true when all inputs are valid
  test("should return true if inputs are valid", () => {
    cityField.value = "London";
    dateField.value = "2024-09-01"; // Future date

    // Mock calculateRemainingDays to return a positive value indicating future date
    calculateRemainingDays.mockReturnValue(10);

    const result = checkInputValidity();

    // Check that the function returns true and no error messages are displayed
    expect(result).toBe(true);
    expect(cityErrorElement.style.display).toBe("none");
    expect(dateErrorElement.style.display).toBe("none");
  });
});
