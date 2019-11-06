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

        //Cause
        this.get('#/cause/create', causeController.getCreate);
        this.post('#/cause/create', causeController.postCreate);

        this.get('#/cause/dashboard', causeController.getDashboard);
        this.get('#/cause/details/:id', causeController.getDetails);

        this.get('#/cause/delete/:id', causeController.getDelete);
        this.post('#/cause/donate/:id', causeController.postDonate);

    }).run();
}