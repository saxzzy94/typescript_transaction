import { ApplicationError } from "./../../../interactors/usecases/common/errors";
import { ObjectId } from "mongodb";
import { TransactionProperties } from "../../../entities/transaction/Transaction";
import { CreateTransactionDto } from "../../../interactors/usecases/transaction/create-transaction.dto";
import { TransactionGateway } from "./../../../interactors/gateway/transaction-gateway";
import { MongoHelper } from "./db";
import "dotenv/config";
export default class TransactionRepository implements TransactionGateway {
  async findAllTansactions(userId: string): Promise<any[]> {
    try {
      const transactionCollection = MongoHelper.getCollection(
        process.env.TRANSACTIONS_COLLECTION!
      );
      const transactionsFromUser = await transactionCollection
        .find({ userId })
        .toArray();
      return transactionsFromUser;
    } catch (error: any) {
      throw new ApplicationError(500, "unexpected error");
    }
  }
  async findTransactionById(id: string): Promise<TransactionProperties> {
    try {
      const transactionCollection = MongoHelper.getCollection(
        process.env.TRANSACTIONS_COLLECTION!
      );
      const transaction = await transactionCollection.findOne({
        _id: new ObjectId(id),
      });

      return transaction as unknown as TransactionProperties;
    } catch (error: any) {
      console.log();
      throw new ApplicationError(500, "unexpected error, please check the id");
    }
  }
  async save(
    transactionData: CreateTransactionDto
  ): Promise<TransactionProperties> {
    try {
      const transactionCollection = MongoHelper.getCollection(
        `${process.env.TRANSACTIONS_COLLECTION}`
      );

      const transaction = await transactionCollection.insertOne(
        transactionData
      );
      return transaction as any as TransactionProperties;
    } catch (error) {
      throw new ApplicationError(
        500,
        "unexpected error, transaction was not saved"
      );
    }
  }
}
