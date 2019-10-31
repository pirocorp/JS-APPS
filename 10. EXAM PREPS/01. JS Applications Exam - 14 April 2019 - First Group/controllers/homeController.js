//Revealing Module Pattern with IIFE
const homeController = (function() {
    const getHome = function(context) {
        context.loggedIn = userModel.isLoggedIn();

        if(context.loggedIn) {
            context.username = storage.getData('userInfo').username;
        }

        context.loadPartials({
            //Relative paths to handlebar files
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs",
        })
        .then(function() {
            //when dependencies of this template are loaded loads template
            this.partial("../views/home/homePage.hbs");
        });
    };

    return {
        getHome,
    };
})();