const LAT = "40.7128";
const LON = "-74.0060";
const BASE_URL = "https://api.open-meteo.com/v1/forecast";


const btnTemp = document.getElementById('btn-temp');
const btnConditions = document.getElementById('btn-conditions');
const contentArea = document.getElementById('content-area');

 
async function fetchTemperature() {
    contentArea.innerHTML = "<p>Loading temperature data...</p>";
    try {
       
        const response = await fetch(`${BASE_URL}?latitude=${LAT}&longitude=${LON}&current=temperature_2m&temperature_unit=fahrenheit`);
        
        if (!response.ok) throw new Error("Network response was not ok");
        
        const data = await response.json();
        const temp = data.current.temperature_2m;
        const unit = data.current_units.temperature_2m;

        contentArea.innerHTML = `
            <div class="weather-card">
                <h2>Current Temperature</h2>
                <p class="weather-value">${temp}${unit}</p>
            </div>
        `;
    } catch (error) {
        handleError(error);
    }
}

async function fetchConditions() {
    contentArea.innerHTML = "<p>Loading weather conditions...</p>";
    try {
       
        const response = await fetch(`${BASE_URL}?latitude=${LAT}&longitude=${LON}&current=weather_code,relative_humidity_2m`);
        
        if (!response.ok) throw new Error("Network response was not ok");
        
        const data = await response.json();
        const humidity = data.current.relative_humidity_2m;
        const code = data.current.weather_code;
        
        
        let conditionText = "Clear sky";
        if (code > 0 && code <= 3) conditionText = "Partly Cloudy";
        else if (code >= 45 && code <= 48) conditionText = "Foggy";
        else if (code >= 51 && code <= 67) conditionText = "Raining";
        else if (code >= 71 && code <= 77) conditionText = "Snowing";
        else if (code >= 80) conditionText = "Rain Showers / Thunderstorms";

        contentArea.innerHTML = `
            <div class="weather-card">
                <h2>Current Conditions</h2>
                <p class="weather-value">${conditionText}</p>
                <p>Humidity: ${humidity}%</p>
            </div>
        `;
    } catch (error) {
        handleError(error);
    }
}


function handleError(error) {
    console.error("API Fetch Error:", error);
    contentArea.innerHTML = `
        <div class="error-card">
            <p>⚠️ Error loading data. Please try again later.</p>
        </div>
    `;
}


btnTemp.addEventListener('click', () => {
    btnTemp.classList.add('active');
    btnConditions.classList.remove('active');
    fetchTemperature();
});

btnConditions.addEventListener('click', () => {
    btnConditions.classList.add('active');
    btnTemp.classList.remove('active');
    fetchConditions();
});


fetchTemperature();