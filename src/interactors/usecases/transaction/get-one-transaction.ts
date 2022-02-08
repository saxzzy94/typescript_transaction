import { ApplicationError } from "./../common/errors";
import { TransactionGateway } from "./../../gateway/transaction-gateway";
import Interactor from "../common/interactor";
import Presenter from "../common/presenter";
import Transaction from "../../../entities/transaction/Transaction";

export default class GetOneTransactionInteractor extends Interactor<
  any,
  Transaction
> {
  constructor(
    private transactionGateway: TransactionGateway,
    private presenter: Presenter<any>
  ) {
    super(presenter);
  }
  protected async execute(id: string): Promise<Transaction> {
    try {
      const transaction = await this.transactionGateway.findTransactionById(id);
      return transaction;
    } catch (error: any) {
      throw new ApplicationError(400, error.message);
    }
  }
}
