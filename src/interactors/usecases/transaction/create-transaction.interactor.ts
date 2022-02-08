import { TransactionProperties } from "./../../../entities/transaction/Transaction";
import { ApplicationError } from "./../common/errors";
import Transaction from "../../../entities/transaction/Transaction";
import Interactor from "../common/interactor";
import { CreateTransactionDto } from "./create-transaction.dto";
import Presenter from "../common/presenter";
import { TransactionGateway } from "../../gateway/transaction-gateway";

export default class CreateTransactionInteractor extends Interactor<
  CreateTransactionDto,
  Transaction | ApplicationError
> {
  constructor(
    private transactionGateway: TransactionGateway,
    private presenter: Presenter<any>
  ) {
    super(presenter);
  }
  protected async execute(
    input: any
  ): Promise<TransactionProperties | ApplicationError> {
    try {
      const transaction = Transaction.create({
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
      return await this.transactionGateway.save(transaction);
    } catch (err: any) {
      throw new ApplicationError(500, err.message);
    }
  }
}
