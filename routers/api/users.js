const express = require("express");
const multer = require('multer');
const { getCryptoStr } = require('../../utils/cryptoUtils');
const User = require('../../model/User');
const mysql = require('mysql');
const { dbConnect, avatarPath, jwtSecretOrPrivateKey } = require('../../config/keys');
const SysStatus = require('../../model/SysStatus');
const jwt = require('jsonwebtoken');
const passport = require('../../config/passport');

//数据库
const pool = mysql.createPool({
    connectionLimit: dbConnect.connectionLimit,
    host: dbConnect.host,
    user: dbConnect.user,
    password: dbConnect.password,
    database: dbConnect.database
});

//文件上传目录配置及文件名配置
const storage = multer.diskStorage({
    destination: avatarPath,
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        avatarFileName = `${file.fieldname}-${uniqueSuffix}${file.originalname.replace(/.+(?=\.)/g, '')}`;
        cb(null, avatarFileName);
    }
});

const router = express.Router();
const upload = multer({ storage: storage });



let avatarFileName = '';

// $route GET api/users/user 
// @desc 检查邮箱是否已经被注册
// @access public
router.get('/userIsExist', (req, res) => {
    getUserByEmail(req.query.email)
        .then(user => {
            if (!user) {
                res.json(new SysStatus(1, '此邮箱还未注册~'));
            } else {
                res.json(new SysStatus(-1, '此邮箱已被注册了~'));
            }
        })
        .catch(err => {
            throw err;
        });
});

function getUserByEmail(email = '') {
    let promise = new Promise((resolve, reject) => {
        pool.getConnection((err, conn) => {
            if (err) {
                throw err;
            }
            //检查邮箱是否已经注册
            let checkSqlStr = 'SELECT * FROM users WHERE email = ?';
            conn.query(checkSqlStr, [email], (err, result) => {
                if (err) {
                    reject(err);
                }
                conn.release();
                if (result.length > 0) {
                    let user = new User();
                    user.uid = result[0].uid;
                    user.name = result[0].name;
                    user.email = result[0].email;
                    user.avatar = result[0].avatar;
                    user.registerDate = result[0].register_date;
                    user.rid = result[0].rid;
                    resolve(user);
                } else {
                    resolve(null);
                }
            });
        });
    });
    return promise;
}

// $route POST api/users/user restful api
// @desc 用户组测，禁止已存在用户注册
// @access public
router.post('/user', upload.fields([{ name: 'avatar', maxCount: 1 }]), (req, res, next) => {
    let user = new User();

    user.name = req.body.name;
    user.password = getCryptoStr(req.body.password);
    user.email = req.body.email;
    user.avatar = '/' + (avatarPath + (avatarFileName==='' ? 'avatar-default.png' : avatarFileName)).slice(7);
    user.rid = req.body.rid;

    let date = new Date();
    date.setHours(date.getHours(), date.getMinutes() - date.getTimezoneOffset());
    user.registerDate = date.toISOString().slice(0, 23).replace('T', ' ');

    pool.getConnection((err, conn) => {
        if (err) {
            throw err;
        }

        //检查邮箱是否已经注册
        let checkSqlStr = 'SELECT * FROM users WHERE email = ?';
        conn.query(checkSqlStr, [user.email], (err, result) => {
            if (err) {
                throw err;
            }

            conn.release();
            if (result.length > 0) {
                res.json(new SysStatus(-1, '此邮箱已被注册'));
            } else {
                let sqlStr = 'INSERT INTO users VALUES (null, ?, ?, ?, ?, ?, ?)';
                conn.query(sqlStr, [user.name, user.password, user.email, user.avatar, user.registerDate, user.rid], (err, result) => {
                    if (err) {
                        throw err;
                    }
                    user.uid = result.insertId;
                    console.debug(`register user: ${user}`);

                    res.json(new SysStatus(1, '用户注册成功',    user));
                });
            }
        });
    });

});

// $route POST api/users/login
// @desc 用户登录，返回 token jwt passport
// @access public
router.post('/login', (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) {
            throw err;
        }
        let cryptoStr = getCryptoStr(req.body.password);
        let sqlStr = 'SELECT * FROM users WHERE email=? and password=?';
        conn.query(sqlStr, [req.body.email, cryptoStr], (err, result) => {
            if (err) {
                throw err;
            }
            if (result.length == 0) {
                res.send(JSON.stringify(new SysStatus(-1, '用户名不存在或者用户名和密码不匹配')));
            } else {
                let user = new User;
                user.uid = result[0].uid;
                user.name = result[0].name;
                user.password = '';
                user.email = result[0].email;
                user.avatar = result[0].avatar;
                user.rid = result[0].rid;

                let payload = { sub: user.uid, email: user.email, rid: user.rid };
                const token = 'Bearer ' + jwt.sign(payload, jwtSecretOrPrivateKey, { expiresIn: 3600 });
                
                res.json(new SysStatus(1, '登陆成功', { token, user}));
            }
            conn.release();
        });
    });
});

// $route POST api/users/current
// @desc 测试 jwt 令牌
// @access private
router.get('/test', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json(new SysStatus(1, 'okokok'));
});



module.exports = router;