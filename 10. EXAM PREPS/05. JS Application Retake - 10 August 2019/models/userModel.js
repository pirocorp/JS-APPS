const userModel = (function() {

    const login = function(data) {
        return requester.post('login', 'user', 'Basic', data);
    };

    const logout = function() {
        return requester.post('_logout', 'user', 'Kinvey');
    };

    const register = function(data) {
        return requester.post('', 'user', 'Basic', data)
    };

    const loggedIn = function() {
        return sessionStorage.getItem('authtoken') !== null;
    }; 

    const isAuthor = function(item) {
        return item._acl.creator === sessionStorage.getItem('id');
    };

    const saveCurrentUser = function(user) {   
        sessionStorage.setItem('id', user._id);  
        sessionStorage.setItem('username', user.username);
        sessionStorage.setItem('authtoken', user._kmd.authtoken);
    };

    return {
        login,
        logout,
        register,
        loggedIn,
        saveCurrentUser,
        isAuthor,
    };
})();


