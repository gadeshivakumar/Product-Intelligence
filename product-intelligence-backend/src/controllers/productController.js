const {
  successResponse,
  errorResponse,
} = require("../utils/apiResponse");

const {
  getProducts,
  getProductBySku,
  updateProduct,
} = require("../services/productService");

const {
  updateProductSchema,
} = require("../validators/productValidator");

const getAllProducts = async (
  req,
  res,
  next
) => {
  try {

    const result =
      await getProducts(req.query);

    return successResponse(
      res,
      "Products fetched successfully",
      result
    );

  } catch (error) {
    next(error);
  }
};

const getSingleProduct = async (
  req,
  res,
  next
) => {
  try {

    const { skuId } = req.params;

    const product =
      await getProductBySku(skuId);

    if (!product) {
      return errorResponse(
        res,
        "Product not found",
        null,
        404
      );
    }

    return successResponse(
      res,
      "Product fetched successfully",
      product
    );

  } catch (error) {
    next(error);
  }
};

const updateSingleProduct = async (
  req,
  res,
  next
) => {
  try {

    const { skuId } = req.params;

    const validatedData =
      updateProductSchema.parse(req.body);

    const updatedProduct =
      await updateProduct(
        skuId,
        validatedData
      );

    return successResponse(
      res,
      "Product updated successfully",
      updatedProduct
    );

  } catch (error) {

    if (error.name === "ZodError") {

      return errorResponse(
        res,
        "Validation failed",
        error.errors,
        400
      );
    }

    next(error);
  }
};

module.exports = {
  getAllProducts,

  getSingleProduct,

  updateSingleProduct,
};