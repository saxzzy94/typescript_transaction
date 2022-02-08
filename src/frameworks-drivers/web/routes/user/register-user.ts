import { Router } from "express";
import { registerService } from "../../factories/register-factory";

const router = Router();
router.route("/register").post(registerService);
export default router;
