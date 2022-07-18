const express = require('express');
const mysql = require('mysql');
//引入users.js
const users = require('./routers/api/users');
const profiles = require('./routers/api/profiles');
const {getCryptoStr} = require('./utils/cryptoUtils');

const passport = require('./config/passport');

const app = express();
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Qwertyuiop0.',
    database: 'funds'
});


//使用 body-parser 中间件
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//CROS 设置
app.all('*', (req, res, next) => {
    console.log(req);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length');
    res.header('Access-Control-Allow-Methods', "GET,HEAD,POST,PUT,DELETE,OPTIONS,PATCH");
    res.header('Access-Control-Allow-Private-Network', true);
    res.header('Access-Control-Max-Age', 86400);
    next();
});

//使用routers
app.use('/api/users', users);
//要求所有从这个点下面的路由需要认证
app.all('*', passport.authenticate('jwt', { session: false }));
app.use('/api/profiles', profiles);
//初始化 passport
app.use(passport.initialize());



const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.debug(`Server running on port ${port}`);
});

