const app = Sammy("#main", function() {
    this.use("Handlebars", "hbs");

    this.get("#/home", homeController.getHomeView)

    this.get("#/register", userController.getRegisterView);
    this.post("#/register", userController.postRegisterView);
});

(() => {
    //default route
    app.run("#/home");
})();