let mysql = require('mysql');

let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Qwertyuiop0.',
    database: 'funds'
});


//连接用户
db.connect(function(err) {
    if(err) {
        return console.error(`error: ${err.message}`);
    }
    console.debug('Connect to the Mysql server~');
});

//查询用户信息
let checkSqlStr = 'SELECT * FROM users WHERE email like ?';
db.query(checkSqlStr, ['%'], (err, res) => {
    if(err) {
        return console.error(`error: ${err.message}`);
    }
    for(let key in res) {
        console.log(key);
    }
    console.log(res);
});

//插入用户信息
// let user = {
//     uid:null, 
//     name: 'wangwu',
//     password: '12345678',
//     email: 'wangwu@qq.com',
//     avatar: '/img/default.png',
//     registerDate: new Date().toISOString().slice(0,23).replace('T', ' ')
// }
// let insertSql = 'insert into users values (null, ?, ?, ?, ?, ?)';
// db.query(insertSql, [user.name, user.password, user.email, user.avatar, user.registerDate], 
//     (err, res) => {
//         if(err) {
//             return console.error(`error: ${err.message}`);
//         }
//         console.log(res);
//         for(let key of Object.keys(res)) {
//             console.log(key);
//         }
//     });


// let checkSqlStr = 'SELECT * FROM users WHERE email = "?"';
// db.query(checkSqlStr, ['zhangsan@funds.com'], (err, res) => {
//     if(err) throw err;

//     console.log(`email res: ${res}`);
//     for(let key in res) {
//         console.log(key);
//     }
// });

db.end(err => {
    if(err) {
        return console.error(`error: ${err.message}`);
    }
    console.debug('Close connect to the Mysql server~');
});