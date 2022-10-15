"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var _a = process.env, POSTGRS_HOST = _a.POSTGRS_HOST, POSTGRS_DB = _a.POSTGRS_DB, POSTGRS_USER = _a.POSTGRS_USER, POSTGRS_PASSWORD = _a.POSTGRS_PASSWORD, PORT = _a.PORT;
var client = new pg_1.Pool({ host: POSTGRS_HOST,
    port: PORT,
    database: POSTGRS_DB,
    user: POSTGRS_USER,
    password: POSTGRS_PASSWORD });
exports.default = client;
