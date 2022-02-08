import { IEncoder } from "../../interactors/usecases/common/encoder";
import * as bcrypt from "bcrypt";

export default class Encoder implements IEncoder {
  private saltRounds: number = 10;
  encode(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }
  compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
