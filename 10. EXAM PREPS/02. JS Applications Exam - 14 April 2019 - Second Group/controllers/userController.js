const userController = (function() {
    const getLogin = function(context) {
        helper.addHeaderInfo(context);

        if (context.loggedIn) {
            return;
        }

        helper.loadPartials(context)
            .then(function () {
                this.partial("../views/user/login.hbs");
            });
    };

    const postLogin = function(context) {
        helper.addHeaderInfo(context);

        if (context.loggedIn) {
            return;
        }

        const { username, password } = context.params;

        const data = { username, password };

        if (!username || !password ) {
            return;
        }

        requester.post('login', 'user', 'Basic', data)
            .then(helper.handler)
            .then(res => {
                saveSession(res);

                context.redirect('#/home');
            })
            .catch(console.log);
    };

    const getLogout = function(context) {
        helper.addHeaderInfo(context);

        if (!context.loggedIn) {
            return;
        }

        requester.post('_logout', 'user', 'Kinvey')
            .then(helper.handler)
            .then(r => {   
                sessionStorage.clear();
                context.redirect('#/home');
            })
            .catch(console.log)
            .finally(() => {
                sessionStorage.clear();
            });      
    };

    const getRegister = function (context) {
        helper.addHeaderInfo(context);

        if (context.loggedIn) {
            homeController.getHome(context);
            return;
        }

        helper.loadPartials(context)
            .then(function () {
                this.partial("../views/user/register.hbs");
            });
    };

    const postRegister = function (context) {
        helper.addHeaderInfo(context);

        if (context.loggedIn) {
            homeController.getHome(context);
            return;
        }

        const { username, password, rePassword } = context.params;

        if(!username || !password || !rePassword) {
            return;
        }

        if(password !== rePassword) {
            return;
        }

        const data = {
            username,
            password
        };

        requester.post('', 'user', 'Basic', data)   
            .then(helper.handler)    
            .then((data) => {
                saveSession(data);

                context.redirect('#/home');
            })
            .catch(console.log);  
    };

    const saveSession = function(data) {
        sessionStorage.setItem('username', data.username);
        sessionStorage.setItem('authtoken', data._kmd.authtoken);
        sessionStorage.setItem('userId', data._id);
    };

    return {
        getLogin,
        postLogin,
        getLogout,
        getRegister,
        postRegister,
    };
})();