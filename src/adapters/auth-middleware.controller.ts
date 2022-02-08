import {
  ITokenManager,
  Payload,
} from "../interactors/usecases/common/token-manager";
import { ApplicationError } from "../interactors/usecases/common/errors";
import IAuthMiddleware from "./helper/auth-middleware";
import HttpResponse from "./helper/httpResponse";

export default class AuthMiddleware implements IAuthMiddleware {
  constructor(private tokenManager: ITokenManager) {}
  async handle(request: any) {
    const { accessToken} = request;

    if (!accessToken) {
      return new ApplicationError(403, "Invalid token");
    }

    const decodedTokenOrError = await this.tokenManager.verify(accessToken);

    return decodedTokenOrError as unknown as HttpResponse;
  }
}
