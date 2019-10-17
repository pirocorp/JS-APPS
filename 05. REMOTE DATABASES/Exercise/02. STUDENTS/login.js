//returns promise which resolves to authToken
function login() {
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

    return fetch(loginUrl, request)
        .then(handler)
        .then(x => x._kmd.authtoken)
        .catch(console.log);      
};