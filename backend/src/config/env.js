/*const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
  path: process.env.NODE_ENV === "test"
    ? path.resolve(process.cwd(), ".env.test")
    : path.resolve(process.cwd(), ".env"),
});

const env = {
  port: Number(process.env.PORT || 5000),
  jwtSecret: process.env.JWT_SECRET || "mediflow-dev-secret",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  nodeEnv: process.env.NODE_ENV || "development",
};

module.exports = { env };*/

const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
    path: process.env.NODE_ENV === "test"
        ? path.resolve(process.cwd(), ".env.test")
        : path.resolve(process.cwd(), ".env"),
});

const env = {
    port: Number(process.env.PORT || 5000),
    jwtSecret: process.env.JWT_SECRET || "mediflow-dev-secret",
    clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
    nodeEnv: process.env.NODE_ENV || "development",

    // Database Mapping
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: Number(process.env.DB_PORT || 3306),
    DB_USER: process.env.DB_USER || "root",
    DB_PASSWORD: process.env.DB_PASSWORD || "",
    DB_NAME: process.env.DB_NAME || "Medicare",
};

module.exports = { env };
