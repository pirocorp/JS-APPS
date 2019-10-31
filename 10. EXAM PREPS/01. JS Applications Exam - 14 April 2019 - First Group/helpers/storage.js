//Revealing Module Pattern with IIFE
//Storage saves current state of application into storage object into browser
const storage = function() {
    const appKey = "kid_HkkAfr_qS";
    const appSecret = "0e57dce07ed74d2fa5c80c190af7dae5";

    const saveUser = function(data) {
        saveData("userInfo", data);
        saveData("authToken", data._kmd.authtoken);
    };

    const deleteUser = function() {
        deleteData("userInfo");
        deleteData("authToken");
    };

    const saveData = function(key, value) {
        localStorage.setItem(accessKey(key), JSON.stringify(value));
    };

    const getData = function(key) {
        return JSON.parse(localStorage.getItem(accessKey(key)));
    };

    const deleteData = function(key) {
        const deletedItem = getData(key);
        localStorage.removeItem(accessKey(key));
        return deletedItem;
    };

    const accessKey = function(key) {
        return appKey + " - " + key;
    }

    return {
        saveUser,
        deleteUser,
        getData,
        appKey,
        appSecret,
    };
}();