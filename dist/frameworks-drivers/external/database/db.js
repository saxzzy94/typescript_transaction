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
exports.MongoHelper = void 0;
const mongodb_1 = require("mongodb");
require("dotenv/config");
exports.MongoHelper = {
    client: null,
    db: null,
    connect(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Connecting to Mongo");
            this.client = yield mongodb_1.MongoClient.connect(uri);
            this.db = this.client.db(process.env.DATABASE_NAME);
            console.log(`conneted to ${this.db.databaseName}`);
        });
    },
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.close();
        });
    },
    getCollection(name) {
        return this.client.db(process.env.DATABASE_NAME).collection(name);
    },
    clearCollection(name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client
                .db(process.env.DATABASE_NAME)
                .collection(name)
                .deleteMany({});
        });
    },
};
