let venueInfoElement = document.getElementById('venue-info');

function onPurchaseClick(ev) {
    const venueElement = ev.currentTarget
        .parentElement
        .parentElement
        .parentElement
        .parentElement
        .parentElement
        .parentElement;

    const data = {
        name: venueElement.querySelector('.venue-name').textContent,
        qty: Number(venueElement.querySelector('select.quantity').value),
        price: Number(venueElement.querySelector('.venue-price').textContent.split(' ')[0]),
        id: venueElement.getAttribute('data-id'),
    };

    const newVenueInfoElement = createConfirmation(data);
    const oldVenueElement = document.getElementById('venue-info')
    const parentElementOfOldVenueElement = oldVenueElement.parentElement;
    parentElementOfOldVenueElement.removeChild(oldVenueElement);
    venueInfoElement = newVenueInfoElement;
    parentElementOfOldVenueElement.appendChild(newVenueInfoElement);
};

function onMoreInfoClick(ev) {
    const venueElement = ev.currentTarget.parentElement.parentElement;

    if(venueElement.querySelector('div.venue-details').style.display === 'none') {
        venueElement.querySelector('div.venue-details').style.display = 'block';
    } else {
        venueElement.querySelector('div.venue-details').style.display = 'none';
    }
};

function appendVenues(response) {
    venueInfoElement.innerHTML = '';

    for (const data of response) {
        const currentVenue = createVenue(data);
        currentVenue.querySelector('input.info').addEventListener('click', onMoreInfoClick);
        currentVenue.querySelector('input.purchase').addEventListener('click', onPurchaseClick);
        venueInfoElement.appendChild(currentVenue);
    };    
};

function processResponse(response) {
    const venuesPromises = [];

    const request = {
        method: 'GET',
        headers: {
            authorization: 'Basic ' + btoa(`${username}:${password}`),
            'Content-Type': 'application/json',
        },
    };

    for (const venueId of response) {
        const currentPromise = fetch(`${kinveyBaseUrl}/venues/${venueId}`, request)
            .then(handler)
            .catch(console.log);
        
        venuesPromises.push(currentPromise);
    }

    Promise.all(venuesPromises)
        .then(appendVenues);
};

function onGetVenuesClick() {
    const venueDate = document.getElementById('venueDate').value;
    
    const request = {
        method: 'POST',
        headers: {
            authorization: 'Basic ' + btoa(`${username}:${password}`),
            'Content-Type': 'application/json',
        },
    };

    fetch(`${kinveyRPC}/custom/calendar?query=${venueDate}`, request)
        .then(handler)
        .then(processResponse)
        .catch(console.log);
};

document.getElementById('getVenues').addEventListener('click', onGetVenuesClick);