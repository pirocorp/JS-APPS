//Revealing Module Pattern with IIFE
const userController = (function() {
    const getRegister = function (context) {
        context.loggedIn = userModel.isLoggedIn();

        if (context.loggedIn) {
            notificator.showError("You must be logged out");
            context.redirect('#/home');
            return;
        }

        context.loadPartials({
            //Relative paths to handlebar files
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs",
            registerForm: "../views/register/registerForm.hbs",
        })
        .then(function () {
            //when dependencies of this template are loaded loads template
            this.partial("../views/register/registerPage.hbs");
        });
    };

    const postRegister = function (context) {
        context.loggedIn = userModel.isLoggedIn();

        if (context.loggedIn) {
            notificator.showError("You must be logged out");
            context.redirect('#/home');
            return;
        }

        const { username, password, repeatPassword } = context.params;

        if(!username || !password || !repeatPassword) {
            notificator.showError("All fields are required");
            return;
        }

        if(password !== repeatPassword) {
            notificator.showError("Both passwords must match!");
            return;
        }

        //register returns promise
        //promise resolves with notification
        userModel.register(username, password)
            .then(kinvey.handler)
            //response returned by the kinvey
            .then(response => 
                {   
                    storage.saveUser(response);
                    context.redirect('#/home');
                    notificator.showInfo(`Successfully created user: ${response.username}`);
                })
            .catch(notificator.showError);

        //clear after request is send 
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        document.getElementById('repeatPassword').value = '';
    };

    const getLogin = function(context) {
        context.loggedIn = userModel.isLoggedIn();

        if (context.loggedIn) {
            notificator.showError("You already logged in");
            context.redirect('#/home');
            return;
        }

        context.loadPartials({
            //Relative paths to handlebar files
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs",
            loginForm: "../views/login/loginForm.hbs",
        })
        .then(function () {
            //when dependencies of this template are loaded loads template
            this.partial("../views/login/loginPage.hbs");
        });
    };

    const postLogin = function(context) {
        context.loggedIn = userModel.isLoggedIn();

        if (context.loggedIn) {
            notificator.showError("You already logged in");
            context.redirect('#/home');
            return;
        }

        const { username, password } = context.params;

        const data = { username, password };

        if (!username || !password ) {
            notificator.showError("All fields are required");
            return;
        }

        userModel.login(data)
            .then(kinvey.handler)
            .then(response => {
                storage.saveUser(response);
                context.redirect('#/home');
                notificator.showInfo(`Successfully logged in user: ${response.username}`);

            })
            .catch(notificator.showError);

        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    };

    const getLogout = function(context) {
        if(!userModel.isLoggedIn()) {
            context.redirect('#/home');
            return;
        }

        userModel.loggingOut()
            .then(kinvey.handler)
            .then(r => {
                storage.deleteUser();        

                notificator.showInfo(`Successfully logged out.`);
                context.redirect('#/home');
            })
            .catch(console.log);        
    };

    return {
        getRegister,
        postRegister,
        getLogin,
        postLogin,
        getLogout
    };
})();