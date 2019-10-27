const homeController = function() {
    const getHome = function(ctx) {
        validator.addContextVariables(ctx);

        ctx.loadPartials({
            //Relative paths to handlebar files
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs",
        })
        .then(function () {
            //when dependencies of this template are loaded loads template
            this.partial("../views/home/home.hbs");
        });
    };

    return {
        getHome,
    };
}();