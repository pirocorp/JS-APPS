//Revealing Module Pattern with IIFE
//Storage saves current state of application into storage object into browser
const storage = (function() {
    const appKey = "kid_H1Nl0pKFH";
    const appSecret = "d5798262030e421b85461d0bc8e319c5";

    //Get data from localStorage by key
    const getData = function(key) {
        return JSON.parse(localStorage.getItem(key + appKey));
    };

    //Save value in LocalStorage object in browser
    const saveData = function(key, value) {
        localStorage.setItem(key + appKey, JSON.stringify(value));
    };

    //Login logic or update current state or set current state to passed data
    const saveUser = function(data) {
        saveData("userInfo", data);
        saveData("authToken", data._kmd.authtoken);
    };

    //Logout logic or delete state from browser
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