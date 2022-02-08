import { ApplicationError } from "./../common/errors";
import Transaction from "../../../entities/transaction/Transaction";
import { TransactionGateway } from "../../gateway/transaction-gateway";
import Interactor from "../common/interactor";
import Presenter from "../common/presenter";

export default class GetAllTransactionInteractor extends Interactor<
  any,
  Transaction[]
> {
  constructor(
    private transactionGateway: TransactionGateway,
    private presenter: Presenter<any>
  ) {
    super(presenter);
  }
  protected async execute(input: string): Promise<Transaction[]> {
    try {
      const userId = input;
      if (!userId) {
        throw new ApplicationError(404, "user not found");
      }
      const transactions = await this.transactionGateway.findAllTansactions(
        userId
      );
      return transactions;
    } catch (error: any) {
      throw new ApplicationError(500, error.message);
    }
  }
}
