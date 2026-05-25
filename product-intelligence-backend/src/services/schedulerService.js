const cron =
  require("node-cron");

const logger =
  require("../config/logger");

const {
  runCompetitorPriceRefresh,
} = require("../jobs/competitorPriceRefreshJob");

const initializeSchedulers =
  () => {

    logger.info(
      "Initializing schedulers..."
    );

    /*
      Every 30 minutes
    */
    cron.schedule(
      "*/30 * * * *",

      async () => {

        logger.info(
          "Running scheduled competitor refresh"
        );

        await runCompetitorPriceRefresh();
      }
    );

    logger.info(
      "Schedulers initialized successfully"
    );
  };

module.exports = {
  initializeSchedulers,
};