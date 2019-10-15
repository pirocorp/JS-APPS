let elements = {
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
};

function createHTMLElement(tagName, id, classList, textContent) {
    let currentElement = document.createElement(tagName);

    if(id) {
        currentElement.id = id;
    }

    if(classList) {
        for (const currentClass of classList) {
            currentElement.classList.add(currentClass);
        }
    }

    if(textContent) {
        currentElement.innerHTML = textContent;
    }

    return currentElement;
};

function resetForm() {
    elements.forecast.innerHTML = '';

    const fragment = document.createDocumentFragment();

    const current = createHTMLElement('div', 'current');
    current.appendChild(createHTMLElement('div', null, ['label'], 'Current conditions'));

    const upcoming = createHTMLElement('div', 'upcoming');
    upcoming.appendChild(createHTMLElement('div', null, ['label'], 'Three-day forecast'));

    fragment.appendChild(current);
    fragment.appendChild(upcoming);

    elements.forecast.appendChild(fragment);

    elements = {
        inputField: document.getElementById('location'),
        button: document.getElementById('submit'),
        current: document.getElementById('current'),
        forecast: document.getElementById('forecast'),
        upcoming: document.getElementById('upcoming')
    };
};

function handler(response) {
    if(response.status >= 400) {
		const errorMessage = `Error: ${response.status} - ${response.statusText}`;
		elements.forecast.appendChild(createHTMLElement('div', null, ['error'], errorMessage));
        throw new Error(errorMessage);
    }

    //response.json() returns a Promise
    return response.json();
};

function getSymbol(condition) {
    switch (condition) {
        case 'Sunny':
            return '&#x2600;';
        case 'Partly sunny':
            return '&#x26C5;';
        case 'Overcast':
            return '&#x2601;';
        case 'Rain':
            return '&#x2614;';
    }
};

function showLocationInfo(data) {
    const forecasts = createHTMLElement('div', null, ['forecasts']);

    const conditionSymbol = createHTMLElement('span', null, ['condition', 'symbol'], getSymbol(data.forecast.condition));

    const condition = createHTMLElement('span', null, ['condition']);

    const locationData = createHTMLElement('span', null, ['forecast-data'], data.name);
    const forecastData = createHTMLElement('span', null, ['forecast-data'], `${data.forecast.low}&#176;/${data.forecast.high}&#176;`);
    const conditionData = createHTMLElement('span', null, ['forecast-data'], data.forecast.condition);

    condition.appendChild(locationData);
    condition.appendChild(forecastData);
    condition.appendChild(conditionData);

    forecasts.appendChild(conditionSymbol);
    forecasts.appendChild(condition);

    elements.current.appendChild(forecasts);
};

function showForecastData(data) {
    function getForecastElement(data) {
        const upcoming = createHTMLElement('span', null, ['upcoming']);

        const condition = createHTMLElement('span', null, ['condition'], getSymbol(data.condition));
        const forecastData = createHTMLElement('span', null, ['forecast-data'], `${data.low}&#176;/${data.high}&#176;`);
        const conditionData = createHTMLElement('span', null, ['forecast-data'], data.condition);

        upcoming.appendChild(condition);
        upcoming.appendChild(forecastData);
        upcoming.appendChild(conditionData);

        return upcoming;
    };

    const forecastInfo = document.createElement('div');
    forecastInfo.classList.add('forecast-info');

    for (const currentData of data.forecast) {
        const currentForecast = getForecastElement(currentData);
        forecastInfo.appendChild(currentForecast);
    }

    elements.upcoming.appendChild(forecastInfo);
};

function loadWeatherInfo(data, location) {
    const locationData = data
        .filter(x => x.name === location)[0];

    if (!locationData) {
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