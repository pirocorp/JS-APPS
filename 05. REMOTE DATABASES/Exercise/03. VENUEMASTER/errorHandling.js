//handles Kinvey response and trows error for HTTP response codes 4xx 5xx
function handler(response) {
    //logs error returned by Kinvey
    function logError(err, errorMessage) {
        console.warn(errorMessage);
        console.warn(err.error);
        console.warn(err.description);
        console.warn(err.debug);
    };

    if(response.status >= 400) {
        const errorMessage = `${response.status} - ${response.statusText}`;
        response.json()
            .then(err => logError(err, errorMessage));
        throw new Error(errorMessage);
    };

    //response.json() returns a Promise
    return response.json();
};