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
exports.getAllTransactionService = void 0;
const result_presenter_1 = __importDefault(require("../../../adapters/helper/result-presenter"));
const get_all_transactions_interactor_1 = __importDefault(require("../../../interactors/usecases/transaction/get-all-transactions.interactor"));
const mongo_transaction_repository_1 = __importDefault(require("../../external/database/mongo-transaction-repository"));
const getAllTransactionService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactionRepository = new mongo_transaction_repository_1.default();
        const presenter = new result_presenter_1.default();
        const interactor = new get_all_transactions_interactor_1.default(transactionRepository, presenter);
        const userId = req.body._id.toString();
        const transactions = yield interactor.run(userId);
        res.json(transactions);
    }
    catch (error) {
        res.json(error);
    }
});
exports.getAllTransactionService = getAllTransactionService;
