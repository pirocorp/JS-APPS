//Revealing Module Pattern with IIFE
const userController = (function() {
    const getLogin = function(context) {
        context.loggedIn = userModel.isLoggedIn();

        if (context.loggedIn) {
            context.redirect('#/home');
            notificator.showError("You already logged in");
            return;
        }

        context.loadPartials({
            //Relative paths to handlebar files
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs",
        })
        .then(function () {
            //when dependencies of this template are loaded loads template
            this.partial("../views/user/loginPage.hbs");
        });
    };

    const postLogin = function(context) {
        context.loggedIn = userModel.isLoggedIn();

        if (context.loggedIn) {
            context.redirect('#/home');
            notificator.showError("You already logged in");
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

        userModel.logout()
            .then(kinvey.handler)
            .then(r => {
                storage.deleteUser();        

                context.redirect('#/home');
                notificator.showInfo(`Successfully logged out.`);
            })
            .catch(console.log);        
    };

    const getRegister = function (context) {
        context.loggedIn = userModel.isLoggedIn();

        if (context.loggedIn) {
            context.redirect('#/home');
            notificator.showError("You must be logged out");
            return;
        }

        context.loadPartials({
            //Relative paths to handlebar files
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs",
        })
        .then(function () {
            //when dependencies of this template are loaded loads template
            this.partial("../views/user/registerPage.hbs");
        });
    };

    const postRegister = function (context) {

        context.loggedIn = userModel.isLoggedIn();

        if (context.loggedIn) {
            context.redirect('#/home');
            notificator.showError("You must be logged out");
            return;
        }

        const { username, password, rePassword } = context.params;

        if(!username || !password || !rePassword) {
            notificator.showError("All fields are required");
            return;
        }

        if(password !== rePassword) {
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

    return {
        getLogin,
        postLogin,
        getLogout,
        getRegister,
        postRegister,
    };
})();