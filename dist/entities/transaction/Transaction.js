"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Transaction {
    constructor(transaction) {
        this.amount = transaction.amount;
        this.currency = transaction.currency;
        this.createdAt = transaction.createdAt;
        this.userId = transaction.userId;
        this.card = transaction.card;
    }
    static create(transaction) {
        return new Transaction(transaction);
    }
}
exports.default = Transaction;
