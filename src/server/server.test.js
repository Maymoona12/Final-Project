const request = require("supertest");  // Import Supertest for testing HTTP requests
const express = require("express");    // Import Express (not used directly but needed in context)
const app = require("../server/server");  // Import the app instance from the Express server
const { fetchCityCoordinates } = require("../server/fetchCityCoordinates");  // Import the fetchCityCoordinates function

// Mocking fetchCityCoordinates function so that it doesn't make real API requests
jest.mock("../server/fetchCityCoordinates");

describe("Express Server", () => {
  
  // Test case 1: Valid city name
  it("should return city coordinates for a valid city name", async () => {
    // Mocked response for a valid city (London), to simulate the data returned by fetchCityCoordinates
    const mockCityCoordinates = { name: "London", lat: 51.5074, lng: -0.1278 };
    
    // Telling Jest to resolve the mocked fetchCityCoordinates function with the mock data for London
    fetchCityCoordinates.mockResolvedValue(mockCityCoordinates);

    // Supertest makes an HTTP POST request to the /getCity endpoint, sending a city name ('London') in the request body
    const response = await request(app)
      .post("/getCity")
      .send({ city: "London" })  // Sending city name as payload
      .expect("Content-Type", /json/)  // Expecting the response to be in JSON format
      .expect(200);  // Expecting HTTP status code 200 (OK)

    // Verifying that the response body matches the mocked city coordinates
    expect(response.body).toEqual(mockCityCoordinates);
  });

  // Test case 2: Invalid city name
  it("should return an error message for an invalid city", async () => {
    // Mocked response for an invalid city, simulating an error message
    const mockErrorResponse = { message: "City not found. Please check your spelling.", error: true };

    // Telling Jest to resolve the mocked fetchCityCoordinates function with the mock error message
    fetchCityCoordinates.mockResolvedValue(mockErrorResponse);

    // Supertest makes an HTTP POST request to the /getCity endpoint, sending an invalid city name
    const response = await request(app)
      .post("/getCity")
      .send({ city: "InvalidCityName" })  // Sending an invalid city name as payload
      .expect("Content-Type", /json/)  // Expecting the response to be in JSON format
      .expect(200);  // Still expecting HTTP status code 200 (OK) as the server handles the error gracefully

    // Verifying that the response body matches the mocked error message
    expect(response.body).toEqual(mockErrorResponse);
  });
});
