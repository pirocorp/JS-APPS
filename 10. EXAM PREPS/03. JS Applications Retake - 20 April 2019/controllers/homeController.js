const homeController = (function() {
    const getHome = async function(context) {
       helper.addHeaderInfo(context);

       if(context.loggedIn) {
            const recipes = await recipeModel.getAll()
                .then(helper.handler)
                .catch(console.log);  
                
            context.recipes = recipes.map(r => {
                r.categoryImg = recipeController.getCategoryImg(r.category);

                if(r.ingredients.length > 3) {
                    r.ingredients = r.ingredients.slice(0, 3);
                    r.ingredients.push('...')
                }

                return r;
            });
       }    

        helper.loadPartials(context, {
            recipeListItem: '../views/recipe/recipeListItem.hbs'
        })
        .then(function() {
            this.partial("../views/home/home.hbs")
                .then(() => notificator.showNotificationMessage());
        });
    };

    return {
        getHome,
    };
})();