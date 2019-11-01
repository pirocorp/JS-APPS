const eventController = (function() {
    const getCreateEvent = function(context) {
        context.loggedIn = userModel.isLoggedIn();

        if (!context.loggedIn) {
            context.redirect('#/home');
            return;
        }

        if (context.loggedIn) {
            context.username = storage.getData('userInfo').username;
        }

        context.loadPartials({
            header: '../views/common/header.hbs', 
            footer: '../views/common/footer.hbs',
        })
        .then(function() {
            this.partial('../views/event/createEvent.hbs');
        });
    };

    const postCreateEvent = function(context) {
        context.loggedIn = userModel.isLoggedIn();

        if (!context.loggedIn) {
            context.redirect('#/home');
            return;
        }        

        let data = {
            ...context.params,
            peopleInterestedIn: 0,
            organizer: storage.getData("userInfo").username,
        };

        notificator.showLoading();

        eventModel.createEvent(data)
            .then(kinvey.handler)
            .then(response => {
                context.redirect('#/home');
                notificator.showInfo(`Event ${response.name} was created successfully`);
            })
            .catch(notificator.showError)
            .finally(notificator.hideLoading);
    };

    const getEventDetails = async function(context) {
        context.loggedIn = userModel.isLoggedIn();

        if (!context.loggedIn) {
            context.redirect('#/home');
            return;
        }

        if (context.loggedIn) {
            context.username = storage.getData('userInfo').username;
        }

        const { id } = context.params;
        
        try{
            context.event = await eventModel.getEventDetails(id)
                .then(response => kinvey.handler(response, context));

            context.isAuthor = userModel.isAuthor(context.event); 

            context.loadPartials({
                header: '../views/common/header.hbs',
                footer: '../views/common/footer.hbs',
            })
            .then(function () {
                this.partial('../views/event/detailsEvent.hbs');
            });
        } catch(err) {
            console.log(err);
        }
    };

    const getEditEvent = async function(context) {
        notificator.showLoading();

        context.loggedIn = userModel.isLoggedIn();

        if (!context.loggedIn) {
            context.redirect('#/home');
            return;
        }

        if (context.loggedIn) {
            context.username = storage.getData('userInfo').username;
        }

        const { id } = context.params;

        try {
            context.event = await eventModel.getEventDetails(id)
                .then(response => kinvey.handler(response, context))

            context.isAuthor = userModel.isAuthor(context.event);

            if (context.isAuthor) {
                context.loadPartials({
                    header: '../views/common/header.hbs',
                    footer: '../views/common/footer.hbs',
                })
                .then(function () {
                    this.partial('../views/event/editEvent.hbs');
                });
            } else {
                context.redirect('#/home');
                return;
            }
        } catch (error) {
            console.log(error);
        } finally {
            notificator.showLoading();
        }
    };

    const postEditEvent = function(context) {
        context.loggedIn = userModel.isLoggedIn();

        if (!context.loggedIn) {
            context.redirect('#/home');
            return;
        }

        if (context.loggedIn) {
            context.username = storage.getData('userInfo').username;
        }

        if (context.username !== context.params.organizer) {
            context.redirect('#/home');
            return;
        }

        const { dateTime, description, id, imageURL, name, organizer, peopleInterestedIn } = context.params;

        const data = {
            dateTime, 
            description, 
            imageURL, 
            name,
            organizer,
            peopleInterestedIn,
        };

        notificator.showLoading();

        eventModel.editEvent(id, data)
            .then(kinvey.handler)
            .then(r => {
                notificator.hideLoading();
                notificator.showInfo(`Successfully edited event: ${name}`);
                context.redirect('#/home');
            })
            .catch(notificator.showError);
    };

    const getDeleteEvent = async function(context) {
        context.loggedIn = userModel.isLoggedIn();

        if (!context.loggedIn) {
            context.redirect('#/home');
            return;
        }

        if (context.loggedIn) {
            context.username = storage.getData('userInfo').username;
        }

        const { id } = context.params;

        notificator.showLoading();

        const event = await eventModel.getEventDetails(id)
            .then(kinvey.handler)
            .catch(console.log);

        if (context.username !== event.organizer) {
            context.redirect('#/home');
            return;
        }

        eventModel.deleteEvent(id)
            .then(kinvey.handler)
            .then(() => context.redirect('#/home'))
            .catch(console.log)
            .finally(notificator.hideLoading);
    };

    const getJoinEvent = async function(context) {
        notificator.showLoading();

        context.loggedIn = userModel.isLoggedIn();

        if (!context.loggedIn) {
            context.redirect('#/home');
            return;
        }

        if (context.loggedIn) {
            context.username = storage.getData('userInfo').username;
        }

        const { id } = context.params;
        
        const currentEvent = await eventModel.getEventDetails(id)
            .then(kinvey.handler)
            .catch(console.log);

        const data = {
            dateTime: currentEvent.dateTime,
            description: currentEvent.description,
            imageURL: currentEvent.imageURL,
            name: currentEvent.name,
            organizer: currentEvent.organizer,
            peopleInterestedIn: Number(currentEvent.peopleInterestedIn) + 1,
        };

        eventModel.editEvent(id, data)
            .then(kinvey.handler)
            .then(r => {
                notificator.hideLoading();
                context.redirect('#/home');
            })
            .catch(console.log);
    };

    return {
        getCreateEvent,
        postCreateEvent,
        getEventDetails,
        getEditEvent,
        postEditEvent,
        getDeleteEvent,
        getJoinEvent,
    };
})();