import GetAllTransactionInteractor from "../../interactors/usecases/transaction/get-all-transactions.interactor";

export default class GetAllTransactionController {
  constructor(private interactor: GetAllTransactionInteractor) {}
  run(input: any) {
    if (input) {
      const result = this.interactor.run(input);
      return result;
    }
  }
}
