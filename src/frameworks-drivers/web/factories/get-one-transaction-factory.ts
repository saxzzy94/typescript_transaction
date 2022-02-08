import { Request, Response } from "express";
import ResultPresenter from "../../../adapters/helper/result-presenter";
import GetOneTransactionController from "../../../adapters/transaction/get-one-transaction.controller";
import GetOneTransactionInteractor from "../../../interactors/usecases/transaction/get-one-transaction";
import TransactionRepository from "../../external/database/mongo-transaction-repository";

export const getOneTransactionService = async (req: Request, res: Response) => {
  try {
    const transactionRepository = new TransactionRepository();
    const presenter = new ResultPresenter();
    const interactor = new GetOneTransactionInteractor(
      transactionRepository,
      presenter
    );
    const { id } = req.params;

    const result = await new GetOneTransactionController(interactor).run(id);

    res.status(result.statusCode).json(result);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};
