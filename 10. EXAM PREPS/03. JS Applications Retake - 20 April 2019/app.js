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

        //Recipe
        this.get('#/recipe/create', recipeController.getCreate);
        this.post('#/recipe/create', recipeController.postCreate);

        this.get('#/recipe/edit/:id', recipeController.getEdit);
        this.post('#/recipe/edit/:id', recipeController.postEdit);

        this.get('#/recipe/:id', recipeController.getDetails);
        this.get('#/recipe/delete/:id', recipeController.getDelete);
        this.get('#/recipe/like/:id', recipeController.getLike);

        
    }).run();
}