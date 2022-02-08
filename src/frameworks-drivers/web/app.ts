import express, { json } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import registerUser from "./routes/user/register-user";
import loginUser from "./routes/user/login-user";
import transactionRoute from "./routes/transaction/transaction";
import "dotenv/config";

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("welcome to transaction- API");
});
app.use("/users", registerUser);
app.use("/users", loginUser);
app.use("/transactions", transactionRoute);
export default app;
