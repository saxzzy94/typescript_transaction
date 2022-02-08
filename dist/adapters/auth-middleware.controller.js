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
const errors_1 = require("../interactors/usecases/common/errors");
class AuthMiddleware {
    constructor(tokenManager) {
        this.tokenManager = tokenManager;
    }
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const { accessToken } = request;
            if (!accessToken) {
                return new errors_1.ApplicationError(403, "Invalid token");
            }
            const decodedTokenOrError = yield this.tokenManager.verify(accessToken);
            return decodedTokenOrError;
        });
    }
}
exports.default = AuthMiddleware;
