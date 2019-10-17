const resultsElement = document.querySelector('#results tbody');

//just create HTML elements and attach them to the DOM
function displayData(data) {
    const fragment = document.createDocumentFragment();
    
    for (const element of data) {
        const currentElement = createTrElement(element);
        fragment.appendChild(currentElement);
    };

    resultsElement.appendChild(fragment);
};

//loadData is declared async because must await initialize() to finish before we can continue
async function loadData() {
    //initialize() will return either
    //multiple resolved promises of AJAX calls for initializing database or
    //Already Initialized
    const result = await initialize();

    //if result is array we have array of resolved promises
    //which they are data which is initialized to database
    if(Array.isArray(result)) {
        //so we just display this data without making additional AJAX call to database
        displayData(result);
        return;
    }

    //if data is already initialized we make AJAX request to get it
    const request = {
        method: 'GET',
        headers: {
            authorization: 'Kinvey ' + authToken,
            'Content-Type': 'application/json',
        },
    };

    const response = await fetch(baseUrl, request)
        .then(handler)
        .catch(console.log);

    displayData(response);
};

loadData();