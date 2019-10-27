const userModel = function() {
    const login = function(username, password) {
        const endpoint = `/user/${storage.appKey}/login`;
        const basicAuthString = btoa(`${storage.appKey}:${storage.appSecret}`); 
        const data = { username, password };

        const request = {
            headers: {
                authorization: `Basic ${basicAuthString}`,
            },
            body: JSON.stringify(data),
        };

        return requester.post(endpoint, request);
    };

    const isLogged = function() {
        return storage.getData("authToken") != null;
    };

    const logout = function() {
        const endpoint = `/user/${storage.appKey}/_logout`;
        const authToken = storage.getData('authToken');

        const request = {
            headers: {
                authorization: `Kinvey ${authToken}`,
            }
        };
        
        return requester.post(endpoint, request);
    };

    const register = function(params) {
        const endpoint = `/user/${storage.appKey}/`;
        const basicAuthString = btoa(`${storage.appKey}:${storage.appSecret}`); 

        const { username, password, confirmPassword, first_name, last_name } = params;

        const data = {
            username,
            password,
            first_name,
            last_name
        };

        const request = {
            headers: {
                authorization: `Basic ${basicAuthString}`,
            },
            body: JSON.stringify(data),
        };

        return requester.post(endpoint, request);
    };

    return {
        login,
        logout,
        register,
        isLogged,
    };
}();