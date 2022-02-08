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
exports.transactionService = void 0;
const errors_1 = require("./../../../interactors/usecases/common/errors");
const flutterwave_1 = require("./../../external/payment-gateway.ts/flutterwave");
const create_transaction_interactor_1 = __importDefault(require("../../../interactors/usecases/transaction/create-transaction.interactor"));
const mongo_transaction_repository_1 = __importDefault(require("../../external/database/mongo-transaction-repository"));
const create_transaction_controller_1 = __importDefault(require("../../../adapters/transaction/create-transaction.controller"));
const create_transaction_presenter_1 = __importDefault(require("../../../adapters/transaction/create-transaction.presenter"));
const transactionService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactionRepository = new mongo_transaction_repository_1.default();
        const presenter = new create_transaction_presenter_1.default();
        const interactor = new create_transaction_interactor_1.default(transactionRepository, presenter);
        const response = yield new flutterwave_1.FlutterTransaction().createTransaction(req);
        const userId = req.body._id.toString();
        const input = Object.assign(Object.assign({}, response.data), { userId });
        if (!response) {
            new errors_1.ApplicationError(400, "An error occurred while ceating transaction");
            next();
        }
        const result = yield new create_transaction_controller_1.default(interactor).run(input);
        return res.json(result.body);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.transactionService = transactionService;
