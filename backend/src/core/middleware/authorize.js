const { AppError } = require("../errors/AppError");

function authorize(...roles) {
  return (req, _res, next) => {
    if (!req.auth) {
      return next(new AppError("Unauthorized request.", 401));
    }

    if (!roles.includes(req.auth.role)) {
      return next(new AppError("You are not allowed to access this resource.", 403));
    }

    return next();
  };
}

module.exports = { authorize };
