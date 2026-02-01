Weather App

This is a weather forecasting application built with React and TypeScript. It provides weather data for today and the upcoming week. Users can search for weather by city, choose different units of measurement (e.g., Celsius, Fahrenheit), and the app will remember the last search for convenience.

Features

Weather forecast for today.

7-day weather forecast.

Search weather by city.

Unit conversion: Choose between Celsius, Fahrenheit, and other units.

Last search persistence: The app remembers your last searched city.

Open-Meteo API: Weather data is fetched from the Open-Meteo API.

Installation

Clone the repository:

git clone https://github.com/erikmurtazin/weather-app
cd weather-app

Install dependencies:

npm install

Usage

Run the app:

npm run build
npm run preview

Open the browser and navigate to:

http://localhost:4173

Search for a city (e.g., "Vilnius") and get the weather forecast for today and the next 7 days.

Choose your preferred units of measurement for temperature and other weather parameters (Celsius, Fahrenheit, etc.).

The app will save the last city you searched for, so when you reload the page, the forecast for that city will be displayed.
