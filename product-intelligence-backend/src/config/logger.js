const pino = require("pino");

const isProduction = process.env.NODE_ENV === "production";

const logger = isProduction
  ? pino()
  : pino({
      transport: {
        target: "pino-pretty",
      },
    });

module.exports = logger;