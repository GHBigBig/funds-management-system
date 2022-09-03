const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const {jwtSecretOrPrivateKey, dbConnect} = require('./keys');
const mysql = require('mysql');
const User = require('../model/User');

//数据库
const pool = mysql.createPool({
    connectionLimit : dbConnect.connectionLimit,
    host            : dbConnect.host,
    user            : dbConnect.user,
    password        : dbConnect.password,
    database        : dbConnect.database
});


//jwt 认证
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecretOrPrivateKey
}


passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    console.log(`jwt_payload: ${JSON.stringify(jwt_payload)}`);
    pool.getConnection((err, conn) => {
        if(err) {
            throw err;
        }
        let sqlStr = 'SELECT * FROM users WHERE uid=? AND email=?';
        conn.query(sqlStr, [jwt_payload.sub, jwt_payload.email], (err, result) => {
            if(err) {
                let tmp = done(err, false);
                console.debug(`tmp: ${JSON.stringify(tmp)}`)
                return tmp;
            }
           
            conn.release();
            if(result.length>0){
                let user = new User();
                user.uid = result[0].uid;
                user.name = result[0].name;
                user.email = result[0].email;
                user.avatar = result[0].avatar;
                user.registerDate = result[0].register_date;
                user.rid = result[0].rid;
                
                return done(null, user);
            }else {
                return done(null, false, {msg: 'Incorr'});
                
            }
            
        });
    });
}));

module.exports = passport;