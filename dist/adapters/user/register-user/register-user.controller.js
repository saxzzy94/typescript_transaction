"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class RegisterUserController {
    constructor(interactor) {
        this.interactor = interactor;
    }
    run(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (input.body) {
                const request = {
                    email: input.body.email,
                    firstName: input.body.firstName,
                    lastName: input.body.lastName,
                    password: input.body.password,
                };
                const result = yield this.interactor.run(request);
                return result;
            }
        });
    }
}
exports.default = RegisterUserController;
