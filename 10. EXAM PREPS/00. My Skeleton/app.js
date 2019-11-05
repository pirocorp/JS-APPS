window.onload = () => {
    Sammy("#rooter", function() {
        this.use('Handlebars', 'hbs');

        //Home
        this.get('/', homeController.getHome);
        this.get('#/home', homeController.getHome);

        //User
        this.get('#/login', userController.getLogin);
        this.post('#/login', userController.postLogin);

        this.get('#/register', userController.getRegister);
        this.post('#/register', userController.postRegister);

        this.get('#/logout', userController.getLogout);
    }).run();
}