const {
  successResponse,
} = require("../utils/apiResponse");

const {
  getDashboardSummary,
} = require("../services/dashboardService");

const getQualitySummary =
  async (
    req,
    res,
    next
  ) => {

    try {

      const summary =
        await getDashboardSummary();

      return successResponse(
        res,
        "Dashboard summary fetched successfully",
        summary
      );

    } catch (error) {
      next(error);
    }
  };

module.exports = {
  getQualitySummary,
};