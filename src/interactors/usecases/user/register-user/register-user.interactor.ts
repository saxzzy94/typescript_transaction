import { ApplicationError } from "./../../common/errors";
import User, { UserProperties } from "../../../../entities/user/User";
import { UserGateway } from "../../../gateway/users-gateway";
import Interactor from "../../common/interactor";
import RegisterUserDto from "./register-user.dto";
import Presenter from "../../common/presenter";
import { IEncoder } from "../../common/encoder";

export default class RegisterUserInteractor extends Interactor<
  RegisterUserDto,
  UserProperties | ApplicationError
> {
  constructor(
    private userGateway: UserGateway,
    private presenter: Presenter<any>,
    private encoder: IEncoder
  ) {
    super(presenter);
  }

  protected async execute(
    data: RegisterUserDto
  ): Promise<UserProperties | ApplicationError> {
    try {
      const user = await this.userGateway.findUserByEmail(data.email);
      if (user) {
        throw new ApplicationError(409, "user already exist");
      }
      const encodePassword = await this.encoder.encode(data.password);
      const newUser = User.createUser({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: encodePassword,
      });
      const result = await this.userGateway.save(newUser);

      return result;
    } catch (error: any) {
      return error;
    }
  }
}
