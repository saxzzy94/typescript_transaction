"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../../interactors/usecases/common/errors");
class ResultPresenter {
    showSuccess(response) {
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
    showError(error) {
        const heandleApplicationError = (error) => {
            return { statusCode: error.statusCode, message: error.message };
        };
        if (error instanceof errors_1.ApplicationError) {
            return heandleApplicationError(error);
        }
        return {
            statusCode: 500,
            message: "Unexpected server error",
        };
    }
}
exports.default = ResultPresenter;
