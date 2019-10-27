const userController = function() {
    const getLogin = function(ctx) {
        if (userModel.isLogged()) {
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
            //when dependencies of this template are loaded loads template
            this.partial("views/user/login.hbs");
        });
    };

    const postLogin = function(ctx) {
        if (userModel.isLogged()) {
            ctx.redirect('#/');
            return;
        }

        const { username, password } = ctx.params;

        userModel.login(username, password)        
            .then(kinvey.handler)
            .then(response => {
                storage.saveUser(response);

                ctx.redirect('#/');
                notificator.showInfo(`User ${response.username} has logged in.`);
            })
            .catch(err => {
                console.log(err);
                notificator.showError('Invalid Credentials');
            });
    };

    const getLogout = function(ctx) {
        if (!userModel.isLogged()) {
            ctx.redirect('#/');
            return;
        }

        validator.addContextVariables(ctx);

        userModel.logout()
            .then(kinvey.handler)
            .then(response => {
                storage.deleteUser();

                ctx.redirect('#/');
                notificator.showInfo("You have been successfully logged out");
            })
            .catch(err => {
                notificator.showError(err);
                console.log(err);
            });
    };

    const getRegister = function(ctx) {
        if (userModel.isLogged()) {
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
            //when dependencies of this template are loaded loads template
            this.partial("views/user/register.hbs");
        });        
    };

    const postRegister = function(ctx) {
        if (userModel.isLogged()) {
            ctx.redirect('#/');
            return;
        }

        const data = ctx.params;

        const { username, password, confirmPassword, first_name, last_name } = data;

        const invalidUsername = validator.formControlValidation(username.length < 4, "#username", "At least 4 symbols long");
        const invalidPassword = validator.formControlValidation(password.length < 4, "#password", "At least 4 symbols long");
        const invalidConfirmPassword = validator.formControlValidation(confirmPassword != password, "#confirmPassword", "Both passwords must match");
        const invalidFirstName = validator.formControlValidation(first_name.length < 2, "#firstName", "At least 2 symbols long");
        const invalidLastName = validator.formControlValidation(last_name.length < 2, "#lastName", "At least 2 symbols long");

        if(invalidUsername || invalidPassword || invalidConfirmPassword || invalidFirstName || invalidLastName) {
            return
        }

        userModel.register(data)
            .then(kinvey.handler)
            .then(response => {
                storage.saveUser(response);

                ctx.redirect('#/');
                notificator.showInfo(`User ${response.username} has registered.`);
            })
            .catch(err => {
                notificator.showError(err);
                console.log(err);
            });
    };    

    return {
        getLogin,
        postLogin,
        getLogout,
        getRegister,
        postRegister,
    };
}();