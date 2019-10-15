function handler(response) {
    if(response.status >= 400) {
        const errorMessage = `Error: ${response.status} - ${response.statusText}`;
        throw new Error(errorMessage);
    }

    //response.json() returns a Promise
    return response.json();
};

function onUpdateBtnClick(ev) {
    const catchElement = ev.target.parentElement;
    const catchId = catchElement.getAttribute('data-id');

    const localElements = {
        angler: catchElement.querySelector('input.angler'),
        weight: catchElement.querySelector('input.weight'),
        species: catchElement.querySelector('input.species'),
        location: catchElement.querySelector('input.location'),
        bait: catchElement.querySelector('input.bait'),
        captureTime: catchElement.querySelector('input.captureTime'),
    };

    if( !localElements.angler.value || 
        !localElements.bait.value ||
        !localElements.captureTime.value ||
        !localElements.location.value ||
        !localElements.species.value ||
        !localElements.weight.value) {
            return;
        }

    const updateCatch = {
        angler: localElements.angler.value,
        bait: localElements.bait.value,
        captureTime: localElements.captureTime.value,
        location: localElements.location.value,
        species: localElements.species.value,
        weight: localElements.weight.value,
    };

    fetch(`https://fisher-game.firebaseio.com/catches/${catchId}.json`, {
        method: 'PUT',
        body: JSON.stringify(updateCatch),
    })
        .then(handler)
        .then(() => document.querySelector('button.load').click())
        .catch(console.log());
};

function onDeleteBtnClick(ev) {
    const catchElement = ev.target.parentElement;
    const catchId = catchElement.getAttribute('data-id');
    //Remove Element from database
    fetch(`https://fisher-game.firebaseio.com/catches/${catchId}.json`, {method: 'DELETE'})
        .then(handler)
        //If Successful remove it from catches
        .then(catchElement.parentElement.removeChild(catchElement))
        .catch(console.log());
};

//createHTMLElement('hr');
//createHTMLElement('div', catchId);
//createHTMLElement('label', labelText);
//createHTMLElement('button', class, text);
//createHTMLElement('input', type, class, value);
function createHTMLElement(tag) {
    switch(tag) {
        case 'div':
            const div = document.createElement('div');
            div.classList.add('catch');
            div.setAttribute('data-id', arguments[1]);
            return div;
        case 'label':
            const label = document.createElement('label');
            label.textContent = arguments[1];
            return label;
        case 'input':
            const input = document.createElement('input');
            input.type = arguments[1];
            input.classList.add(arguments[2]);
            input.value = arguments[3];
            return input;
        case 'hr':
            const hr = document.createElement('hr');
            return hr;
        case 'button':
            const button = document.createElement('button');
            button.classList.add(arguments[1]);
            button.textContent = arguments[2];

            switch(arguments[1]){
                case 'update':
                    button.addEventListener('click', onUpdateBtnClick);
                    break;
                case 'delete':
                    button.addEventListener('click', onDeleteBtnClick);
                    break;
            }

            return button;
    };
};

function createCatch(id, data) {
    let catchElement = createHTMLElement('div', id);
    
    catchElement.appendChild(createHTMLElement('label', 'Angler'));
    catchElement.appendChild(createHTMLElement('input', 'text', 'angler', data.angler));
    catchElement.appendChild(createHTMLElement('hr'));

    catchElement.appendChild(createHTMLElement('label', 'Weight'));
    catchElement.appendChild(createHTMLElement('input', 'number', 'weight', data.weight));
    catchElement.appendChild(createHTMLElement('hr'));

    catchElement.appendChild(createHTMLElement('label', 'Species'));
    catchElement.appendChild(createHTMLElement('input', 'text', 'species', data.species));
    catchElement.appendChild(createHTMLElement('hr'));

    catchElement.appendChild(createHTMLElement('label', 'Location'));
    catchElement.appendChild(createHTMLElement('input', 'text', 'location', data.location));
    catchElement.appendChild(createHTMLElement('hr'));

    catchElement.appendChild(createHTMLElement('label', 'Bait'));
    catchElement.appendChild(createHTMLElement('input', 'text', 'bait', data.bait));
    catchElement.appendChild(createHTMLElement('hr'));

    catchElement.appendChild(createHTMLElement('label', 'Capture Time'));
    catchElement.appendChild(createHTMLElement('input', 'number', 'captureTime', data.captureTime));
    catchElement.appendChild(createHTMLElement('hr'));

    catchElement.appendChild(createHTMLElement('button', 'update', 'Update'));
    catchElement.appendChild(createHTMLElement('button', 'delete', 'Delete'));

    return catchElement;
};