import { Request, Response } from "express";
import Encoder from "../../../adapters/helper/encoder";
import JwtTokenManager from "../../../adapters/helper/jwt-token-manager";
import LoginUserController from "../../../adapters/user/login-user/login-user.controller";
import LoginUserPresenter from "../../../adapters/user/login-user/login-user.presenter";
import loginUserInteractor from "../../../interactors/usecases/user/login-user/login-user.interactor";
import { UserRepository } from "../../external/database/mongo-user-repository";

export const loginService = async (req: Request, res: Response) => {
  const encoder = new Encoder();
  const userRepository = new UserRepository();
  const jwtTokenManager = new JwtTokenManager("secret");
  const presenter = new LoginUserPresenter();

  const interactor = new loginUserInteractor(
    userRepository,
    presenter,
    encoder,
    jwtTokenManager
  );
  const result = await new LoginUserController(interactor).run(req);

  if (result.statusCode === 201) {
    res.status(201).json(result);
  } else {
    res.status(result.statusCode).json(result);
  }
};
