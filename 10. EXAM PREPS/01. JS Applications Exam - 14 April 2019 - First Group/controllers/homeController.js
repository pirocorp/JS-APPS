//Revealing Module Pattern with IIFE
const homeController = (function() {
    const getHome = async function(context) {
        context.loggedIn = userModel.isLoggedIn();

        if(context.loggedIn) {
            context.username = storage.getData('userInfo').username;
            context.events = await eventModel.getAllEvents()
                .then(kinvey.handler)
                .catch(console.log);
        }        

        context.loadPartials({
            //Relative paths to handlebar files
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs",
            notFound: "../views/event/notFound.hbs",
            eventListItem: "../views/event/eventListItem.hbs",
        })
        .then(function() {
            //when dependencies of this template are loaded loads template
            this.partial("../views/home/homePage.hbs");
        });
    };

    const get404 = function(context) {
        context.loggedIn = userModel.isLoggedIn();

        if (context.loggedIn) {
            context.username = storage.getData('userInfo').username;
        } 

        context.loadPartials({
            //Relative paths to handlebar files
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs",
        })
        .then(function () {
            //when dependencies of this template are loaded loads template
            this.partial("../views/404.hbs");
        });
    };

    return {
        getHome,
        get404
    };
})();