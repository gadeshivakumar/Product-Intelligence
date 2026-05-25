const logger =
  require("../config/logger");

const {
  refreshCompetitorPrices,
} = require("../services/competitorPriceService");

const runCompetitorPriceRefresh =
  async () => {

    try {

      logger.info(
        "Starting scheduled competitor price refresh..."
      );

      const result =
        await refreshCompetitorPrices();

      logger.info(
        {
          result,
        },
        "Competitor prices refreshed successfully"
      );

    } catch (error) {

      logger.error(
        {
          error:
            error.message,
        },
        "Scheduled price refresh failed"
      );
    }
  };

module.exports = {
  runCompetitorPriceRefresh,
};