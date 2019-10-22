//Revealing Module Pattern with IIFE
const teamController = (function() {
    const getCreateTeam = function(context) {
        context.loggedIn = userModel.isLoggedIn();

        if(!context.loggedIn) {
            notificator.showError("You must be logged in");
            context.redirect('#/home');
            return;
        }

        context.username = storage.getData('userInfo').username;

        context.loadPartials({
            //Relative paths to handlebar files
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs",
            createForm: "../views/create/createForm.hbs",
        }).then(function() {
            //when dependencies of this template are loaded loads template
            this.partial("../views/create/createPage.hbs");
        });
    };

    const postCreateTeam = function(context) {
        context.loggedIn = userModel.isLoggedIn();

        const { name, comment } = context.params;        

        if(!context.loggedIn) {
            notificator.showError("You must be logged in");
            context.redirect('#/home');
            return;
        }

        if (storage.getData("userInfo").teamId) {
            notificator.showError("You must be not a member of any team");
            context.redirect('#/home');
            return;
        }

        if(!name) {
            notificator.showError("Team name is required");
            return;
        }        

        const username = storage.getData("userInfo").username;

        const data = {
            name,
            comment,
            teamMembers: [username],
        };

        let newTeamName;

        teamModel.createTeam(data)
            .then(kinvey.handler)
            .then(r => {
                notificator.showInfo(`Successfully created team: ${r.name}`);
                newTeamName = r.name;
                return userModel.setTeam(r._id);
            })
            .then(kinvey.handler)
            .then(response => {
                storage.saveUser(response);
                notificator.showInfo(`Successfully joined team ${newTeamName}`);
                context.redirect('#/catalog');
            }).catch(console.log);

        document.getElementById('name').value = '';
        document.getElementById('comment').value = '';
    };

    const getTeamDetails = async function(context) {
        context.username = storage.getData("userInfo").username;
        context.loggedIn = userModel.isLoggedIn();

        if(!context.loggedIn) {
            notificator.showError("You must be logged in");
            return;
        }

        context.teamId = context.params.teamId.substring(1);

        function renderPage(context) {
            context.loadPartials({
                //Relative paths to handlebar files
                header: "../views/common/header.hbs",
                footer: "../views/common/footer.hbs",
                teamMember: "../views/catalog/teamMember.hbs",
                teamControls: "../views/catalog/teamControls.hbs",
            })
            .then(function () {
                //when dependencies of this template are loaded loads template
                this.partial("../views/catalog/details.hbs");
            });
        }

        //First render empty page
        renderPage(context);
        
        //Awaits for response from the server
        await teamModel.getTeam(context.teamId)
            .then(kinvey.handler)
            .then(res => {
                const currentUserId = storage.getData("userInfo")._id;

                context.name = res.name;
                context.comment = res.comment;
                context.members = res.teamMembers.map(x => { return { username: x } });
                context.isOnTeam = storage.getData("userInfo").teamId === res._id;
                context.isAuthor =  res._acl.creator === currentUserId;
            })
            .catch(console.log);

        //Render again page after data is received from server
        renderPage(context);
    };

    const getJoinTeam = function(context) {
        context.loggedIn = userModel.isLoggedIn();
        const teamId = context.params.teamId.substring(1);

        if(!context.loggedIn) {
            notificator.showError("You must be logged in");
            context.redirect('#/home');
            return;
        }

        if(storage.getData("userInfo").teamId) {
            notificator.showError("You are already member of another team.")
            context.redirect('#/home');
            return;
        }

        const currentUser = storage.getData("userInfo").username;

        userModel.setTeam(teamId)
            .then(kinvey.handler)
            .then(r => teamModel.getTeam(r.teamId))
            .then(kinvey.handler)
            .then(r => {
                const teamId = r._id;

                let team = r.teamMembers;
                team.push(currentUser);

                const data = {
                    name: r.name,
                    comment: r.comment,
                    teamMembers: team,
                };

                return teamModel.updateTeam(teamId, data);
            })
            .then(kinvey.handler)
            .then(r => {                
                notificator.showInfo(`Successfully joined team: ${r.name}`);
                return userModel.getCurrentUser();
            })
            .then(kinvey.handler)
            .then(r => {
                r._kmd.authtoken = storage.getData("authToken");
                storage.saveUser(r);
                context.redirect('#/catalog');
            })
            .catch(console.log);
    };

    const leaveTeam = function(context) {
        context.loggedIn = userModel.isLoggedIn();

        if(!context.loggedIn) {
            notificator.showError("You must be logged in");
            context.redirect('#/home');
            return;
        }

        const teamId = storage.getData("userInfo").teamId;
        const username = storage.getData("userInfo").username;

        userModel.setTeam()
            .then(kinvey.handler)
            .then(r => {
                return teamModel.getTeam(teamId);
            })
            .then(kinvey.handler)
            .then(r => {
                const data = {
                    teamMembers: r.teamMembers.filter(x => x !== username),
                    name: r.name,
                    comment: r.comment,
                };

                return teamModel.updateTeam(teamId, data);
            })
            .then(kinvey.handler)
            .then(r => {                
                notificator.showInfo(`Successfully leaved team ${r.name}`);
                return userModel.getCurrentUser();
            })
            .then(kinvey.handler)
            .then(r => {
                r._kmd.authtoken = storage.getData("authToken");
                storage.saveUser(r);
                context.redirect('#/catalog');
            })
            .catch(console.log);
    };

    async function getEditTeam(context) {
        context.username = storage.getData("userInfo").username;
        context.loggedIn = userModel.isLoggedIn();

        if(!context.loggedIn) {
            notificator.showError("You must be logged in");
            context.redirect('#/home');
            return;
        }

        context.teamId = context.params.teamId.substring(1);

        function renderPage(context) {
            context.loadPartials({
                //Relative paths to handlebar files
                header: "../views/common/header.hbs",
                footer: "../views/common/footer.hbs",
                editForm: "../views/edit/editForm.hbs",
            })
                .then(function () {
                    //when dependencies of this template are loaded loads template
                    this.partial("../views/edit/editPage.hbs");
                });
        }

        //First render empty page
        renderPage(context);

        //Awaits for response from the server
        await teamModel.getTeam(context.teamId)
            .then(kinvey.handler)
            .then(r => {
                context.name = r.name;
                context.comment = r.comment;
            })
            .catch(console.log());

        //Render again page after data is received from server
        renderPage(context);
    };

    const postEditTeam = function(context) {
        context.username = storage.getData("userInfo").username;
        context.loggedIn = userModel.isLoggedIn();

        if(!context.loggedIn) {
            notificator.showError("You must be logged in");
            context.redirect('#/home');
            return;
        }

        const teamId = context.params.teamId.substring(1);
        const { comment, name } = context.params

        teamModel.getTeam(teamId)
            .then(kinvey.handler)
            .then(r => {
                const data = {
                    name,
                    comment,
                    teamMembers: r.teamMembers,
                };

                return teamModel.updateTeam(teamId, data);
            })
            .then(kinvey.handler)
            .then(r => {
                notificator.showInfo("Successfully updated team");
                context.redirect('#/catalog');
            })
            .catch(console.log);
    };

    return {
        getCreateTeam,
        postCreateTeam,
        getTeamDetails,
        getJoinTeam,
        leaveTeam,
        getEditTeam,
        postEditTeam,
    };
})();