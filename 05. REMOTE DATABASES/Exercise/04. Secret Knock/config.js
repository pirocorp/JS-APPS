const username = 'guest';
const password = 'guest';
const appKey = 'kid_BJXTsSi-e';
const appSecret = '447b8e7046f048039d95610c1b039390';

const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const baseUrl = `https://baas.kinvey.com/appdata/${appKey}/knock`;

module.exports = {
    username,
    password,
    appKey,
    appSecret,
    loginUrl,
    baseUrl,
};