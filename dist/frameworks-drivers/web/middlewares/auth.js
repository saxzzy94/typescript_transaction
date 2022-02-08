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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const auth_middleware_controller_1 = __importDefault(require("../../../adapters/auth-middleware.controller"));
const jwt_token_manager_1 = __importDefault(require("../../../adapters/helper/jwt-token-manager"));
const errors_1 = require("../../../interactors/usecases/common/errors");
const mongo_user_repository_1 = require("../../external/database/mongo-user-repository");
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = {
            accessToken: req.headers.authorization,
        };
        const tokenManager = new jwt_token_manager_1.default("secret");
        const authMiddleware = new auth_middleware_controller_1.default(tokenManager);
        const auth = yield authMiddleware.handle(request);
        const { id } = auth;
        if (!id) {
            throw new errors_1.ApplicationError(403, " you are not authorized");
        }
        const user = yield new mongo_user_repository_1.UserRepository().findUserById(id);
        if (!user)
            throw new errors_1.ApplicationError(404, "User not found");
        if (auth.statusCode) {
            res.status(auth.statusCode).json(auth.message);
        }
        else {
            Object.assign(req.body, user);
            next();
        }
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.auth = auth;
