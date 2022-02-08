"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_factory_1 = require("../../factories/login-factory");
const router = (0, express_1.Router)();
router.route("/login").post(login_factory_1.loginService);
exports.default = router;
