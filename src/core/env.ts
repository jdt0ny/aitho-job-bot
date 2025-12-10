import { config } from "dotenv";
config();
export const env = {
  isProduction: process.env.NODE_ENV === "production",
};  