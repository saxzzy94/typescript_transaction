import { ApplicationError } from "../../interactors/usecases/common/errors";
import Presenter from "../../interactors/usecases/common/presenter";
import HttpResponse from "./httpResponse";

export default class ResultPresenter implements Presenter<HttpResponse> {
  showSuccess(response: any): any {
    return {
      statusCode: 200,
      body: {
        status: `successful`,
        data: {
          id: response.insertedId || response._id,
          response,
        },
      },
    };
  }
  showError(error: Error): any {
    const heandleApplicationError = (error: ApplicationError) => {
      return { statusCode: error.statusCode, message: error.message };
    };
    if (error instanceof ApplicationError) {
      return heandleApplicationError(error);
    }

    return {
      statusCode: 500,
      message: "Unexpected server error",
    };
  }
}
