import User from "../../../../entities/user/User";
import { UserGateway } from "../../../gateway/users-gateway";
import Interactor from "../../common/interactor";
import Presenter from "../../common/presenter";
import { loginUserDto } from "./login-user.dto";
import { IEncoder } from "../../common/encoder";
import { ITokenManager } from "../../common/token-manager";
import { ApplicationError } from "../../common/errors";
import { AuthenticationResult } from "../../common/authenticationResult";

export default class loginUserInteractor extends Interactor<
  loginUserDto,
  AuthenticationResult | ApplicationError
> {
  constructor(
    private userGateway: UserGateway,
    private presenter: Presenter<any>,
    private encoder: IEncoder,
    private tokenManager: ITokenManager
  ) {
    super(presenter);
  }
  protected async execute(input: loginUserDto): Promise<AuthenticationResult> {
    try {
      const { email, password } = input;
      let user = await this.userGateway.findUserByEmail(email);
      if (!user) {
        throw new ApplicationError(404, "no user found");
      }
      const passwordMatches = await this.encoder.compare(
        password,
        user.password
      );

      if (!passwordMatches) {
        throw new ApplicationError(400, "password does not match");
      }
      console.log({ user: user });
      const accessToken = await this.tokenManager.sign(
        { id: user._id } ,
        "2h"
      );
      const returnUser = { ...user, password: "" };
      user = returnUser;
      return {
        accessToken,
        user: user,
        password: "",
      };
    } catch (error) {
      throw error;
    }
  }
}
