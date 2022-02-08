import User, { UserProperties } from "../../entities/user/User";
import RegisterUserDto from "../usecases/user/register-user/register-user.dto";

export interface UserGateway {
  findUserByEmail(email: string): Promise<UserProperties>;
  save(user: any): Promise<UserProperties>;
}
