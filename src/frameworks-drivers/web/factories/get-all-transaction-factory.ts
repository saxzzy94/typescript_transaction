import { Request, Response } from "express";
import ResultPresenter from "../../../adapters/helper/result-presenter";
import GetAllTransactionInteractor from "../../../interactors/usecases/transaction/get-all-transactions.interactor";
import TransactionRepository from "../../external/database/mongo-transaction-repository";

export const getAllTransactionService = async (req: Request, res: Response) => {
  try {
    const transactionRepository = new TransactionRepository();
    const presenter = new ResultPresenter();
    const interactor = new GetAllTransactionInteractor(
      transactionRepository,
      presenter
    );
    const userId = req.body._id.toString();

    const transactions = await interactor.run(userId);

    res.json(transactions);
  } catch (error) {
    res.json(error);
  }
};
