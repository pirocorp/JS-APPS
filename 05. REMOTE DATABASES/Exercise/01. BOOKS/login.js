const username = 'guest';
const password = 'guest';
const appKey = 'kid_SyMuKqEYB';
const appSecret = 'a79c252bdb3448649174a7834f3b47d8';

const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;

function handler(response) {
    if(response.status >= 400) {
        const errorMessage = `${response.status} - ${response.statusText}`;
        throw new Error(errorMessage);
    }

    //response.json() returns a Promise
    return response.json();
};

async function login() {
    const request = {
        method: 'POST',
        headers: {
            authorization: 'Basic ' + btoa(`${appKey}:${appSecret}`),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username, password
        }),
    };

    return await fetch(loginUrl, request)
        .then(handler)
        .then(x => x._kmd.authtoken)
        .catch(console.log);      
};