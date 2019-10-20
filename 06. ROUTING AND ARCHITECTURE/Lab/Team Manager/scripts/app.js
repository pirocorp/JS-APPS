const app = Sammy("#main", function() {
    this.use("Handlebars", "hbs");

    //Home
    this.get("#/home", homeController.getHomeView);
    this.get("#/about", homeController.getAboutView);

    //User
    this.get("#/register", userController.getRegisterView);
    this.post("#/register", userController.postRegisterView);

    this.get("#/login", userController.getLoginView);
    this.post("#/login", userController.postLoginView);
});

(() => {
    //default route
    app.run("#/home");
})();