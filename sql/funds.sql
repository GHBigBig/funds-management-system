CREATE DATABASE IF NOT EXISTS funds;

CREATE TABLE IF NOT EXISTS roles (
    rid INT PRIMARY KEY  COMMENT '角色id',
    name VARCHAR(16) NOT NULL COMMENT '角色名'
);

INSERT INTO roles VALUES(100, '管理员');
INSERT INTO roles VALUES(200, '员工');

CREATE TABLE IF NOT EXISTS users(
    uid INT AUTO_INCREMENT PRIMARY KEY  COMMENT '用户id',
    name VARCHAR(16) NOT NULL COMMENT '用户名',
    password VARCHAR(64) NOT NULL COMMENT '账户密码',
    email VARCHAR(31) UNIQUE NOT NULL COMMENT '账户邮箱',
    avatar VARCHAR(255) COMMENT '账户头像路径',
    register_date DATETIME(3)  NOT NULL COMMENT '用户创建时间',
    rid INT NOT NULL COMMENT '用户角色',
    CONSTRAINT fk_rid_users FOREIGN KEY (rid) REFERENCES roles(rid)
);

INSERT INTO users VALUES (null, '张三', 'e276006cc534b3fe408541445bd63735956770680b826c891302c96e9f477f9d', 'zhangsan@163.com', 'img/default.png', Now(3), 200);
INSERT INTO users VALUES (null, '李四', 'e276006cc534b3fe408541445bd63735956770680b826c891302c96e9f477f9d', 'lisi@163.com', '/img/default.png',  Now(3), 200);
    



CREATE TABLE IF NOT EXISTS profiles(
    pid INT AUTO_INCREMENT PRIMARY KEY  COMMENT '投标项id',
    create_date DATETIME(3)  NOT NULL COMMENT '投标创建时间',
    iid INT NOT NULL COMMENT '收支类型',
    incode_describe VARCHAR(127) COMMENT '收支描述',
    incode DOUBLE(12, 2) NOT NULL COMMENT '收入',
    expend DOUBLE(12, 2) NOT NULL COMMENT '支出',
    cash DOUBLE(12, 2) NOT NULL COMMENT '账户现金',
    remark VARCHAR(127) COMMENT '备注',
    CONSTRAINT fk_incode_type FOREIGN KEY (iid) REFERENCES incode_types(iid)
);

INSERT INTO profiles VALUES(null, Now(3), 1, '收支描述...', '123', '123', '999', '无');
UPDATE profiles SET incode_type=2, incode_describe='更新收支描述。。。', incode='111', expend='222', cash='333', remark='无' WHERE pid=104;
DELETE FROM profiles WHERE pid=104;

#收支类型 收支描述 收入 支出 账户现金 备注

CREATE TABLE IF NOT EXISTS incode_types(
    iid INT PRIMARY KEY COMMENT '收支类型id',
    incode_type_name VARCHAR(31) COMMENT '收支类型的名字'
);

INSERT INTO incode_types VALUES (1, '促销'), (2, '线上'), (3, '线下');