class Profile {
    pid;
    createDate;
    incodeType;
    incodeDescribe;
    incode;
    expend;
    cash;
    remark;
    toString() {
        return `pid:${this.pid}, createDate:${this.createDate}, incodeType:${this.incodeType}, incodeDescribe:${this.incodeDescribe}, incode:${this.incode}, expend:${this.expend}, cash:${this.cash}, remark:${this.remark}`;
    }
}

module.exports = Profile;