const logger = require("../config/logger");

const errorHandler = (err, req, res, next) => {
  logger.error(err);

  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    data: null,
    error: process.env.NODE_ENV === "development"
      ? err.stack
      : null,
  });
};

module.exports = errorHandler;