const apiKey = 'a97e4439a105d5b5e5a63e3d614dc063';
const input = document.querySelector('input');
const btn = document.querySelector('button');
let query = input.value;
let humidityIcon = document.getElementById('humidityIcon');
let windIcon = document.getElementById('windIcon');
let humidityWind = document.querySelector('.humidityWind');
humidityWind.style.display = 'none';
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

input.addEventListener('input', () => {
    query = input.value;
    return query;
})
input.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
        fetchWeather(query);
    }
})

btn.addEventListener('click', () => {
    fetchWeather(query);
})

async function fetchWeather(srch) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=` + `${srch}` + `&units=imperial&appid=a97e4439a105d5b5e5a63e3d614dc063`);
        let data = await response.json();    
        humidityWind.style.display = 'flex'; 
        console.log(data)
        humidityIcon.src = 'images/humidity.png';
        windIcon.src = 'images/windDark.png';
        getIcon(data)
        getTemp(data);
        getCity(data);
        getWind(data);
        getHumidity(data);
        // getDescription(data);
        }
    catch {
        alert(`${srch} must not be a valid city name...try another`)
    }    
    input.value = '';
}

function getCity(data) {
    const city = document.getElementById('city');
    let cityData = data.name;
    // console.log(cityData);
    city.textContent = cityData;
}
function getTemp(data) {
    const temp = document.getElementById('temperature');
    let tempData = data.main.temp + '°F';
    // console.log(tempData);
    temp.textContent = tempData;
}
function getWind(data) {
    const wind = document.getElementById('wind');
    let windData = data.wind.speed + ' mph';
    // console.log(windData);
    wind.textContent = windData;
}
function getHumidity(data) {
    const humidity = document.getElementById('humidity');
    let humidityData = data.main.humidity + '%';
    // console.log(humidityData);
    humidity.textContent = humidityData;
}
function getDescription(data) {
    const description = document.getElementById('description');
    let descriptionData = data.weather[0].main;
    // console.log(descriptionData);
    description.textContent = descriptionData;
}

function getIcon(data) {
    const iconURL = 'https://openweathermap.org/img/wn/';
    const icon = document.getElementById('icon');
    let iconCode = data.weather[0].icon;
    icon.src = iconURL + iconCode + '@2x.png';
}
