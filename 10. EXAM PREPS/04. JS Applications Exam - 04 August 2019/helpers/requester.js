const requester = function () {
    const baseUrl = "https://baas.kinvey.com/";

    const appKey = "kid_BkyLn6R9r";
    const appSecret = "069e9497f39b42acac095c13c462b99a";

    const get = function (endpoint, module, authType) {
        const request = makeRequest(authType, 'GET');
        const url = `${baseUrl}${module}/${appKey}/${endpoint}`;

        return fetch(url, request);
    };

    const post = function (endpoint, module, authType, data) {
        const request = makeRequest(authType, 'POST', data);
        const url = `${baseUrl}${module}/${appKey}/${endpoint}`;

        return fetch(url, request);
    };

    const put = function (endpoint, module, authType, data) {
        const request = makeRequest(authType, 'PUT', data);
        const url = `${baseUrl}${module}/${appKey}/${endpoint}`;

        return fetch(url, request);
    };

    const del = function (endpoint, module, authType) {
        const request = makeRequest(authType, 'DELETE');
        const url = `${baseUrl}${module}/${appKey}/${endpoint}`;

        return fetch(url, request);
    };

    const makeAuth = (type) => {
        return type === 'Basic'
            ? 'Basic ' + btoa(appKey + ':' + appSecret)
            : 'Kinvey ' + sessionStorage.getItem('authtoken');
    }

    const makeRequest = (authType, httpMethod, data) => {
        const request = {
            method: httpMethod,
            headers: {
                'Authorization': makeAuth(authType),
                'Content-Type': 'application/json'
            }
        };

        if (httpMethod === 'POST' || httpMethod === 'PUT') {
            request.body = JSON.stringify(data);
        }

        return request;
    }

    return {
        get,
        post,
        del,
        put,
    }
}();