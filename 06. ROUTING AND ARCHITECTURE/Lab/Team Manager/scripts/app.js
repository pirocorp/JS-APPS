const app = Sammy("#main", function() {
    this.use("Handlebars", "hbs");

    //Home
    this.get("#/home", homeController.getHome);
    this.get("#/about", homeController.getAbout);

    //User
    this.get("#/register", userController.getRegister);
    this.post("#/register", userController.postRegister);

    this.get("#/login", userController.getLogin);
    this.post("#/login", userController.postLogin);

    this.get("#/logout", userController.getLogout);

    //Catalog
    this.get("#/catalog", catalogController.getCatalog);

    //Team
    this.get("#/create", teamController.getCreateTeam);
    this.post("#/create", teamController.postCreateTeam);

    this.get("#/edit/:teamId", teamController.getEditTeam);
    this.post("#/edit/:teamId", teamController.postEditTeam);

    this.get("#/catalog/:teamId", teamController.getTeamDetails);

    this.get("#/join/:teamId", teamController.getJoinTeam);

    this.get("#/leave", teamController.leaveTeam);

});

(() => {
    //default route
    app.run("#/home");
})();