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
const errors_1 = require("./../../common/errors");
const User_1 = __importDefault(require("../../../../entities/user/User"));
const interactor_1 = __importDefault(require("../../common/interactor"));
class RegisterUserInteractor extends interactor_1.default {
    constructor(userGateway, presenter, encoder) {
        super(presenter);
        this.userGateway = userGateway;
        this.presenter = presenter;
        this.encoder = encoder;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userGateway.findUserByEmail(data.email);
                if (user) {
                    throw new errors_1.ApplicationError(409, "user already exist");
                }
                const encodePassword = yield this.encoder.encode(data.password);
                const newUser = User_1.default.createUser({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: encodePassword,
                });
                const result = yield this.userGateway.save(newUser);
                return result;
            }
            catch (error) {
                return error;
            }
        });
    }
}
exports.default = RegisterUserInteractor;
