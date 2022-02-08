import { ApplicationError } from "../../interactors/usecases/common/errors";
import { Payload } from "../../interactors/usecases/common/token-manager";
import HttpResponse from "./httpResponse";
export default interface IAuthMiddleware {
  handle(request: any): Promise< HttpResponse>;
}
