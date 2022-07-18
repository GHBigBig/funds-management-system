let crypto;
try {
  crypto = require('crypto');
} catch (err) {
  console.log('crypto support is disabled!');
}

const hmac = crypto.createHmac('sha256', '');


hmac.update('eyJ0eXBlIjoidG9rZW4iLCJhbGciOiJIUzI1NiJ9.');
hmac.update('eyJpYXQiOjE2NTYzNzU1OTgsImV4cCI6MTY1Njk4MDM5OCwibWVtYmVySWQiOiIxMDEiLCJleHRlbmRzIjoiIn0=');


console.log(hmac.digest('hex'));