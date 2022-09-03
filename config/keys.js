let hmacKey = 'funds';
let dbConnect = {
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'Qwertyuiop0.',
    database: 'funds'
};
let avatarPath = 'static/img/';
let jwtSecretOrPrivateKey = 'funds-jwt';


module.exports = {hmacKey, dbConnect, avatarPath, jwtSecretOrPrivateKey};