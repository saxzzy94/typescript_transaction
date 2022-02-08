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
const interactor_1 = __importDefault(require("../../common/interactor"));
const errors_1 = require("../../common/errors");
class loginUserInteractor extends interactor_1.default {
    constructor(userGateway, presenter, encoder, tokenManager) {
        super(presenter);
        this.userGateway = userGateway;
        this.presenter = presenter;
        this.encoder = encoder;
        this.tokenManager = tokenManager;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = input;
                let user = yield this.userGateway.findUserByEmail(email);
                if (!user) {
                    throw new errors_1.ApplicationError(404, "no user found");
                }
                const passwordMatches = yield this.encoder.compare(password, user.password);
                if (!passwordMatches) {
                    throw new errors_1.ApplicationError(400, "password does not match");
                }
                console.log({ user: user });
                const accessToken = yield this.tokenManager.sign({ id: user._id }, "2h");
                const returnUser = Object.assign(Object.assign({}, user), { password: "" });
                user = returnUser;
                return {
                    accessToken,
                    user: user,
                    password: "",
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = loginUserInteractor;
