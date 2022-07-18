CREATE TABLE IF NOT EXISTS users(
    uid INT AUTO_INCREMENT PRIMARY KEY  COMMENT '用户id',
    name VARCHAR(16) NOT NULL COMMENT '用户名',
    password VARCHAR(64) NOT NULL COMMENT '账户密码',
    email VARCHAR(31) UNIQUE NOT NULL COMMENT '账户邮箱',
    avatar VARCHAR(255) COMMENT '账户头像路径',
    register_date DATETIME(3)  NOT NULL COMMENT '用户创建时间'
    rid INT FOREIGN KEY REFERENCES roles(rid) 
);

INSERT INTO users VALUES (null, '张三', 'e276006cc534b3fe408541445bd63735956770680b826c891302c96e9f477f9d', 'zhangsan@163.com', '/img/default.png', 
    Now(3));
INSERT INTO users VALUES (null, '李四', 'e276006cc534b3fe408541445bd63735956770680b826c891302c96e9f477f9d', 'lisi@163.com', '/img/default.png', 
    Now(3));
    

CREATE TABLE IF NOT EXISTS roles (
    rid INT PRIMARY KEY  COMMENT '角色id',
    name VARCHAR(16) NOT NULL COMMENT '角色名'
);

INSERT INTO roles VALUES(100, '管理员');
INSERT INTO roles VALUES(200, '员工');

CREATE TABLE IF NOT EXISTS profiles(
    pid INT AUTO_INCREMENT PRIMARY KEY  COMMENT '投标项id',
    create_date DATETIME(3)  NOT NULL COMMENT '投标创建时间',
    incode_type VARCHAR(31) NOT NULL COMMENT '收支类型',
    incode_describe VARCHAR(127) COMMENT '收支描述',
    incode VARCHAR(31) NOT NULL COMMENT '收入',
    expend VARCHAR(31) NOT NULL COMMENT '支出',
    cash varchar(31) NOT NULL COMMENT '账户现金',
    remark VARCHAR(127) COMMENT '备注'
);

INSERT INTO profiles VALUES(null, Now(3), '1', '收支描述...', '123', '123', '999', '无');
UPDATE profiles SET incode_type='2', incode_describe='更新收支描述。。。', incode='111', expend='222', cash='333', remark='无' WHERE pid=104;
DELETE FROM profiles WHERE pid=104;

#收支类型 收支描述 收入 支出 账户现金 备注