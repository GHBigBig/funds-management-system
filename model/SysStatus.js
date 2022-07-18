class SysStatus{
    code;
    msg;
    payload;
    constructor(code, msg, payload={}) {
        this.code = code;
        this.msg = msg;
        this.payload = payload;
    }
    toString() {
        return `code: ${this.code}, msg:${this.msg}, payload:${this.payload}`;
    }
}

module.exports = SysStatus;