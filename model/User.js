class User {
    uid;
    name;
    password;
    email;
    avatar;
    registerDate;
    rid;
    toString() {
        return `uid: ${this.uid}, name: ${this.name}, password: ${this.password}, email: ${this.email}, avatar: ${this.avatar}, registerDate: ${this.registerDate}, rid: ${this.rid}`;
    }
}

module.exports = User;