// import "dotenv/config";
export const APP_NAME = process.env.APP_NAME || "App Name";
export const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
export const SECRET_KEY = process.env.SECRET_KEY || "mySecretKey";
export const MAILTRAP_HOST = process.env.MAILTRAP_HOST || "";
export const MAILTRAP_PORT = parseInt(process.env.MAILTRAP_PORT || "0");
export const MAILTRAP_USER = process.env.MAILTRAP_USER || "";
export const MAILTRAP_PASS = process.env.MAILTRAP_PASS || "";
export const MAIL_DISABLED = process.env.MAIL_DISABLED || "";
