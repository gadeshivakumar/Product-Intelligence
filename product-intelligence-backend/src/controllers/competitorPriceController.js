const {
  successResponse,
  errorResponse,
} = require("../utils/apiResponse");

const {
  competitorPriceSchema,
} = require("../validators/competitorPriceValidator");

const {
  addCompetitorPrice,
  getCompetitorPrices,
  refreshCompetitorPrices,
  getPriceComparison,
} = require("../services/competitorPriceService");

const addManualCompetitorPrice =
  async (
    req,
    res,
    next
  ) => {

    try {

      const { skuId } =
        req.params;

      const validatedData =
        competitorPriceSchema.parse(
          req.body
        );

      const result =
        await addCompetitorPrice({
          skuId,

          ...validatedData,
        });

      return successResponse(
        res,
        "Competitor price added successfully",
        result,
        201
      );

    } catch (error) {

      return errorResponse(
        res,
        error.message,
        null,
        400
      );
    }
  };

const getPrices =
  async (
    req,
    res,
    next
  ) => {

    try {

      const { skuId } =
        req.params;

      const prices =
        await getCompetitorPrices(
          skuId
        );

      return successResponse(
        res,
        "Competitor prices fetched successfully",
        prices
      );

    } catch (error) {

      return errorResponse(
        res,
        error.message,
        null,
        404
      );
    }
  };

const refreshPrices =
  async (
    req,
    res,
    next
  ) => {

    try {

      const result =
        await refreshCompetitorPrices();

      return successResponse(
        res,
        "Competitor prices refreshed successfully",
        result
      );

    } catch (error) {
      next(error);
    }
  };

const comparePrices =
  async (
    req,
    res,
    next
  ) => {

    try {

      const { skuId } =
        req.params;

      const result =
        await getPriceComparison(
          skuId
        );

      return successResponse(
        res,
        "Price comparison generated successfully",
        result
      );

    } catch (error) {

      return errorResponse(
        res,
        error.message,
        null,
        404
      );
    }
  };

module.exports = {
  addManualCompetitorPrice,

  getPrices,

  refreshPrices,

  comparePrices,
};