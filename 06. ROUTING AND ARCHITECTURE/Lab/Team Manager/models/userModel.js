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

    return {
        register,
    };
})();