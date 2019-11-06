const causeController = (function() {
    const getCreate = function(context) {
        helper.addHeaderInfo(context);

        if (!context.loggedIn) {
			context.redirect('#/home');
            return;
        }

        helper.loadPartials(context)
            .then(function () {
                this.partial("../views/cause/create.hbs");
            });
    };

    const postCreate = function(context) {
        helper.addHeaderInfo(context);

        if (!context.loggedIn) {
			context.redirect('#/home');
            return;
        }

        let { cause, description, neededFunds, pictureUrl } = context.params;

        if(!cause || !description || !neededFunds || !pictureUrl) {
            notificator.showError('The input fields must be non-empty strings');
            return;
        }

        if(isNaN(neededFunds)) {
            notificator.showError('The input Your needed funds must be number');
            return;
        }

        neededFunds = Number(neededFunds);

        const data = {
            cause, 
            description, 
            neededFunds, 
            pictureUrl,
            donors: [],
            collectedFunds: 0,
        };

        notificator.showLoading();

        causeModel.create(data)
            .then(helper.handler)
            .then((res) => {
                notificationMessage = `Successfully created cause: ${res.cause}`;
                notificator.showInfo(notificationMessage);                

                context.redirect('#/cause/dashboard');
            })
            .catch(console.log)
            .finally(notificator.hideLoading);
    };

    const getDashboard = async function(context) {
        helper.addHeaderInfo(context);

        if (!context.loggedIn) {
			context.redirect('#/home');
            return;
        }

        notificator.showLoading();

        context.causes = await causeModel.getAll()
            .then(helper.handler)
            .catch(console.log)

        helper.loadPartials(context)
            .then(function () {
                this.partial("../views/cause/dashboard.hbs")
                    .then(notificator.hideLoading);
            });
    };

    const getDetails = async function(context) {
        helper.addHeaderInfo(context);

        if (!context.loggedIn) {
			context.redirect('#/home');
            return;
        }

        const { id } = context.params;

        notificator.showLoading();

        context.cause = await causeModel.get(id)
            .then(helper.handler)
            .catch(console.log);

        context.cause.collectedFunds = context.cause.collectedFunds.toFixed(2);
        context.cause.neededFunds = context.cause.neededFunds.toFixed(2);
        context.cause.isAuthor = userModel.isAuthor(context.cause);

        helper.loadPartials(context)
            .then(function () {
                this.partial("../views/cause/details.hbs")
                    .then(notificator.hideLoading);
            });
    };

    const postDonate = function(context) {
        helper.addHeaderInfo(context);

        if (!context.loggedIn) {
			context.redirect('#/home');
            return;
        }

        const { id, currentDonation } = context.params;

        if(isNaN(currentDonation)) {
            notificator.showError("Donation amount must be number");
        }

        notificator.showLoading();

        causeModel.get(id)
            .then(helper.handler)
            .then((cause) => {
                if(userModel.isAuthor(cause)) {
                    notificator.hideLoading();
                    notificator.showError("Author can't donate to it's own cause");
                    context.redirect('#/home');
                }
        
                cause.collectedFunds += Number(currentDonation);
                cause.donors.push(sessionStorage.getItem('username'));
        
                causeModel.update(id, cause)
                    .then(helper.handler)
                    .then((res) => {
                        notificator.showInfo('Donation successful');
                        context.redirect(`#/cause/details/${id}`);
                    })
                    .catch(console.log)
                    .finally(notificator.hideLoading)
            })
            .catch(console.log);     
    };

    const getDelete = function(context) {
        helper.addHeaderInfo(context);

        if (!context.loggedIn) {
			context.redirect('#/home');
            return;
        }

        const { id } = context.params;

        notificator.showLoading();

        causeModel.get(id)
            .then(helper.handler)
            .then((cause) => {
                if(!userModel.isAuthor(cause)) {
                    notificator.hideLoading();
                    notificator.showError("Only author can delete own cause");
                    context.redirect('#/home');
                }

                causeModel.del(id)
                    .then(helper.handler)
                    .then((res) => {
                        notificator.showInfo('Deletion successful');
                        context.redirect('#/cause/dashboard');
                    })
                    .catch(console.log)
                    .finally(notificator.hideLoading)
            })
            .catch(console.log); 
    };
    
    return {
        getCreate,
        postCreate,
        getDashboard,
        getDetails,
        postDonate,
        getDelete,
    };
})();