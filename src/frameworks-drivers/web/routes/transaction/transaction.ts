import { getOneTransactionService } from "./../../factories/get-one-transaction-factory";
import { getAllTransactionService } from "./../../factories/get-all-transaction-factory";
import { Router } from "express";
import { transactionService } from "../../factories/create-transaction-factory";
import { auth } from "../../middlewares/auth";

const router = Router();
router.route("/create").post(auth, transactionService);
router.route("/get-all-transactions").get(auth, getAllTransactionService);
router.route("/get-one-transaction/:id").get(auth, getOneTransactionService);
export default router;
