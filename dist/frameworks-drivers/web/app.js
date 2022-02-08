"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const register_user_1 = __importDefault(require("./routes/user/register-user"));
const login_user_1 = __importDefault(require("./routes/user/login-user"));
const transaction_1 = __importDefault(require("./routes/transaction/transaction"));
require("dotenv/config");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("welcome to transaction- API");
});
app.use("/users", register_user_1.default);
app.use("/users", login_user_1.default);
app.use("/transactions", transaction_1.default);
exports.default = app;
