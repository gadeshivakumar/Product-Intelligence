require("dotenv").config();

const {
  initializeSchedulers,
} = require("./services/schedulerService");
const app = require("./app");

const logger = require("./config/logger");

initializeSchedulers();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(
    `Server running on port ${PORT}`
  );
});