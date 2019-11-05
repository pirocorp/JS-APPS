const homeController = (function() {
    const getHome = function(context) {

        helper.addHeaderInfo(context);

        helper.loadPartials(context)
            .then(function() {
                this.partial("../views/home/home.hbs")
                    .then(() => notificator.showNotificationMessage());
            });
    };

    return {
        getHome,
    };
})();