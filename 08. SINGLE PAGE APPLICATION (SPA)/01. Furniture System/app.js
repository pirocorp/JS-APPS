const app = Sammy('#main-container', function() {
    //Template engine handlebars
    this.use('Handlebars', 'hbs');

    //Home Controller
    this.get('#/home', homeController.getHome);

    //User Controller
    this.get('#/login', userController.getLogin);
    this.post('#/login', userController.postLogin);

    this.get('#/logout', userController.getLogout);

    this.get('#/register', userController.getRegister);
    this.post('#/register', userController.postRegister);

    //Furniters Controller
    this.get('#/furniture/create', furnitureController.getCreate);
    this.post('#/furniture/create', furnitureController.postCreate);

    this.get('#/furniture/all', furnitureController.getAll);
    this.get('#/furniture/details/:id', furnitureController.getItem);
    this.get('#/furniture/mine', furnitureController.getMine);
    this.get('#/furniture/delete/:id', furnitureController.deleteItem);
});

$(() => app.run('#/home'));