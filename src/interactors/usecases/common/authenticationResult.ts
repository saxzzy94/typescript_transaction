import { UserProperties } from "../../../entities/user/User";

export interface AuthenticationResult {
  accessToken: string;
  user: UserProperties
  password: string
}
