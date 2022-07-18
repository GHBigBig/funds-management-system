DELIMITER $$
drop FUNCTION IF EXISTS `generateFullName` $$
CREATE FUNCTION generateFullName() RETURNS VARCHAR(3)
BEGIN
    DECLARE firstNameStr TEXT DEFAULT 
        '赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐费廉岑薛雷贺倪汤滕殷罗毕郝邬安常乐于时傅皮卞齐康伍余元卜顾孟平黄和穆萧尹姚邵湛汪祁毛禹狄米贝明臧计伏成戴谈宋茅庞熊纪舒屈项祝董梁杜阮蓝闵席季麻强贾路娄危江童颜郭梅盛林刁钟徐邱骆高夏蔡田樊胡凌霍虞万支柯昝管卢莫经房裘缪干解应宗丁宣贲邓郁单杭洪包诸左石崔吉钮龚程嵇邢滑裴陆荣翁荀羊於惠甄曲家封芮羿储靳汲邴糜松井段富巫乌焦巴弓牧隗山谷车侯宓蓬全郗班仰秋仲伊宫宁仇栾暴甘钭厉戎祖武符刘景詹束龙叶幸司韶郜黎蓟薄印宿白怀蒲邰从鄂索咸籍赖卓蔺屠蒙池乔阴鬱胥能苍双闻莘党翟谭贡劳逄姬申扶堵冉宰郦雍卻璩桑桂濮牛寿通边扈燕冀郏浦尚农温别庄晏柴瞿阎充慕连茹习宦艾鱼容向古易慎戈廖庾终暨居衡步都耿满弘匡国文寇广禄阙东欧殳沃利蔚越夔隆师巩厍聂晁勾敖融冷訾辛阚那简饶空曾毋沙乜养鞠须丰巢关蒯相查后荆红游竺权逯盖益桓公万俟司马上官欧阳夏侯诸葛闻人东方赫连皇甫尉迟公羊澹台公冶宗政濮阳淳于单于太叔申屠公孙仲孙轩辕令狐钟离宇文长孙慕容鲜于闾丘司徒司空丌官司寇仉督子车颛孙端木巫马公西漆雕乐正壤驷公良拓跋夹谷宰父谷梁晋楚闫法汝鄢涂钦段干百里东郭南门呼延归海羊舌微生岳帅缑亢况郈有琴梁丘左丘东门西门商牟佘佴伯赏南宫墨哈谯笪年爱阳佟第五言福百家姓终';
    DECLARE lastNameStr TEXT DEFAULT
        '芳培全炳基冠晖京欣廷哲保秋君劲栋仲权奇礼楠炜友年震鑫雷兵万星骏伦绍麟雨行才希彦兆贵源有景升惠臣慧开章润高佳虎根诚夫声冬奎扬双坤镇楚水铁喜之迪泰方同滨邦先聪朝善非恒晋汝丹为晨乃秀岩辰洋然厚灿卓轩帆若连勋祖锡吉崇钧田石奕发洲彪钢运伯满庭申湘皓承梓雪孟其潮冰怀鲁裕翰征谦航士尧标洁城寿枫革纯风化逸腾岳银鹤琳显焕来心凤睿勤延凌昊西羽百捷定琦圣佩麒虹如靖日咏会久昕黎桂玮燕可越彤雁孝宪萌颖艺夏桐月瑜沛杨钰兰怡灵淇美琪亦晶舒菁真涵爽雅爱依静棋宜男蔚芝菲露娜珊雯淑曼萍珠诗璇琴素梅玲蕾艳紫珍丽仪梦倩伊茜妍碧芬儿岚婷菊妮媛莲娟';

    DECLARE fullName VARCHAR(3) DEFAULT 'x某某';
  
    IF (RAND() < 0.9) THEN 
        set fullName = CONCAT(SUBSTR(firstNameStr, CEIL(RAND()*568), 1), SUBSTR(lastNameStr, CEIL(RAND()*255), 1),
            SUBSTR(lastNameStr, CEIL(RAND()*255), 1));
    ELSE
        set fullName = CONCAT(SUBSTR(firstNameStr, CEIL(RAND()*255), 1), SUBSTR(lastNameStr, CEIL(RAND()*255), 1));
    END IF;
    RETURN fullName;
END $$

drop FUNCTION IF EXISTS `generateEmail` $$
CREATE FUNCTION generateEmail() RETURNS VARCHAR(31)
BEGIN
    DECLARE baseStr TEXT DEFAULT 'abcdefghijklmnopqrstuvwxyz';
    DECLARE emailStr VARCHAR(31) DEFAULT '';
    DECLARE emailLength int DEFAULT CEIL(RAND()*7) + 5;
    DECLARE i int DEFAULT 0;
    WHILE i<emailLength DO
        set emailStr = CONCAT(emailStr, SUBSTR(baseStr, CEIL(RAND()*26), 1));
        set i = i+1;
    END WHILE;
    set emailStr = CONCAT(emailStr, '@funds.com');

    RETURN emailStr;
END $$


DROP PROCEDURE IF EXISTS insertUsers $$
CREATE PROCEDURE insertUsers(counts INT)
BEGIN
    DECLARE i INT DEFAULT 0;
    
    WHILE i<counts DO
       INSERT INTO users VALUES (null,  generateFullName(), 
        'e276006cc534b3fe408541445bd63735956770680b826c891302c96e9f477f9d', 
        generateEmail(), 'img/default.png', Now(3), 200);
        set i = i+1;
    END WHILE;
END $$
CALL insertUser(1000)$$


DROP FUNCTION IF EXISTS `generateMoney` $$
CREATE FUNCTION generateMoney() RETURNS VARCHAR(31)
BEGIN
    DECLARE money TEXT DEFAULT '-1';
    DECLARE length INT DEFAULT 5 + FLOOR(RAND()*5) ; #RAND() 返回值包含0不包含1
    
    RETURN CONCAT('', FLOOR(RAND() * POW(10, length))); #RAND() 可能小于 0.01
END $$

DROP PROCEDURE IF EXISTS insertProfiles $$
CREATE PROCEDURE insertProfiles(counts INT)
BEGIN
    DECLARE i INT DEFAULT 0;
    
    WHILE i<counts DO
       INSERT INTO profiles VALUES(null, Now(3), '1', '收支描述...', generateMoney(), 
       generateMoney(), generateMoney(), '无');
        set i = i+1;
    END WHILE;
END $$
CALL insertProfiles(100)$$

DELIMITER ;