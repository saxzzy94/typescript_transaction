"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationError = void 0;
class ApplicationError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.constructor.name;
        this.message = message;
    }
}
exports.ApplicationError = ApplicationError;
