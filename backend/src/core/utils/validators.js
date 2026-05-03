const { AppError } = require("../errors/AppError");

function ensureRequiredFields(payload, fields) {
  const missing = fields.filter((field) => {
    const value = payload[field];
    return value === undefined || value === null || value === "";
  });

  if (missing.length > 0) {
    throw new AppError("Validation failed.", 400, {
      missingFields: missing,
    });
  }
}

function ensureAllowedValue(value, allowed, fieldName) {
  if (!allowed.includes(value)) {
    throw new AppError(`Invalid ${fieldName}.`, 400, {
      allowedValues: allowed,
    });
  }
}

module.exports = {
  ensureRequiredFields,
  ensureAllowedValue,
};
