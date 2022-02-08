export default interface Presenter<ResponseModel> {
  showSuccess(response: ResponseModel):any;
  showError(error: Error): any;
}
