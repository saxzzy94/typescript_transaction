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
exports.getOneTransactionService = void 0;
const result_presenter_1 = __importDefault(require("../../../adapters/helper/result-presenter"));
const get_one_transaction_controller_1 = __importDefault(require("../../../adapters/transaction/get-one-transaction.controller"));
const get_one_transaction_1 = __importDefault(require("../../../interactors/usecases/transaction/get-one-transaction"));
const mongo_transaction_repository_1 = __importDefault(require("../../external/database/mongo-transaction-repository"));
const getOneTransactionService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactionRepository = new mongo_transaction_repository_1.default();
        const presenter = new result_presenter_1.default();
        const interactor = new get_one_transaction_1.default(transactionRepository, presenter);
        const { id } = req.params;
        const result = yield new get_one_transaction_controller_1.default(interactor).run(id);
        res.status(result.statusCode).json(result);
    }
    catch (error) {
        res.status(500).json(error.message);
    }
});
exports.getOneTransactionService = getOneTransactionService;
