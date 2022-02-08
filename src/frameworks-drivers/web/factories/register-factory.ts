import { Request, Response } from "express";
import Encoder from "../../../adapters/helper/encoder";
import RegisterUserController from "../../../adapters/user/register-user/register-user.controller";
import RegisterUserPresenter from "../../../adapters/user/register-user/register-user.presenter";
import RegisterUserInteractor from "../../../interactors/usecases/user/register-user/register-user.interactor";
import { UserRepository } from "../../external/database/mongo-user-repository";

export const registerService = async (req: Request, res: Response) => {
  const presenter = new RegisterUserPresenter();
  const userRepository = new UserRepository();
  const encoder = new Encoder();
  const interactor = new RegisterUserInteractor(
    userRepository,
    presenter,
    encoder
  );
  const result = await new RegisterUserController(interactor).run(req);
  console.log({ factory: result });
  if (result.statusCode === 201) {
    res.status(201).json(result);
  } else {
    res.status(result.statusCode).json(result);
  }
};
