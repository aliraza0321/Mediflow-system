const jwt = require("jsonwebtoken");

const { env } = require("../../config/env");
const { AppError } = require("../errors/AppError");

function authenticate(req, _res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return next(new AppError("Authentication token is missing.", 401));
  }

  const token = header.replace("Bearer ", "").trim();

  try {
    const payload = jwt.verify(token, env.jwtSecret);
    req.auth = payload;
    return next();
  } catch (error) {
    return next(new AppError("Invalid or expired authentication token.", 401));
  }
}

module.exports = { authenticate };
