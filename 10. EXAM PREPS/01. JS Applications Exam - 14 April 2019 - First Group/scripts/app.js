const app = Sammy("#rootElement", function() {
    this.use("Handlebars", "hbs");

    //Home Controller Routes
    this.get('#/home', homeController.getHome);

    //User Controller Routes
    this.get('#/login', userController.getLogin);
    this.post('#/login', userController.postLogin);

    this.get('#/register', userController.getRegister);
    this.post('#/register', userController.postRegister)

    this.get('#/logout', userController.getLogout);

    //Event Controller
});

(() => {
    //default route
    app.run("#/home");
})();