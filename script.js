const apiKey = '0449341418a8a2f06fb8158ff1a1eeeb';
const getWeatherBtn = document.getElementById('getWeatherBtn');
const locationInput = document.getElementById('locationInput');
const weatherDisplay = document.getElementById('weatherDisplay');

const getWeather = async () => {
    const location = locationInput.value.trim();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); // Debugging: log the API response
        displayWeather(data);
    } catch (error) {
        weatherDisplay.innerHTML = 'Unable to retrieve weather data';
    }
};

const displayWeather = (data) => {
    if (data.cod === 200) {
        weatherDisplay.innerHTML = `
            <div><i class="fas fa-map-marker-alt"></i> Location: ${data.name}</div>
            <div><i class="fas fa-thermometer-half"></i> Temperature: ${data.main.temp}°C</div>
            <div><i class="fas fa-cloud"></i> Weather: ${data.weather[0].description}</div>
            <div><i class="fas fa-tint"></i> Humidity: ${data.main.humidity}%</div>
            <div><i class="fas fa-wind"></i> Wind Speed: ${data.wind.speed} m/s</div>
            <div><i class="fas fa-tachometer-alt"></i> Pressure: ${data.main.pressure} hPa</div>
            <div><i class="fas fa-sun"></i> Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</div>
            <div><i class="fas fa-moon"></i> Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</div>
        `;
    } else {
        weatherDisplay.innerHTML = `Error: ${data.message}`;
    }
};

getWeatherBtn.addEventListener('click', getWeather);
