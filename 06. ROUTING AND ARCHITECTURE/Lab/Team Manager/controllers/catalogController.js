//Revealing Module Pattern with IIFE
const catalogController = (function() {
    const getCatalog = async function(context) {              
        context.loggedIn = userModel.isLoggedIn();

        if(!context.loggedIn) {
            notificator.showError("You must be logged in");
            return;
        }

        context.username = storage.getData('userInfo').username;
        context.hasNoTeam = storage.getData('userInfo').teamId === undefined;

        function renderPage(context) {
            context.loadPartials({
                //Relative paths to handlebar files
                header: "../views/common/header.hbs",
                footer: "../views/common/footer.hbs",
                team: "../views/catalog/team.hbs",
            })
            .then(function () {
                //when dependencies of this template are loaded loads template
                this.partial("../views/catalog/teamCatalog.hbs");
            });
        }

        //First render empty page
        renderPage(context);

        //Awaits for response from the server
        await teamModel.getAllTeams()
                .then(kinvey.handler)
                .then(teams => {
                    context.teams = teams
                })
                .catch(console.log);

        //Render again page after data is received from server
        renderPage(context);
    };

    return {
        getCatalog,
    };
})();