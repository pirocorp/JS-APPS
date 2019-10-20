//Revealing Module Pattern with IIFE
const requester = (function() {

    const get = function(url, request) {
        request.method = "GET";
        return makeRequest(url, request);
    };

    const post = function(url, request) {
        request.method = "POST";
        return makeRequest(url, request);
    };

    const del = function(url, request) {
        request.method = "DELETE";
        return makeRequest(url, request);
    };

    const put = function(url, request) {
        request.method = "PUT";
        return makeRequest(url, request);
    };

    const makeRequest = function(url, request) {
        /* if(storage.getData('userInfo')) {
            request.headers = {
                authorization: 
            };
        } */

        /* if (!request.headers) {
            request.headers = {};
        } */

        //request.headers['Content Type'] = 'application/json';
        //TODO: Authorization Kinvey;
        return fetch(url, request);
    };

    return {
        get,
        post,
        del,
        put,
    };
})();