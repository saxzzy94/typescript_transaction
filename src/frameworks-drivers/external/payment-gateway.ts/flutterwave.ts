import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import "dotenv/config";

const Flutterwave = require("flutterwave-node-v3");

const flw = new Flutterwave(process.env.PUBLIC_KEY, process.env.SECRET_KEY);

export class FlutterTransaction {
  async createTransaction(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>
  ): Promise<{
    data: any;
  }> {
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

      const response = await flw.Charge.card(payload);
      if (response.meta.authorization.mode === "pin") {
        let payload2 = payload;
        payload2.authorization = {
          mode: "pin",
          fields: ["pin"],
          pin: 3310,
        };
        const reCallCharge = await flw.Charge.card(payload2);

        const callValidate = await flw.Charge.validate({
          otp: "12345",
          flw_ref: reCallCharge.data.flw_ref,
        });
        return callValidate;
      }

      return response;
    } catch (error: any) {
      return error;
    }
  }
}
