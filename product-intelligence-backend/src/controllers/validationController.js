const {
  successResponse,
  errorResponse,
} = require("../utils/apiResponse");

const {
  validateProduct,
  getProductIssues,
} = require("../services/validationService");

const prisma =
  require("../config/prisma");

const validateSingleProduct =
  async (
    req,
    res,
    next
  ) => {

    try {

      const { skuId } =
        req.params;

      const product =
        await prisma.product.findUnique({
          where: {
            skuId,
          },
        });

      if (!product) {

        return errorResponse(
          res,
          "Product not found",
          null,
          404
        );
      }

      const result =
        await validateProduct(
          product.id
        );

      return successResponse(
        res,
        "Product validated successfully",
        result
      );

    } catch (error) {
      next(error);
    }
  };

const getIssues =
  async (
    req,
    res,
    next
  ) => {

    try {

      const { skuId } =
        req.params;

      const issues =
        await getProductIssues(
          skuId
        );

      return successResponse(
        res,
        "Product issues fetched successfully",
        issues
      );

    } catch (error) {
      next(error);
    }
  };

module.exports = {
  validateSingleProduct,

  getIssues,
};