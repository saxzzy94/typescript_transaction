"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlutterTransaction = void 0;
require("dotenv/config");
const Flutterwave = require("flutterwave-node-v3");
const flw = new Flutterwave(process.env.PUBLIC_KEY, process.env.SECRET_KEY);
class FlutterTransaction {
    createTransaction(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = {
                    card_number: req.body.cardNumber,
                    full_name: `${req.body.firstName} ${req.body.lastName}`,
                    cvv: req.body.cvv,
                    expiry_month: req.body.expiryMonth,
                    expiry_year: req.body.expiryYear,
                    email: req.body.email,
                    currency: "NGN",
                    amount: req.body.amount,
                    enckey: process.env.ENKEY,
                    tx_ref: process.env.TX_REF,
                    authorization: {},
                };
                const response = yield flw.Charge.card(payload);
                if (response.meta.authorization.mode === "pin") {
                    let payload2 = payload;
                    payload2.authorization = {
                        mode: "pin",
                        fields: ["pin"],
                        pin: 3310,
                    };
                    const reCallCharge = yield flw.Charge.card(payload2);
                    const callValidate = yield flw.Charge.validate({
                        otp: "12345",
                        flw_ref: reCallCharge.data.flw_ref,
                    });
                    return callValidate;
                }
                return response;
            }
            catch (error) {
                return error;
            }
        });
    }
}
exports.FlutterTransaction = FlutterTransaction;
