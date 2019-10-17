const { handler } = require('./kinveyErrorHandler');

const fetch = require('node-fetch');

function login(loginDetails) {
    const request = {
        method: 'POST',
        headers: {
            authorization: 'Basic ' + Buffer.from(`${loginDetails.appKey}:${loginDetails.appSecret}`).toString('base64'),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username:loginDetails.username, 
            password:loginDetails.password,
        }),
    };

    return fetch(loginDetails.loginUrl, request)
        .then(handler)
        .then(x => x._kmd.authtoken)
        .catch(console.log);      
};

module.exports = {
    login,
};