//Revealing Module Pattern with IIFE
const userModel = (function() {

    const register = function (username, password) {
        const data = {
            username, 
            password,
        };

        const endPoint = `/user/${storage.appKey}`;
        const base64Credentials = btoa(`${storage.appKey}:${storage.appSecret}`);
        const authString = `Basic ${base64Credentials}`;

        const request = {
            headers: {
                authorization: authString
            },
            body: JSON.stringify(data),
        };
        
        return requester.post(endPoint, request);
    };

    const login = function(data) {
        const endPoint = `/user/${storage.appKey}/login`;
        const base64Credentials = btoa(`${data.username}:${data.password}`);
        const authString = `Basic ${base64Credentials}`;

        const request = {
            headers: {
                authorization: authString
            },
            body: JSON.stringify(data),
        };

        return requester.post(endPoint, request);
    };

    const isLoggedIn = function() {
        const authToken = storage.getData("authToken")

        if(authToken) {
            return true;
        }

        return false;
    };

    const loggingOut = function() {
        if(this.isLoggedIn()) {
            const endPoint = `/user/${storage.appKey}/_logout`;
            
            return requester.post(endPoint, {});
        }
    };

    return {
        register,
        login,
        isLoggedIn,
        loggingOut
    };
})();