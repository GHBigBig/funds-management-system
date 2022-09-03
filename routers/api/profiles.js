const express = require("express");
const User = require('../../model/User');
const Profile = require('../../model/Profile');
const mysql = require('mysql');
const {dbConnect} = require('../../config/keys');
const SysStatus = require('../../model/SysStatus');
const jwt = require('jsonwebtoken');

const { transformAuthInfo } = require("../../config/passport");

//数据库
const pool = mysql.createPool({
    connectionLimit : dbConnect.connectionLimit,
    host            : dbConnect.host,
    user            : dbConnect.user,
    password        : dbConnect.password,
    database        : dbConnect.database
});


const router = express.Router();

// $route POST api/profiles/
// @desc 获取所有信息
// @access Private
router.get('/profile',  (req, res) => {
    pool.getConnection((err, conn) => {
        if(err) {
            throw err;
        }
        let sqlStr = 'SELECT * FROM profiles';
        let profiles = [];
        conn.query(sqlStr, (err, result) => {
            if(err) {
                throw err;
            }
            result.forEach((ele, index) => {
                profiles[index] = ele;
                // profiles[index].create_date = profiles[index].create_date.toString().slice(0,23).replace('T','');
                // console.log(profiles[index].create_date);
            });
            res.json(new SysStatus(1, '获取所有的项目资金信息成功~', profiles));
            conn.release();
        });
    });
});

// $route POST api/profiles/
// @desc 获取单个信息
// @access Private
router.get('/profile/:id', (req, res) => {
    pool.getConnection((err, conn) => {
        if(err) {
            throw err;
        }
        let sqlStr = 'SELECT * FROM profiles WHERE pid=?';
        conn.query(sqlStr, [req.params.id], (err, result) => {
            if(err) {
                throw err;
            }
            
            conn.release();
            if(result.length === 1) {
                res.json(new SysStatus(1, `获取 ${req.params.id} 成功`, {profile:result[0]}));
            }else {
                res.json(new SysStatus(-1, `获取 ${req.params.id} 失败`));
            }
            
            
        });
    });
});

router.post('/profile',  (req,res) => {
    pool.getConnection((err,conn) => {
        if(err) {
            throw err;
        }
        let date = new Date();
        date.setHours(date.getHours(), date.getMinutes()-date.getTimezoneOffset());

        let profile = new Profile();
        profile.pid = null;
        profile.create_date = date.toISOString().slice(0,23).replace('T', ' ');
        profile.iid = req.body.iid;
        profile.incode_describe = req.body.incode_describe;
        profile.incode = req.body.incode;
        profile.expend = req.body.expend;
        profile.cash = req.body.cash;
        profile.remark = req.body.remark;

        console.log(profile);
        // console.log(req);

        let sqlStr = 'INSERT INTO profiles VALUES(null, ?, ?, ?, ?, ?, ?, ?)';
        conn.query(sqlStr, [profile.create_date, profile.iid, profile.incode_describe, profile.incode, profile.expend, profile.cash, profile.remark], (err, result) => {
            if(err) {
                throw err;
            }
            profile.pid = result.insertId;
            console.debug(`register profile: ${profile}`);
            
            conn.release();
            res.json(new SysStatus(1, profile));
        });
    });
});

router.put('/profile',  (req, res) => {
    pool.getConnection((err,conn) => {
        if(err) {
            throw err;
        }
        let profile = new Profile();
        profile.incodeType = req.body.incodeType;
        profile.incodeDescribe = req.body.incodeDescribe;
        profile.incode = req.body.incode;
        profile.expend = req.body.expend;
        profile.cash = req.body.cash;
        profile.remark = req.body.remark;
        profile.pid = req.body.pid;

        let sqlStr = 'UPDATE profiles SET incode_type=?, incode_describe=?, incode=?, expend=?, cash=?, remark=? WHERE pid=?';

        conn.query(sqlStr, [profile.incodeType, profile.incodeDescribe, profile.incode, profile.expend, profile.cash, profile.remark, profile.pid], (err, result) => {
            if(err) {
                throw err;
            }
            console.debug(`profile put ${JSON.stringify(result)}`);
            
            conn.release();
            if(result.changedRows > 0) {
                res.json(new SysStatus(1, '修改成功'));
            }else {
                res.json(new SysStatus(-1, '修改失败'));
            }
            
        });
    });
});

router.delete('/profile', (req, res) => {
    pool.getConnection((err, conn) => {
        if(err) {
            throw err;
        }
        let strSql = 'DELETE FROM profiles WHERE pid=?';
        conn.query(strSql, [req.body.pid], (err, result) => {
            if(err) {
                throw err;
            }
            conn.release();
            if(result.affectedRows > 0) {
                res.json(new SysStatus(1, '删除成功'));
            }else {
                res.json(new SysStatus(-1, '删除失败'));
            }
        });
    });
});

router.get('/type', (req, res) => {
    pool.getConnection((err, conn) => {
        if(err) {
            throw err;
        }
        let sqlStr = 'SELECT * FROM incode_types';
        let incodeTypes = [];
        conn.query(sqlStr, (err, result) => {
            if(err) {
                throw err;
            }
            result.forEach((ele, index) => {
                incodeTypes[index] = ele;
            });
            res.json(new SysStatus(1, '获取收支类型数据成功~', incodeTypes));
            conn.release();
        });
    });
});

module.exports = router;