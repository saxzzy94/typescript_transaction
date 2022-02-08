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
exports.registerService = void 0;
const encoder_1 = __importDefault(require("../../../adapters/helper/encoder"));
const register_user_controller_1 = __importDefault(require("../../../adapters/user/register-user/register-user.controller"));
const register_user_presenter_1 = __importDefault(require("../../../adapters/user/register-user/register-user.presenter"));
const register_user_interactor_1 = __importDefault(require("../../../interactors/usecases/user/register-user/register-user.interactor"));
const mongo_user_repository_1 = require("../../external/database/mongo-user-repository");
const registerService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const presenter = new register_user_presenter_1.default();
    const userRepository = new mongo_user_repository_1.UserRepository();
    const encoder = new encoder_1.default();
    const interactor = new register_user_interactor_1.default(userRepository, presenter, encoder);
    const result = yield new register_user_controller_1.default(interactor).run(req);
    console.log({ factory: result });
    if (result.statusCode === 201) {
        res.status(201).json(result);
    }
    else {
        res.status(result.statusCode).json(result);
    }
});
exports.registerService = registerService;
