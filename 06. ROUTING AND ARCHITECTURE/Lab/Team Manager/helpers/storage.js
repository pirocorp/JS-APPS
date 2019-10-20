//Revealing Module Pattern with IIFE
const storage = (function() {
    const appKey = "kid_H1Nl0pKFH";
    const appSecret = "d5798262030e421b85461d0bc8e319c5";

    const getData = function(key) {
        return JSON.parse(localStorage.getItem(key + appKey));
    };

    //Save value in LocalStorage object in browser
    const saveData = function(key, value) {
        localStorage.setItem(key + appKey, JSON.stringify(value));
    };

    //Login logic
    const saveUser = function(data) {
        saveData("userInfo", data);
        saveData("authToken", data._kmd.authtoken);
    };

    //Logout logic
    const deleteUser = function() {
        localStorage.removeItem("userInfo" + appKey);
        localStorage.removeItem("authToken" + appKey);
    }

    return {
        getData,
        saveData,
        saveUser,
        deleteUser,
        appKey,
        appSecret,
    };
})();