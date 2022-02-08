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
const errors_1 = require("./../../../interactors/usecases/common/errors");
const mongodb_1 = require("mongodb");
const db_1 = require("./db");
require("dotenv/config");
class TransactionRepository {
    findAllTansactions(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactionCollection = db_1.MongoHelper.getCollection(process.env.TRANSACTIONS_COLLECTION);
                const transactionsFromUser = yield transactionCollection
                    .find({ userId })
                    .toArray();
                return transactionsFromUser;
            }
            catch (error) {
                throw new errors_1.ApplicationError(500, "unexpected error");
            }
        });
    }
    findTransactionById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactionCollection = db_1.MongoHelper.getCollection(process.env.TRANSACTIONS_COLLECTION);
                const transaction = yield transactionCollection.findOne({
                    _id: new mongodb_1.ObjectId(id),
                });
                return transaction;
            }
            catch (error) {
                console.log();
                throw new errors_1.ApplicationError(500, "unexpected error, please check the id");
            }
        });
    }
    save(transactionData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactionCollection = db_1.MongoHelper.getCollection(`${process.env.TRANSACTIONS_COLLECTION}`);
                const transaction = yield transactionCollection.insertOne(transactionData);
                return transaction;
            }
            catch (error) {
                throw new errors_1.ApplicationError(500, "unexpected error, transaction was not saved");
            }
        });
    }
}
exports.default = TransactionRepository;
