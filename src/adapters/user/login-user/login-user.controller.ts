import loginUserInteractor from "../../../interactors/usecases/user/login-user/login-user.interactor";
import HttpRequest from "../../helper/httpRequest";

interface HttpRequestBody {
  email: string;
  password: string;
}

export default class LoginUserController {
  constructor(private interactor: loginUserInteractor) {}
  async run(input: HttpRequest<any, any, HttpRequestBody, any>) {
    if (input.body) {
      const request = {
        email: input.body.email,
        password: input.body.password,
      };

      return await this.interactor.run(request);
    }
  }
}
