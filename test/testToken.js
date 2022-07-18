const jwt = require('jsonwebtoken');

let payload = {sub: 1, email: 1, rid: 1};
const token = 'Bearer ' +  jwt.sign(payload, 'funds-jwt', {expiresIn: 3600})

console.log(token);