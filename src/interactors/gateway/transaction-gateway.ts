import { TransactionProperties } from "../../entities/transaction/Transaction";
import { CreateTransactionDto } from "../usecases/transaction/create-transaction.dto";

export interface TransactionGateway {
  findAllTansactions(id: string): Promise<any[]>;
  findTransactionById(id: string): Promise<TransactionProperties>;
  save(user: CreateTransactionDto): Promise<TransactionProperties>;
}
