import { ApplicationError } from "./errors";
import Presenter from "./presenter";

export default abstract class Interactor<InputModel, ResponseModel> {
  private _presenter: Presenter<ResponseModel>;

  protected abstract execute(input: InputModel): Promise<ResponseModel>;

  constructor(presenter: any) {
    this._presenter = presenter;
  }

  public async run(input: InputModel) {
    const response = await this.execute(input);
    if (response instanceof ApplicationError) {
      return this._presenter.showError(response);
    }
    return this._presenter.showSuccess(response);
  }
}
