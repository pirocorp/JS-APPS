const elements = {
    inputField: document.getElementById('location'),
    button: document.getElementById('submit'),
    current: document.getElementById('current'),
    forecast: document.getElementById('forecast'),
    upcoming: document.getElementById('upcoming')
};

const urls = {
    location: 'https://judgetests.firebaseio.com/locations.json',
    today: 'https://judgetests.firebaseio.com/forecast/today/${code}.json',
    forecast: 'https://judgetests.firebaseio.com/forecast/upcoming/${code}.json'
}

function handler(response) {
    if(response.status >= 400) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`)
    }

    //response.json() returns a Promise
    return response.json();
};

function getSymbol(condition) {
    switch(condition){
        case 'Sunny':
            return '&#x2600;';
        case 'Partly sunny':
            return '&#x26C5;';
        case 'Overcast':
            return '&#x2601;';
        case 'Rain':
            return '&#x2614;';
        case 'Degrees':
            return '&#176;';
    }
}

function resetForm() {
    console.log('TODO reset');
}

function createForecastData(text) {
    const forecastData = document.createElement('span');
    forecastData.classList.add('forecast-data');
    forecastData.innerHTML = text;

    return forecastData;
}

function showLocationInfo(data) {
    const forecasts = document.createElement('div');
    forecasts.classList.add('forecasts');

    const conditionSymbol = document.createElement('span');
    conditionSymbol.classList.add('condition');
    conditionSymbol.classList.add('symbol');
    conditionSymbol.innerHTML = getSymbol(data.forecast.condition);

    forecasts.appendChild(conditionSymbol);

    const condition = document.createElement('span');
    condition.classList.add('condition');

    const locationData = createForecastData(data.name);
    const forecastData = createForecastData(`${data.forecast.low}&#176;/${data.forecast.high}&#176;`);
    const conditionData = createForecastData(data.forecast.condition);

    condition.appendChild(locationData);    
    condition.appendChild(forecastData);
    condition.appendChild(conditionData);

    forecasts.appendChild(condition);

    elements.current.appendChild(forecasts);
};

function getForecastElement(data) {
    const upcoming = document.createElement('span');
    upcoming.classList.add('upcoming');

    const condition = document.createElement('span');
    condition.classList.add('condition');
    condition.innerHTML = getSymbol(data.condition);

    const forecastData = createForecastData(`${data.low}&#176;/${data.high}&#176;`);
    const conditionData = createForecastData(data.condition);

    upcoming.appendChild(condition);
    upcoming.appendChild(forecastData);
    upcoming.appendChild(conditionData);

    return upcoming;
}

function showForecastData(data) {
    const forecastInfo = document.createElement('div');
    forecastInfo.classList.add('forecast-info');

    for (const currentData of data.forecast) {
        const currentForecast = getForecastElement(currentData);
        forecastInfo.appendChild(currentForecast);
    }

    elements.upcoming.appendChild(forecastInfo);
}

function loadWeatherInfo(data, location) {
    const locationData = data
        .filter(x => x.name === location)[0];

    if(!locationData) {
        return;
    }

    const code = locationData.code;
    
    fetch(urls.today.replace('${code}', code))
        .then(handler)
        .then(showLocationInfo);

    fetch(urls.forecast.replace('${code}', code))
        .then(handler)
        .then(showForecastData);
};

function onGetWeatherClick() {
    elements.forecast.style.display = 'block';
    resetForm();

    const location = elements.inputField.value;

    fetch(urls.location)
        .then(handler)
        .then(data => loadWeatherInfo(data, location))
        .catch(console.error);

    elements.inputField.value = '';
};

elements.button.addEventListener('click', onGetWeatherClick);