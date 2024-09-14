# Travel App

## Project Overview

The Travel App allows users to plan Journey by providing weather information and images for the destination. The app integrates with multiple APIs like Geonames, Weatherbit, and Pixabay to deliver a rich user experience.

## Features

- Search for weather data based on location and date.
- Display the Remianing days.
- Check Input Validity .
- Fetch images of the destination using Pixabay API.
- Responsive design for use on both desktop and mobile devices.

## APIs Used

- Geonames API: Converts location names to coordinates.
- Weatherbit API: Provides current and forecasted weather data.
- Pixabay API: Supplies images of the entered location.

## Prerequisites

- **Node.js**: Version 20.9.0
- **npm**: Node Package Manager


## Installation Instructions

1. Clone the repository:
   ```
   git clone https://github.com/Maymoona12/Travel-App.git
    ```

2. Install dependencies:
    ```
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the root directory.
    - Add your API keys as follows:
        ```
        GEONAMES_USERNAME=your_geonames_username
        WEATHER_KEY=your_weatherbit_api_key
        PIXABAY_KEY=your_pixabay_api_key
        ```

4. Start the development server:
    ```
    npm run dev
    ```
5. Build the project:
    ```
    npm run build
    ```
6. Start the server:
    ```
    npm run start
    ```

## Usage

1. Enter a location and a date.
2. Click on "Submit" to get the weather information and a relevant image.
3. View the results .

## Testing

- Run unit tests :
    ```
    npm run test
    ```

## Documentation

- Detailed information on how to use and configure the APIs can be found in their respective documentation:
  - [Geonames API](http://www.geonames.org/)
  - [Weatherbit API](https://www.weatherbit.io/)
  - [Pixabay API](https://pixabay.com/api/)

## Future Improvements

- Add Multi-Destination & Booking Info
- Revamp UX/UI for Better Experience
- Boost Performance & Refactor Code