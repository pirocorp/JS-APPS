//Revealing Module Pattern with IIFE
const userModel = (function() {
    const login = function(data) {
        if (this.isLoggedIn()) {
            return Promise.reject("You are already logged in.")
        }

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

    const logout = function() {
        if(!this.isLoggedIn()) {
            return Promise.reject("You must be logged in.")
        }

        const endPoint = `/user/${storage.appKey}/_logout`;        
        return requester.post(endPoint, {});
    };

    const register = function (username, password) {
        if (this.isLoggedIn()) {
            return Promise.reject("You must be logged out.")
        }

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

    const isLoggedIn = function() {
        const authToken = storage.getData("authToken")

        if(authToken) {
            return true;
        }

        return false;
    };

    const getCurrentUser = function() {
        if(!this.isLoggedIn()) {
            return Promise.reject("You must be logged in.")
        }
        
        const userId = storage.getData("userInfo")._id;
        const endPoint = `/user/${storage.appKey}/${userId}`;

        return requester.get(endPoint, {});
    };

    return {
        login,
        logout,
        register,        
        isLoggedIn,        
        getCurrentUser
    };
})();