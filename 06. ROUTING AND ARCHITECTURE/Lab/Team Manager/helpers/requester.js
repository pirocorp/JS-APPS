//Revealing Module Pattern with IIFE
const requester = (function() {
    const baseUrl = "https://baas.kinvey.com";

    const get = function(endPoint, request) {
        request.method = "GET";
        const url = baseUrl + endPoint;
        return makeRequest(url, request);
    };

    const post = function(endPoint, request) {
        request.method = "POST";
        const url = baseUrl + endPoint;
        return makeRequest(url, request);
    };

    const del = function(endPoint, request) {
        request.method = "DELETE";
        const url = baseUrl + endPoint;
        return makeRequest(url, request);
    };

    const put = function(endPoint, request) {
        request.method = "PUT";
        const url = baseUrl + endPoint;
        return makeRequest(url, request);
    };

    const makeRequest = function (url, request) {
        if (!request.headers) {
            request.headers = {};
        };

        if (storage.getData('userInfo') != null) {
            request.headers.authorization = `Kinvey ${storage.getData("authToken")}`;
        };

        request.headers['Content-Type'] = 'application/json';
        return fetch(url, request);
    };

    return {
        get,
        post,
        del,
        put,
    };
})();