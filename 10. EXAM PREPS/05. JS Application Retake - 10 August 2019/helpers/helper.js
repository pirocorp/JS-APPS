const helper = function () {
    const handler = async function (response) {
        function logError(err, errorMessage) {
            console.warn(errorMessage);
            console.warn(err.error);
            console.warn(err.description);
            console.warn(err.debug);
        };

        if(response.status === 409 || response.status === 401) {
            const errorMessage = `Error: ${response.status} - ${response.statusText}`;

            const msg = await response.json().then(x => x.description);
            notificator.showError(msg);

            let error = new Error(errorMessage);
            error.name = '';

            throw error;
        } else if (response.status >= 400) {
            const errorMessage = `Something went wrong. Error: ${response.status} - ${response.statusText}`;
            response.json().then(err => logError(err, errorMessage));

            let error = new Error(errorMessage);
            error.name = '';

            throw error;
        }

        if (response.status !== 204) {
            response = response.json();
        }

        return response;
    };

    const addHeaderInfo = function (context) {
        const loggedIn = userModel.loggedIn();

        if(loggedIn) {
            context.loggedIn = loggedIn;
            context.username = sessionStorage.getItem('username');
        }
    };

    const loadPartials = function (context, externalPartials) {
        let defaultPartials = {
            header: "./views/common/header.hbs",
            footer: "./views/common/footer.hbs",
        };

        if (externalPartials) {
            for (const key in externalPartials) {
                const element = externalPartials[key];
                
                defaultPartials[key] = element;
            }
        }

        return context.loadPartials(defaultPartials);
    };

    return {
        handler,
        addHeaderInfo,
        loadPartials,
    };
}();