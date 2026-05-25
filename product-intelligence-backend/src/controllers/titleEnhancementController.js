const {
  successResponse,
  errorResponse,
} = require("../utils/apiResponse");

const {
  enhanceProductTitle,
} = require("../services/titleEnhancementService");

const enhanceTitle =
  async (
    req,
    res,
    next
  ) => {

    try {

      const { skuId } =
        req.params;

      const result =
        await enhanceProductTitle(
          skuId
        );

      return successResponse(
        res,
        "Title enhanced successfully",
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
  enhanceTitle,
};