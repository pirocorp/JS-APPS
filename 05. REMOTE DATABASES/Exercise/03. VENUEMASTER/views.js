function createVenue(data) {
const venueElement = document.createElement('div');
venueElement.classList.add('venue');
venueElement.setAttribute('data-id', data._id);
venueElement.innerHTML = 
`   <span class="venue-name"><input class="info" type="button" value="More info">${data.name}</span>	
    <div class="venue-details" style="display: none;">
        <table>
            <tr>
                <th>Ticket Price</th>
                <th>Quantity</th>
                <th></th>
            </tr>
            <tr>
                <td class="venue-price">${data.price} lv</td>
                <td>
					<select class="quantity">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
				</td>
                <td>
					<input class="purchase" type="button" value="Purchase">
				</td>
            </tr>
        </table>
		
        <span class="head">Venue description:</span>		
        <p class="description">${data.description}</p>		
        <p class="description">Starting time: ${data.startingHour}</p>		
    </div>`;

    return venueElement;
};

function createConfirmation(data) {
    function onConfirmClick(ev, data) {
        const venueId = ev.currentTarget.parentElement.parentElement.getAttribute('data-id');
        
        const request = {
            method: 'POST',
            headers: {
                authorization: 'Basic ' + btoa(`${username}:${password}`),
                'Content-Type': 'application/json',
            },
        };

        fetch(`${kinveyRPC}/custom/purchase?venue=${venueId}&qty=${data.qty} `, request)
            .then(handler)
            .then(response => document.getElementById('venue-info').innerHTML = '<h1>You may print this page as your ticket</h1>' + response.html)
            .catch(console.log);
    };

    const venueInfoElement = document.createElement('div');
    venueInfoElement.setAttribute('id', 'venue-info');
    venueInfoElement.setAttribute('data-id', data.id);

    venueInfoElement.innerHTML = 
`	<span class="head">Confirm purchase</span>
    <div class="purchase-info">
        <span>${data.name}</span>
        <span>${data.qty} x ${data.price}</span>
        <span>Total: ${data.qty * data.price} lv</span>
        <input type="button" value="Confirm">
    </div>`;

    venueInfoElement.querySelector('input').addEventListener('click', (ev) => onConfirmClick(ev, data));
    return venueInfoElement;
};