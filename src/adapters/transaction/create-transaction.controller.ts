import { ApplicationError } from "./../../interactors/usecases/common/errors";
import { TransactionProperties } from "../../entities/transaction/Transaction";
import CreateTransactionInteractor from "../../interactors/usecases/transaction/create-transaction.interactor";

export default class CreateTransactionController {
  constructor(private interactor: CreateTransactionInteractor) {}

  public run(input: TransactionProperties) {
    if (input) {
      const result = this.interactor.run(input);
      return result;
    }
    throw new ApplicationError(500, "Unexpected error");
  }
}
