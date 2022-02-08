import { ApplicationError } from "./../../../interactors/usecases/common/errors";
import { FlutterTransaction } from "./../../external/payment-gateway.ts/flutterwave";
import { NextFunction, Request, Response } from "express";
import CreateTransactionInteractor from "../../../interactors/usecases/transaction/create-transaction.interactor";
import TransactionRepository from "../../external/database/mongo-transaction-repository";
import CreateTransactionController from "../../../adapters/transaction/create-transaction.controller";
import CreateTransactionPresenter from "../../../adapters/transaction/create-transaction.presenter";

export const transactionService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const transactionRepository = new TransactionRepository();
    const presenter = new CreateTransactionPresenter();
    const interactor = new CreateTransactionInteractor(
      transactionRepository,
      presenter
    );
    const response = await new FlutterTransaction().createTransaction(req);
    const userId = req.body._id.toString();
    const input = { ...response.data, userId };

    if (!response) {
      new ApplicationError(400, "An error occurred while ceating transaction");
      next();
    }
    const result = await new CreateTransactionController(interactor).run(input);
   
    return res.json(result.body);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
