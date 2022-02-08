import { Payload } from './../../interactors/usecases/common/token-manager';
import { ApplicationError } from './../../interactors/usecases/common/errors';
import { ITokenManager } from "../../interactors/usecases/common/token-manager";
import jwt from "jsonwebtoken";
export default class JwtTokenManager implements ITokenManager {
  secret: string;
  constructor(secret: string) {
    this.secret = secret;
  }
  async sign(info: Payload, expiresIn: string): Promise<string> {
    return jwt.sign(info, this.secret, { expiresIn: "30days" });
  }
  async verify(token: string): Promise<Payload | ApplicationError> {
    try {
      const decoded = jwt.verify(token, this.secret) as Payload;
      return decoded;
    } catch (error: any) {
      return error;
    }
  }
}
