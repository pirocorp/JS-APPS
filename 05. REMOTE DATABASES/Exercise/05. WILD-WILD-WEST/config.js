const baseUrl = 'https://baas.kinvey.com';
const appKey = 'kid_HJMizWPYB';
const username = 'piroman';
const password = '123456';
const endpoint = 'players';

const url = `${baseUrl}/appdata/${appKey}/${endpoint}`;

const headers = {
    'Authorization': `Basic ${btoa(username + ':' + password)}`,
    'Content-Type': 'application/json',
};

let currentPlayer = {
    name: '',
    money: 0,
    bullets: 0,
};

let canvasIsStarted = false;