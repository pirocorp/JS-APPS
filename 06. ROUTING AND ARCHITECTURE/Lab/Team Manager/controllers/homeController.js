//Revealing Module Pattern with IIFE
const homeController = (function() {

    const getHomeView = function(context) {
        context.loadPartials({
            //Relative paths to handlebar files
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs",
        })
        .then(function() {
            //when dependencies of this template are loaded loads template
            this.partial("../views/home/home.hbs");
        });
    };

    const getAboutView = function(context) {
        context.loadPartials({
            //Relative paths to handlebar files
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs",
        })
        .then(function () {
            //when dependencies of this template are loaded loads template
            this.partial("../views/about/about.hbs");
        });
    };

    return {
        getHomeView,
        getAboutView
    };
})();