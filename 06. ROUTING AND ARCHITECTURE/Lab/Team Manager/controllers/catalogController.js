//Revealing Module Pattern with IIFE
const catalogController = (function() {
    const getCatalog = async function(context) {              
        context.loggedIn = userModel.isLoggedIn();

        if(!context.loggedIn) {
            notificator.showError("You must be logged in");
            return;
        }

        if(context.loggedIn) {
            context.username = storage.getData('userInfo').username;
            context.hasNoTeam = storage.getData('userInfo').teamId === undefined;
        }

        //First loads empty page
        context.loadPartials({
            //Relative paths to handlebar files
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs",
            team: "../views/catalog/team.hbs",
        })
        .then(function() {
            //when dependencies of this template are loaded loads template
            this.partial("../views/catalog/teamCatalog.hbs");
        });

        //Awaits for response from the server
        await teamModel.getAllTeams()
                .then(kinvey.handler)
                .then(teams => {
                    context.teams = teams
                })
                .catch(console.log);

        //reload the same page with content
        context.loadPartials({
            //Relative paths to handlebar files
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs",
            team: "../views/catalog/team.hbs",
        })
        .then(function() {
            //when dependencies of this template are loaded loads template
            this.partial("../views/catalog/teamCatalog.hbs");
        }); 
    };

    return {
        getCatalog,
    };
})();