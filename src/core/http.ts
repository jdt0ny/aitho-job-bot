import axios, { AxiosError } from "axios";
import { config } from "../config";
import { logger } from "./logger";

export async function fetchHtml(url: string): Promise<string> {
  try {
    const resp = await axios.get(url, {
      headers: { "User-Agent": config.userAgent },
      timeout: 15000,
    });
    if (typeof resp.data !== "string") {
      throw new Error("Response data is not a string.");
    }
    return resp.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      logger.error("fetchHtml axios error", {
        message: err.message,
        url: url,
        code: err.code,
      });
    } else {
      logger.error("fetchHtml generic error", err);
    }
    throw err;
  }
}
