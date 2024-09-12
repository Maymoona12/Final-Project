import { checkInputValidity } from "../scripts/checkInputValidity";
import { calculateRemainingDays } from "../scripts/calculateRemainingDays";

jest.mock("../scripts/calculateRemainingDays", () => ({
  calculateRemainingDays: jest.fn(),
}));

describe("checkInputValidity", () => {
  let cityField;
  let dateField;
  let cityErrorElement;
  let dateErrorElement;

  beforeEach(() => {
    document.body.innerHTML = `
      <input id="city" />
      <input id="date" type="date" />
      <div id="city-error" style="display: none;"></div>
      <div id="date-error" style="display: none;"></div>
    `;

    cityField = document.getElementById("city");
    dateField = document.getElementById("date");
    cityErrorElement = document.getElementById("city-error");
    dateErrorElement = document.getElementById("date-error");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should display an error message if the city field is empty", () => {
    cityField.value = "";
    dateField.value = "2024-09-01"; // Valid date

    const result = checkInputValidity();

    expect(result).toBe(false);
    expect(cityErrorElement.style.display).toBe("block");
    expect(cityErrorElement.textContent).toBe("City name is required");
  });

  test("should display an error message if the date field is empty", () => {
    cityField.value = "London";
    dateField.value = "";

    const result = checkInputValidity();

    expect(result).toBe(false);
    expect(dateErrorElement.style.display).toBe("block");
    expect(dateErrorElement.textContent).toBe("Departure date is required");
  });

  test("should display an error message if the date is in the past", () => {
    cityField.value = "London";
    dateField.value = "2024-08-01"; // Past date

    calculateRemainingDays.mockReturnValue(-10);

    const result = checkInputValidity();

    expect(result).toBe(false);
    expect(dateErrorElement.style.display).toBe("block");
    expect(dateErrorElement.textContent).toBe("Date cannot be in the past");
  });

  test("should return true if inputs are valid", () => {
    cityField.value = "London";
    dateField.value = "2024-09-01"; // Future date

    calculateRemainingDays.mockReturnValue(10);

    const result = checkInputValidity();

    expect(result).toBe(true);
    expect(cityErrorElement.style.display).toBe("none");
    expect(dateErrorElement.style.display).toBe("none");
  });
});
