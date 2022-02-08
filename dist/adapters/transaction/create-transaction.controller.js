"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("./../../interactors/usecases/common/errors");
class CreateTransactionController {
    constructor(interactor) {
        this.interactor = interactor;
    }
    run(input) {
        if (input) {
            const result = this.interactor.run(input);
            return result;
        }
        throw new errors_1.ApplicationError(500, "Unexpected error");
    }
}
exports.default = CreateTransactionController;
