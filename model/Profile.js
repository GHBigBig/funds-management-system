/**
 * 直接按照数据库里的字段来了
 */
class Profile {
    pid;
    create_date;
    iid;
    incode_describe;
    incode;
    expend;
    cash;
    remark;
    toString() {
        return `pid:${this.pid}, create_date:${this.create_date}, iid:${this.iid}, incode_describe:${this.incode_describe}, incode:${this.incode}, expend:${this.expend}, cash:${this.cash}, remark:${this.remark}`;
    }
}

module.exports = Profile;