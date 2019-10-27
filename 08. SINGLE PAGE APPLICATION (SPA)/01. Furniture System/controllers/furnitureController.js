const furnitureController = function() {
    const getCreate = function(ctx) {
        if (!userModel.isLogged()) {
            ctx.redirect('#/');
            return;
        }

        validator.addContextVariables(ctx);

        ctx.loadPartials({
            //Relative paths to handlebar files
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs",
        })
        .then(function () {
            this.partial("./views/furnitures/createFurniture.hbs");
        });
    };

    const postCreate = function(ctx) {
        if (!userModel.isLogged()) {
            ctx.redirect('#/');
            return;
        }

        const data = ctx.params;

        const { make, model, year, description, price, image, material } = data;

        const urlRegex = /(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/g;

        const invalidMake = validator.formControlValidation(make.length < 4, "#new-make", "At least 4 symbols long");
        const invalidModel = validator.formControlValidation(model.length < 4, "#new-model", "At least 4 symbols long");
        const invalidYear = validator.formControlValidation(year < 1950 || year > 2050, "#new-year", "Year must be between 1950 and 2050");
        const invalidDescription = validator.formControlValidation(description.length <= 10, "#new-description", "Description must be more than 10 symbols");
        const invalidPrice = validator.formControlValidation(Number(price) <= 0, "#new-price", "Price must be a positive number");
        const invalidImage = validator.formControlValidation(!urlRegex.test(image), "#new-image", "Image URL is required");

        if(invalidMake || invalidModel || invalidYear || invalidDescription || invalidPrice || invalidImage) {
            return;
        }

        furnitureModel.create(ctx.params)
            .then(kinvey.handler)
            .then(response => {                   
                ctx.redirect('#/furniture/mine');
                notificator.showInfo(`Furniture ${response.make} - ${response.model} was created successfully`);
            })
            .catch(err => {
                console.log(err);
                notificator.showError("Something went wrong");
            });        
    };

    const getAll = async function(ctx) {
        if (!userModel.isLogged()) {
            ctx.redirect('#/');
            return;
        }

        validator.addContextVariables(ctx);

        const furnitures = await furnitureModel.getAll()
            .then(kinvey.handler)
            .catch(err => {
                console.log(err);
                notificator.showError("Something went wrong");
            });

        ctx.furnitures = furnitures;

        ctx.loadPartials({
            //Relative paths to handlebar files
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs",
        })
        .then(function () {
            this.partial("./views/furnitures/all.hbs");
        });        
    };

    const getItem = async function(ctx) {
        if (!userModel.isLogged()) {
            ctx.redirect('#/');
            return;
        }

        validator.addContextVariables(ctx);

        let { id } = ctx.params;
        id = id.substring(1);

        const furniture = await furnitureModel.getFurniture(id)
            .then(kinvey.handler)
            .catch(err => {
                console.log(err);
                notificator.showError("Something went wrong");
            });

        ctx.furniture = furniture;

        ctx.loadPartials({
            //Relative paths to handlebar files
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs",
        })
        .then(function () {
            this.partial("./views/furnitures/details.hbs");
        });
    };

    const getMine = async function(ctx) {
        if (!userModel.isLogged()) {
            ctx.redirect('#/');
            return;
        }

        validator.addContextVariables(ctx);

        const currentUserId = storage.getData("userInfo").id;

        const furnitures = await furnitureModel.getAll()
            .then(kinvey.handler)
            .catch(err => {
                console.log(err);
                notificator.showError("Something went wrong");
            });

        ctx.furnitures = furnitures.filter(x => x._acl.creator === currentUserId);

        ctx.loadPartials({
            //Relative paths to handlebar files
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs",
        })
        .then(function () {
            this.partial("./views/furnitures/mine.hbs");
        });
    };

    const deleteItem = async function(ctx) {
        if (!userModel.isLogged()) {
            ctx.redirect('#/');
            return;
        }

        const currentUserId = storage.getData("userInfo").id;
        let { id } = ctx.params;
        id = id.substring(1);

        const currentItem = await furnitureModel.getFurniture(id)
            .then(kinvey.handler)
            .catch(console.log)

        if (currentItem._acl.creator !== currentUserId) {
            notificator.showError("Insufficient credential for this action.");
            return;
        }

        furnitureModel.deleteFurniture(id)
            .then(kinvey.handler)
            .then(response => {
                ctx.redirect('#/furniture/mine');
                notificator.showInfo(`Successfully deleted item: ${currentItem.model}`)
            })
            .catch(err => {
                console.log(err);
                notificator.showError("Something went wrong");
            });
    }    

    return{
        getCreate,
        postCreate,
        getAll,
        getItem,
        getMine,
        deleteItem
    };
}();