//Revealing Module Pattern with IIFE
const userController = (function() {
    function getRegisterView() {
        console.log("Get Register View");
    };

    function postRegisterView() {
        console.log("Post Register View");
    };

    return {
        getRegisterView,
        postRegisterView,
    };
})();