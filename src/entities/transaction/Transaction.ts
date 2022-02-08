import User from "../user/User";

interface CardProperties {
  last_4digits: string;
  type: string;
  expiry_date: string;
}

export interface TransactionProperties {
  id?: string;
  amount: number;
  currency: string;
  createdAt: string;
  userId: User;
  card: CardProperties;
}
export default class Transaction {
  userId!: User;
  amount: number;
  currency: string;
  createdAt: string;
  card: CardProperties;
  constructor(transaction: TransactionProperties) {
    this.amount = transaction.amount;
    this.currency = transaction.currency;
    this.createdAt = transaction.createdAt;
    this.userId = transaction.userId;
    this.card = transaction.card;
  }

  public static create(transaction: TransactionProperties) {
    return new Transaction(transaction);
  }
}
