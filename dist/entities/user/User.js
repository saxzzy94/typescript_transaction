"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(userProperties) {
        this.email = userProperties.email;
        this.firstName = userProperties.firstName;
        this.lastName = userProperties.lastName;
        this.password = userProperties.password;
    }
    static createUser(userProperties) {
        /** some validations */
        return new User(userProperties);
    }
}
exports.default = User;
