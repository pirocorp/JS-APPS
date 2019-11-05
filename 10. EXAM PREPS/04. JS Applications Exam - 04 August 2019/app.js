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

        this.get('#/profile', userController.getProfile);

        //Offer
        this.get('#/offer/create', offerController.getCreate);
        this.post('#/offer/create', offerController.postCreate);

        this.get('#/offer/edit/:id', offerController.getEdit);
        this.post('#/offer/edit/:id', offerController.postEdit);

        this.get('#/offer/delete/:id', offerController.getDelete);
        this.post('#/offer/delete/:id', offerController.postDelete);

        this.get('#/offer/dashboard', offerController.getDashboard);
        this.get('#/offer/:id', offerController.getDetails);
        this.get('#/offer/buy/:id', offerController.getBuy)
    }).run();
}