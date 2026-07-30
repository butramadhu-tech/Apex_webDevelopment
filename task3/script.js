// task3/script.js

// IMPORTANT: Replace this placeholder with your actual OpenWeatherMap API Key
const API_KEY = 'YOUR_API_KEY_HERE';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

// DOM Elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const loadingSpinner = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');
const weatherInfo = document.getElementById('weather-info');

// Weather Data Elements
const cityNameEl = document.getElementById('city-name');
const tempEl = document.getElementById('temp');
const descEl = document.getElementById('description');
const iconEl = document.getElementById('weather-icon');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');

// Load last searched city on startup
document.addEventListener('DOMContentLoaded', () => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
        cityInput.value = lastCity;
        fetchWeather(lastCity);
    }
});

// Event Listeners for Search
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
});

cityInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) fetchWeather(city);
    }
});

/**
 * Fetches weather data using the Fetch API and Async/Await
 * @param {string} city - The city name to search for
 */
async function fetchWeather(city) {
    // UI State: Show loading, hide previous info/errors
    loadingSpinner.classList.remove('hidden');
    weatherInfo.classList.add('hidden');
    errorMessage.classList.add('hidden');

    try {
        // Fetch API request
        const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
        
        // JSON Parsing
        const data = await response.json();

        if (!response.ok) {
            // Throw error to be caught by the catch block (e.g. 404 City not found)
            throw new Error(data.message || 'City not found');
        }

        // Update UI with parsed data
        updateUI(data);

        // Save successful search to localStorage
        localStorage.setItem('lastCity', city);

    } catch (error) {
        // Error Handling
        console.error('Error fetching weather data:', error);
        showError(error.message);
    } finally {
        // Remove loading spinner regardless of success or failure
        loadingSpinner.classList.add('hidden');
    }
}

/**
 * Updates the DOM with the fetched weather data
 * @param {object} data - The parsed JSON weather data object
 */
function updateUI(data) {
    // Destructuring data for cleaner code
    const { name, main, weather, wind } = data;
    const { temp, humidity } = main;
    const { description, icon } = weather[0];
    const { speed } = wind;

    // Populating DOM elements
    cityNameEl.textContent = name;
    tempEl.textContent = `${Math.round(temp)}°C`;
    descEl.textContent = description;
    
    // Convert m/s to km/h for wind speed
    const windKmh = (speed * 3.6).toFixed(1);
    windEl.textContent = `${windKmh} km/h`;
    humidityEl.textContent = `${humidity}%`;

    // Fetch official OpenWeather icon
    iconEl.src = `https://openweathermap.org/img/wn/${icon}@4x.png`;
    iconEl.alt = description;

    // Show weather info card
    weatherInfo.classList.remove('hidden');
}

/**
 * Displays the error message container
 * @param {string} msg - The error message to display
 */
function showError(msg) {
    // Format "city not found" for better user experience
    const friendlyMsg = msg.toLowerCase() === 'city not found' 
        ? 'City not found. Please try again.' 
        : 'An error occurred. Please try again.';
        
    errorMessage.querySelector('p').textContent = friendlyMsg;
    errorMessage.classList.remove('hidden');
}
