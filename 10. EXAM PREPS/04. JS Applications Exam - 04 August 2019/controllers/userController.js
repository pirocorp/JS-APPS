const userController = (function() {
    const getLogin = function(context) {
        helper.addHeaderInfo(context);

        if (context.loggedIn) {
            context.redirect('#/home');
            return;
        }

        helper.loadPartials(context)
            .then(function () {
                this.partial("../views/user/login.hbs")
                    .then(() => notificator.showNotificationMessage());
            });
    };

    const postLogin = function(context) {
        helper.addHeaderInfo(context);

        if (context.loggedIn) {
            context.redirect('#/home');
            return;
        }

        const { username, password } = context.params;

        const data = { username, password };

        if (!username || !password ) {
            return;
        }

        notificator.showLoading();

        userModel.login(data)
            .then(helper.handler)
            .then(res => {
                notificationMessage = `Successfully logged user: ${res.username}`;
                notificator.createNotificationMessage(notificationMessage, notificator.showInfo);

                userModel.saveCurrentUser(res);

                context.redirect('#/home');
            })
            .catch(console.log)
            .finally(notificator.hideLoading);
    };

    const getLogout = function(context) {
        helper.addHeaderInfo(context);

        if (!context.loggedIn) {
            context.redirect('#/home');
            return;
        }

        notificator.showLoading();

        userModel.logout()
            .then(helper.handler)
            .then(r => {   
                sessionStorage.clear();

                notificationMessage = 'Successfully logged out';
                notificator.createNotificationMessage(notificationMessage, notificator.showInfo);

                context.redirect('#/home');
            })
            .catch(console.log)
            .finally(() => {
                sessionStorage.clear();
                notificator.hideLoading();
            });      
    };

    const getRegister = function (context) {
        helper.addHeaderInfo(context);

        if (context.loggedIn) {
            context.redirect('#/home');
            return;
        }

        helper.loadPartials(context)
            .then(function () {
                this.partial("../views/user/register.hbs")
                    .then(() => notificator.showNotificationMessage());
            });
    };

    const postRegister = function (context) {
        helper.addHeaderInfo(context);

        if (context.loggedIn) {
            context.redirect('#/home');
            return;
        }

        const { username, password, rePassword } = context.params;

        if (!username || !password || !rePassword) {
            return;
        }

        if (password !== rePassword) {
            return;
        }

        const count = 0;

        const data = {
            username,
            password,
            count,
        };

        notificator.showLoading();

        userModel.register(data)   
            .then(helper.handler)    
            .then((data) => {
                notificationMessage = 'User registration successful.';
                notificator.createNotificationMessage(notificationMessage, notificator.showInfo);

                userModel.saveCurrentUser(data);

                context.redirect('#/home');
            })
            .catch(console.log)
            .finally(notificator.hideLoading); 
    };

    const getProfile = async function(context) {
        helper.addHeaderInfo(context);

        if (!context.loggedIn) {
            context.redirect('#/home');
            return;
        }

        helper.loadPartials(context)
            .then(function () {
                this.partial("../views/user/profile.hbs")
                    .then(() => {
                        notificator.showNotificationMessage();
                        notificator.showLoading();
                    });
            });

        const user = await userModel.getUser()
            .then(helper.handler)
            .catch((res) => {
                console.log
            });

        context.user = user;

        helper.loadPartials(context)
            .then(function () {
                this.partial("../views/user/profile.hbs")
                    .then(() => {
                        notificator.showNotificationMessage();
                        notificator.hideLoading();
                    });
            });
    }

    return {
        getLogin,
        postLogin,
        getLogout,
        getRegister,
        postRegister,
        getProfile
    };
})();