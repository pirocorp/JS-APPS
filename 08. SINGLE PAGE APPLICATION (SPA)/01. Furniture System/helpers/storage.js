const storage = function() {
    const appKey = "kid_HJyV0Bl5r";
    const appSecret = "6cb7dbba18284d288941279593cd9b35";

    const saveUser = function(response) {
        saveData("userInfo", {
            id: response._id,
            username: response.username,
            firstName: response.first_name,
            lastName: response.last_name,                    
        });

        saveData("authToken", response._kmd.authtoken);
    };

    const deleteUser = function() {
        deleteData("userInfo");
        deleteData("authToken");
    };

    const saveData = function(key, value) {
        localStorage.setItem(appKey + key, JSON.stringify(value));
    };

    const getData = function(key) {
        return JSON.parse(localStorage.getItem(appKey + key));
    };

    const deleteData = function(key) {
        const deletedItem = getData(key);
        localStorage.removeItem(appKey + key);
        return deletedItem;
    };

    return {
        saveUser,
        deleteUser,
        getData,
        appKey,
        appSecret,
    };
}();