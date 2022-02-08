import { Router } from "express";
import { loginService } from "../../factories/login-factory";

const router = Router();
router.route("/login").post(loginService);
export default router;
