import ApiError from "../utils/ApiError.js";
import { verifyToken } from "../utils/token.js";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // The backend expects tokens in this format: Authorization: Bearer <token>
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiError(401, "Authorization token is required"));
  }

  const token = authHeader.split(" ")[1];

  try {
    // After decoding the token, user info becomes available on req.user.
    req.user = verifyToken(token);
    next();
  } catch (error) {
    next(new ApiError(401, "Invalid or expired token"));
  }
};

export const authorize = (...allowedRoles) => (req, res, next) => {
  // A user may be logged in but still blocked from a route if the role is wrong.
  if (!req.user || !allowedRoles.includes(req.user.role)) {
    return next(new ApiError(403, "You are not allowed to access this resource"));
  }

  next();
};
