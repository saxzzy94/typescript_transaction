import GetOneTransactionInteractor from "../../interactors/usecases/transaction/get-one-transaction";

export default class GetOneTransactionController {
  constructor(private interactor: GetOneTransactionInteractor) {}
  async run(id: string) {
    return await this.interactor.run(id);
  }
}
