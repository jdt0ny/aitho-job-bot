"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchHtml = fetchHtml;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
const logger_1 = require("./logger");
async function fetchHtml(url) {
    try {
        const resp = await axios_1.default.get(url, {
            headers: { "User-Agent": config_1.config.userAgent },
            timeout: 15000,
        });
        if (typeof resp.data !== "string") {
            throw new Error("Response data is not a string.");
        }
        return resp.data;
    }
    catch (err) {
        if (axios_1.default.isAxiosError(err)) {
            logger_1.logger.error("fetchHtml axios error", {
                message: err.message,
                url: url,
                code: err.code,
            });
        }
        else {
            logger_1.logger.error("fetchHtml generic error", err);
        }
        throw err;
    }
}
