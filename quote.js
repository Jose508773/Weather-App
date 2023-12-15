const apiKey = 'c8b4bb7781f3ee6acd6490c8e811face'; // Replace with your actual API key
// Get references to the necessary HTML elements

const weatherData = document.getElementById('weatherData');
const cityInput = document.getElementById('cityInput');

// Function to fetch weather data and update the UI
function getWeather() {
  const city = cityInput.value; // Get the user input (city name) from the input field

  // Check if the user entered a city name
  if (!city) {
    alert('Please enter a city name.');
    return;
  }

  // Construct the API URL with the city name and API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  // Make a fetch request to the weather API
  fetch(apiUrl)
    .then((response) => response.json()) // Parse the response as JSON
    .then((data) => {
      if (data.cod === '404') {
        // If the API returned an error code 404, the city was not found
        weatherData.textContent = 'City not found.';
      } else {
        // If the API returned valid data, update the UI with the weather information
        const weatherInfo = `City: ${data.name}<br>
                             Temperature: ${data.main.temp}°F<br>
                             Weather: ${data.weather[0].description}`;

        weatherData.innerHTML = weatherInfo;
      }
    })
    .catch((error) => {
      // If an error occurred during the fetch request, handle it
      weatherData.textContent = 'An error occurred. Please try again later.';
    });
}

// ...

function getWeather() {
  const city = cityInput.value;

  if (!city) {
    alert('Please enter a city name.');
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.cod === '404') {
        weatherData.textContent = 'City not found.';
      } else {
        const weatherInfo = `City: ${data.name}<br>
                             Temperature: ${data.main.temp}°F<br>
                             Weather: ${data.weather[0].description}`;

        weatherData.innerHTML = weatherInfo;

        // Update the background based on weather conditions
        updateBackground(data.weather[0].main);
      }
    })
    .catch((error) => {
      weatherData.textContent = 'An error occurred. Please try again later.';
    });
}

function updateBackground(weatherCondition) {
  const background = document.getElementById('weatherBackground');

  // Add more conditions and corresponding background styles as needed
  switch (weatherCondition) {
    case 'Clear':
      background.style.backgroundColor = '#87CEEB'; // Light Blue for clear sky
      break;
    case 'Clouds':
      background.style.backgroundColor = '#B0C4DE'; // Light Steel Blue for cloudy weather
      break;
    case 'Rain':
      background.style.backgroundImage = 'url("rain.jpg")'; // Replace "rain.jpg" with your rain background image
      background.style.backgroundSize = 'cover';
      break;
    // Add more cases for other weather conditions
    default:
      background.style.backgroundColor = '#f0f0f0'; // Default background color
  }
}
