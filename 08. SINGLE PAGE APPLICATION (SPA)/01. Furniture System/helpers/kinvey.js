//Revealing Module Pattern with IIFE
const kinvey = (function() {
    //handles Kinvey response and trows error for HTTP response codes 4xx 5xx
    const handler = async function(response) {
        //logs error returned by Kinvey
        function logError(err, errorMessage) {
            console.warn(errorMessage);
            console.warn(err.error);
            console.warn(err.description);
            console.warn(err.debug);
        };

        //logs errors for all status codes 4xx 5xx
        if (response.status >= 400) {
            const errorMessage = `${response.status} - ${response.statusText}`;
            let error;
            await response.json()
                .then(err => {
                    error = err;
                    logError(err, errorMessage);                   
                });

            throw new Error(error.description);
        };

        //When log out kinvey returns response with No Content
        if (response.statusText === "No Content") {

            //Promise.resolve() returns promise which resolves to string passed as argument
            return Promise.resolve();
        }

        //response.json() returns a Promise
        return response.json();
    };

    return {
        handler,
    };
})();