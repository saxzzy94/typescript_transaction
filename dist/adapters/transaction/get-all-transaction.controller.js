"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GetAllTransactionController {
    constructor(interactor) {
        this.interactor = interactor;
    }
    run(input) {
        if (input) {
            const result = this.interactor.run(input);
            return result;
        }
    }
}
exports.default = GetAllTransactionController;
