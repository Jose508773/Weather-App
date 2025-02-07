const apiKey = 'c8b4bb7781f3ee6acd6490c8e811face';
const weatherData = document.getElementById('weatherData');
const cityInput = document.getElementById('cityInput');
const weatherBackground = document.getElementById('weatherBackground');
const loadingSpinner = document.getElementById('loadingSpinner');
const tempToggle = document.querySelector('.temp-toggle');

let temperatureInFahrenheit = 0;
let currentUnit = 'F';

function getWeather() {
  const city = cityInput.value.trim();
  if (!city) {
    alert('Please enter a city name.');
    return;
  }

  weatherData.classList.add('hidden');
  tempToggle.classList.add('hidden');
  loadingSpinner.classList.remove('hidden');

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      loadingSpinner.classList.add('hidden');
      if (data.cod === '404') {
        weatherData.innerHTML = '<p>City not found.</p>';
        weatherData.classList.remove('hidden');
        return;
      }

      temperatureInFahrenheit = data.main.temp;

      const weatherInfo = `
        <h2>${data.name}</h2>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}">
        <p>Temperature: ${temperatureInFahrenheit}°F</p>
        <p>Weather: ${data.weather[0].description}</p>
      `;
      weatherData.innerHTML = weatherInfo;
      weatherData.classList.remove('hidden');
      tempToggle.classList.remove('hidden');
      updateBackground(data.weather[0].main);
    })
    .catch(() => {
      loadingSpinner.classList.add('hidden');
      weatherData.innerHTML = '<p>An error occurred. Please try again later.</p>';
      weatherData.classList.remove('hidden');
    });
}

function updateBackground(condition) {
  switch (condition.toLowerCase()) {
    case 'clear':
      weatherBackground.style.background = 'linear-gradient(to bottom, #FFD700, #FF6347)';
      break;
    case 'clouds':
      weatherBackground.style.background = 'linear-gradient(to bottom, #D3D3D3, #778899)';
      break;
    case 'rain':
      weatherBackground.style.background = 'linear-gradient(to bottom, #00BFFF, #1E90FF)';
      break;
    default:
      weatherBackground.style.background = 'linear-gradient(to bottom, #89f7fe, #66a6ff)';
  }
}

function toggleTemperature(unit) {
  currentUnit = unit;
  const temperature = unit === 'F'
    ? temperatureInFahrenheit
    : ((temperatureInFahrenheit - 32) * 5) / 9;

  const weatherTemp = weatherData.querySelector('p:nth-child(3)');
  weatherTemp.innerHTML = `Temperature: ${temperature.toFixed(1)}°${unit}`;
}
