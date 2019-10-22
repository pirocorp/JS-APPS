//Revealing Module Pattern with IIFE
const teamModel = (function() {
    const getAllTeams = function() {
        if (!userModel.isLoggedIn()) {
            return Promise.reject("You must be logged in.");
        }

        const endPoint = `/appdata/${storage.appKey}/teams`;
        return requester.get(endPoint, {});
    };

    const createTeam = function(data) {
        if (!userModel.isLoggedIn()) {
            return Promise.reject("You must be logged in.");
        }

        const endPoint = `/appdata/${storage.appKey}/teams`;

        const request = {
            body: JSON.stringify(data),
        };

        return requester.post(endPoint, request);
    };

    const getTeam = function(teamId) {
        if (!userModel.isLoggedIn()) {
            return Promise.reject("You must be logged in.");
        }

        const endPoint = `/appdata/${storage.appKey}/teams/${teamId}`;
        return requester.get(endPoint, {});
    };

    const updateTeam = function(teamId, data) {
        if(!userModel.isLoggedIn()) {
            return Promise.reject("You must be logged in.");
        }

        const endPoint = `/appdata/${storage.appKey}/teams/${teamId}`;

        const request = {
            body: JSON.stringify(data),
        };

        return requester.put(endPoint, request);
    };

    return {
        getAllTeams,
        createTeam,
        getTeam,
        updateTeam,
    };
})();