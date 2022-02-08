import HttpRequest from "../../helper/httpRequest";
import RegisterUserInteractor from "../../../interactors/usecases/user/register-user/register-user.interactor";
import { UserProperties } from "../../../entities/user/User";

interface HTTPRegisterRequestBody {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  gender: string;
}

export default class RegisterUserController {
  constructor(private interactor: RegisterUserInteractor) {}

  async run(input: HttpRequest<any, any, HTTPRegisterRequestBody, any>) {
    if (input.body) {
      const request: UserProperties = {
        email: input.body.email,
        firstName: input.body.firstName,
        lastName: input.body.lastName,
        password: input.body.password,
      };
      const result = await this.interactor.run(request);
      return result;
    }
  }
}
