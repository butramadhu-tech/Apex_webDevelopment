/**
 * task5/js/weather.js
 * Weather App Logic using OpenWeatherMap API
 */

document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const weatherInfo = document.getElementById('weather-info');
    const loading = document.getElementById('loading');
    const errorMessage = document.getElementById('error-message');

    if (!cityInput || !searchBtn) return; // Only run on weather page

    // Replace with real API Key
    const API_KEY = 'YOUR_API_KEY_HERE';
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

    // Load last searched city
    const lastCity = localStorage.getItem('weather_last_city');
    if (lastCity) {
        cityInput.value = lastCity;
        fetchWeather(lastCity);
    }

    searchBtn.addEventListener('click', () => {
        if (cityInput.value.trim()) fetchWeather(cityInput.value.trim());
    });

    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && cityInput.value.trim()) {
            fetchWeather(cityInput.value.trim());
        }
    });

    async function fetchWeather(city) {
        loading.classList.remove('hidden');
        weatherInfo.classList.add('hidden');
        errorMessage.classList.add('hidden');

        try {
            const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);
            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'City not found');

            updateWeatherUI(data);
            localStorage.setItem('weather_last_city', city);
        } catch (error) {
            errorMessage.textContent = 'City not found or API error. Please try again.';
            errorMessage.classList.remove('hidden');
        } finally {
            loading.classList.add('hidden');
        }
    }

    function updateWeatherUI(data) {
        document.getElementById('city-name').textContent = data.name;
        document.getElementById('temp').textContent = `${Math.round(data.main.temp)}°C`;
        document.getElementById('description').textContent = data.weather[0].description;
        document.getElementById('humidity').textContent = `${data.main.humidity}%`;
        
        const windKmh = (data.wind.speed * 3.6).toFixed(1);
        document.getElementById('wind').textContent = `${windKmh} km/h`;
        
        const iconCode = data.weather[0].icon;
        document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        
        weatherInfo.classList.remove('hidden');
    }
});
