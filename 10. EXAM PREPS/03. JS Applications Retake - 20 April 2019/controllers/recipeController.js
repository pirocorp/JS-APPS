const recipeController = (function() {
    const getCategoryImg = function(category) {
        switch(category){
            case "Grain Food":
                return 'https://cdn.pixabay.com/photo/2014/12/11/02/55/corn-syrup-563796__340.jpg';
            case "Vegetables and legumes/beans":
                return 'https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549__340.jpg';
            case "Fruits":
                return 'https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg';
            case "Milk, cheese, eggs and alternatives":
                return 'https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg';
            case "Lean meats and poultry, fish and alternatives":
                return 'https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg';
        }
    };  

    const getCreate = function(context) {
        helper.addHeaderInfo(context);

        if (!context.loggedIn) {
            return;
        }

        helper.loadPartials(context)
            .then(function () {
                this.partial("../views/recipe/create.hbs")
                    .then(() => notificator.showNotificationMessage());
            });
    };

    const postCreate = function(context) {
        helper.addHeaderInfo(context);

        if (!context.loggedIn) {
            return;
        }

        let { category, description, foodImageURL, ingredients, meal, prepMethod } = context.params;

        category = category.trim();
        description = description.trim();
        foodImageURL = foodImageURL.trim();

        ingredients = ingredients.split(', ').map(e => e.trim());
        ingredients = ingredients.filter(e => e !== '');

        meal = meal.trim();
        prepMethod = prepMethod.trim();

        const likesCounter = 0;

        const data = {
            category,
            description,
            foodImageURL,
            ingredients,
            meal,
            prepMethod,
            likesCounter,
        };

        notificator.showLoading();

        recipeModel.create(data)
            .then(helper.handler)
            .then((res) => {
                const notificationMessage = 'Recipe shared successfully!';
                notificator.createNotificationMessage(notificationMessage, notificator.showInfo);

                context.redirect('#/home');
            })
            .catch(console.log)
            .finally(notificator.hideLoading);
    };

    const getDetails = async function(context) {
        const { id } = context.params;
        
        helper.addHeaderInfo(context);

        if (!context.loggedIn) {
            return;
        }

        helper.loadPartials(context)
            .then(function () {
                this.partial("../views/recipe/details.hbs")
                    .then(() => {
                        notificator.showNotificationMessage();
                        notificator.showLoading();
                    });
            });

        context.recipe = await recipeModel.get(id)
            .then(helper.handler)
            .then()
            .catch(console.log);

        context.isAuthor = userModel.isAuthor(context.recipe);

        helper.loadPartials(context)
        .then(function () {
            this.partial("../views/recipe/details.hbs")
                .then(() => {
                    notificator.hideLoading();
                });
        });
    };

    return {
        getCreate,
        postCreate,
        getCategoryImg,
        getDetails,
    };
})();