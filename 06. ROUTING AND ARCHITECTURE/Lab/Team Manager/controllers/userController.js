//Revealing Module Pattern with IIFE
const userController = (function() {
    const getRegisterView = function (context) {
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

    const postRegisterView = function (context) {
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
        userModel.register(username, password)
            .then(kinvey.handler)
            .then(r => notificator.showInfo(`Successfully created user: ${r.username}`))
            .catch(notificator.showError);

        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        document.getElementById('repeatPassword').value = '';
    };

    const getLoginView = function(context) {
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

    const postLoginView = function() {
        console.log("Post Login View");
    };

    return {
        getRegisterView,
        postRegisterView,
        getLoginView,
        postLoginView
    };
})();