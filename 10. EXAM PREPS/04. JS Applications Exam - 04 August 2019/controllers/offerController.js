const offerController = (function() {
    const getCreate = function(context) {
        helper.addHeaderInfo(context);

        if (!context.loggedIn) {
            notificator.createNotificationMessage('Please login first.', notificator.showError);
            context.redirect('#/home');
            return;
        }

        helper.loadPartials(context)
            .then(function () {
                this.partial("../views/offer/create.hbs")
                    .then(() => notificator.showNotificationMessage());
            });
    };

    const postCreate = function(context) {
        helper.addHeaderInfo(context);

        if (!context.loggedIn) {
            notificator.createNotificationMessage('Please login first.', notificator.showError);
            context.redirect('#/home');
            return;
        }

        let { description, pictureUrl, price, product } = context.params;

        price = Number(price);

        const data = {
            description,
            pictureUrl,
            price,
            product
        }

        notificator.showLoading();

        offerModel.create(data)
            .then(helper.handler)
            .then((res) => {
                notificator.createNotificationMessage('Offer was successfully created.', notificator.showInfo);
                context.redirect('#/offer/dashboard');
            })
            .catch((res) => {
                console.log(res);
                notificator.createNotificationMessage('Offer was not created. Please try again later.', notificator.showError);
            })
            .finally(notificator.hideLoading);      
    };

    const getDashboard = async function(context) {
        helper.addHeaderInfo(context);

        if (!context.loggedIn) {
            notificator.createNotificationMessage('Please login first.', notificator.showError);
            context.redirect('#/home');
            return;
        }

        helper.loadPartials(context, {
            offer: "../views/offer/dashboard/offer.hbs"
        })
        .then(function () {
            this.partial("../views/offer/dashboard.hbs")
                .then(() => {
                    notificator.showNotificationMessage();
                    notificator.showLoading();
                });
        });

        let offers = await offerModel.getAll()
            .then(helper.handler)
            .catch((res) => {
                notificator.createNotificationMessage('Error while loading. Please try again.');
                console.log(res);
            });

        offers = offers.map(o => {
            o.isAuthor = userModel.isAuthor(o);

            return o;
        }); 

        context.offers = offers;
        
        helper.loadPartials(context, {
            offer: "../views/offer/dashboard/offer.hbs"
        })
        .then(function () {
            this.partial("../views/offer/dashboard.hbs")
                .then(() => {
                    notificator.showNotificationMessage();
                    notificator.hideLoading();
                });
        });
    };

    const getDetails = async function(context) {
        helper.addHeaderInfo(context);

        if (!context.loggedIn) {
            notificator.createNotificationMessage('Please login first.', notificator.showError);
            context.redirect('#/home');
            return;
        }

        helper.loadPartials(context)
            .then(function () {
                this.partial("../views/offer/details.hbs")
                    .then(() => {
                        notificator.showNotificationMessage();
                        notificator.showLoading();
                    });
            });

        const { id } = context.params;

        const offer = await offerModel.get(id)
            .then(helper.handler)
            .catch((res) => {
                notificator.createNotificationMessage('Error while loading. Please try again.');
                console.log(res);
            });

        context.offer = offer;

        helper.loadPartials(context)
            .then(function () {
                this.partial("../views/offer/details.hbs")
                    .then(() => {
                        notificator.showNotificationMessage();
                        notificator.hideLoading();
                    });
            });
    };

    const getEdit = async function(context) {
        helper.addHeaderInfo(context);

        if (!context.loggedIn) {
            notificator.createNotificationMessage('Please login first.', notificator.showError);
            context.redirect('#/home');
            return;
        }

        helper.loadPartials(context)
            .then(function () {
                this.partial("../views/offer/edit.hbs")
                    .then(() => {
                        notificator.showNotificationMessage();
                        notificator.showLoading();
                    });
            });

        const { id } = context.params;
        
        const offer = await offerModel.get(id)
            .then(helper.handler)
            .catch((res) => {
                notificator.createNotificationMessage('Error while loading. Please try again.');
                console.log(res);
            });

        const isAuthor = userModel.isAuthor(offer);

        if (!isAuthor) {
            notificator.createNotificationMessage('Only owner can change this offer.', notificator.showError);
            context.redirect('#/home');
            return;
        }

        context.offer = offer;

        helper.loadPartials(context)
            .then(function () {
                this.partial("../views/offer/edit.hbs")
                    .then(() => {
                        notificator.showNotificationMessage();
                        notificator.hideLoading();
                    });
            });
    };

    const postEdit = function(context) {
        helper.addHeaderInfo(context);

        if (!context.loggedIn) {
            notificator.createNotificationMessage('Please login first.', notificator.showError);
            context.redirect('#/home');
            return;
        }

        let { description, id, pictureUrl, price, product } = context.params;
        price = Number(price);

        const data = {
            description,
            pictureUrl,
            price,
            product,
        };

        notificator.showLoading();

        offerModel.update(id, data)
            .then(helper.handler)
            .then((res) => {
                notificator.createNotificationMessage('Offer was successfully updated.', notificator.showInfo);
                context.redirect('#/offer/dashboard');
            })
            .catch((res) => {
                console.log(res);
                notificator.createNotificationMessage('Offer was not updated. Please try again later.', notificator.showError);
            })
            .finally(notificator.hideLoading); 
    };

    const getDelete = async function(context) {
        helper.addHeaderInfo(context);

        if (!context.loggedIn) {
            notificator.createNotificationMessage('Please login first.', notificator.showError);
            context.redirect('#/home');
            return;
        }

        helper.loadPartials(context)
            .then(function () {
                this.partial("../views/offer/delete.hbs")
                    .then(() => {
                        notificator.showNotificationMessage();
                        notificator.showLoading();
                    });
            });

        const { id } = context.params;

        const offer = await offerModel.get(id)
            .then(helper.handler)
            .catch((res) => {
                notificator.createNotificationMessage('Error while loading. Please try again.');
                console.log(res);
            });

        const isAuthor = userModel.isAuthor(offer);

        if (!isAuthor) {
            notificator.createNotificationMessage('Only owner can delete this offer.', notificator.showError);
            context.redirect('#/home');
            return;
        }

        context.offer = offer;

        helper.loadPartials(context)
            .then(function () {
                this.partial("../views/offer/delete.hbs")
                    .then(() => {
                        notificator.showNotificationMessage();
                        notificator.hideLoading();
                    });
            });
    };

    const postDelete = function(context) {
        helper.addHeaderInfo(context);

        if (!context.loggedIn) {
            notificator.createNotificationMessage('Please login first.', notificator.showError);
            context.redirect('#/home');
            return;
        }

        const { id } = context.params;
        notificator.showLoading();

        offerModel.del(id)
            .then(helper.handler)
            .then(res => {
                notificator.createNotificationMessage('Offer was successfully deleted.', notificator.showInfo);
                context.redirect('#/offer/dashboard');
            })
            .catch(res => {
                console.log(res);
                notificator.createNotificationMessage('Offer was not deleted. Please try again later.', notificator.showError);
            })
            .finally(notificator.hideLoading);
    };

    const getBuy = function(context) {
        helper.addHeaderInfo(context);

        if (!context.loggedIn) {
            notificator.createNotificationMessage('Please login first.', notificator.showError);
            context.redirect('#/home');
            return;
        }

        const { id } = context.params;

        notificator.showLoading();

        userModel.buyItem(id)
            .then(helper.handler)
            .then(res => {
                notificator.showInfo('Item was purchased successfully.');
                const count = Number(sessionStorage.getItem('count'));
                sessionStorage.setItem('count', count + 1);
            })
            .catch(res => {
                console.log(res);
                notificator.showInfo('Offer was not purchased.');
            })
            .finally(notificator.hideLoading);
    };

    return {
        getCreate,
        postCreate,
        getDashboard,
        getDetails,
        getEdit,
        postEdit,
        getDelete,
        postDelete,
        getBuy
    };
})();