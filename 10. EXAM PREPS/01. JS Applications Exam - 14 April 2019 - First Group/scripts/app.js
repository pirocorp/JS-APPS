const app = Sammy("#rootElement", function() {
    this.use("Handlebars", "hbs");

    //Home Controller Routes
    this.get('#/home', homeController.getHome);
    this.get('#/404', homeController.get404)

    //User Controller Routes
    this.get('#/login', userController.getLogin);
    this.post('#/login', userController.postLogin);

    this.get('#/register', userController.getRegister);
    this.post('#/register', userController.postRegister)

    this.get('#/logout', userController.getLogout);

    //Event Controller
    this.get('#/createEvent', eventController.getCreateEvent);
    this.post('#/createEvent', eventController.postCreateEvent);

    this.get('#/events/:id', eventController.getEventDetails);

    this.get('#/editEvent/:id', eventController.getEditEvent);
    this.post('#/editEvent/:id', eventController.postEditEvent);

    this.get('/deleteEvent/:id', eventController.getDeleteEvent);
    this.get('/joinEvent/:id', eventController.getJoinEvent);
});

(() => {
    //default route
    app.run("#/home");
})();