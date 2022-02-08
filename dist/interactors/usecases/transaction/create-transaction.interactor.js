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
const errors_1 = require("./../common/errors");
const Transaction_1 = __importDefault(require("../../../entities/transaction/Transaction"));
const interactor_1 = __importDefault(require("../common/interactor"));
class CreateTransactionInteractor extends interactor_1.default {
    constructor(transactionGateway, presenter) {
        super(presenter);
        this.transactionGateway = transactionGateway;
        this.presenter = presenter;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transaction = Transaction_1.default.create({
                    amount: input.amount,
                    currency: input.currency,
                    userId: input.userId,
                    createdAt: input.created_at,
                    card: {
                        last_4digits: input.card.last_4digits,
                        type: input.card.type,
                        expiry_date: input.card.expiry,
                    },
                });
                return yield this.transactionGateway.save(transaction);
            }
            catch (err) {
                throw new errors_1.ApplicationError(500, err.message);
            }
        });
    }
}
exports.default = CreateTransactionInteractor;
