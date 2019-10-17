const config = require('./config');
const { handler } = require('./kinveyErrorHandler');
const { login } = require('./kinveyLogin');

const fetch = require('node-fetch');

let authToken;

async function knock(lastResponse) {
    if(!authToken) {
        authToken = await login(config);
    }

    const request = {
        method: 'GET',
        headers: {
            authorization: 'Kinvey ' + authToken,
            'Content-Type': 'application/json',
        },
    };

    const result = await fetch(`${config.baseUrl}?query=${lastResponse}`, request)
        .then(handler)
        .then(response => response.answer)
        .catch(console.log);    

    if(result && result.answer) {
        console.log(result.answer);
        knock(result.answer);
    };
};

knock(`Knock Knock`);