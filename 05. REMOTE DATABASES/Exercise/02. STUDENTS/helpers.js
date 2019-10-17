//creates td HTML element and returns it
function createTd(text) {
    const td = document.createElement('td');
    td.textContent = text;

    return td;
};

//creates tr HTML element and returns it
function createTrElement(element) {
    const tr = document.createElement('tr');

    tr.appendChild(createTd(element.id));
    tr.appendChild(createTd(element.firstName));
    tr.appendChild(createTd(element.lastName));
    tr.appendChild(createTd(element.facultyNumber));
    tr.appendChild(createTd(element.grade));

    return tr;
};

//logs error returned by Kinvey
function logError(err, errorMessage) {
    console.warn(errorMessage);
    console.warn(err.error);
    console.warn(err.description);
    console.warn(err.debug);
};

//handles Kinvey response and trows error from error codes 4xx 5xx
function handler(response) {
    if(response.status >= 400) {
        const errorMessage = `${response.status} - ${response.statusText}`;
        response.json()
            .then(err => logError(err, errorMessage));
        throw new Error(errorMessage);
    };

    //response.json() returns a Promise
    return response.json();
};