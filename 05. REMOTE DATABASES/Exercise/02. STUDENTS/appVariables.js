const username = 'guest';
const password = 'guest';
const appKey = 'kid_Hy32-aHYH';
const appSecret = 'b3815b79c849402d884e4ee1765e74eb';

let authToken;

const loginUrl = `https://baas.kinvey.com/user/${appKey}/login`;
const baseUrl = `https://baas.kinvey.com/appdata/${appKey}/students`;