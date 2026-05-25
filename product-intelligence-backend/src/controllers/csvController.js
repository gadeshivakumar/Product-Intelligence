const {
  successResponse,
  errorResponse,
} = require("../utils/apiResponse");

const {
  processCSVUpload,
} = require("../services/csvImportService");

const uploadCSV = async (
  req,
  res,
  next
) => {
  try {

    if (!req.file) {

      return errorResponse(
        res,
        "CSV file is required",
        null,
        400
      );
    }

    const result =
      await processCSVUpload({
        file: req.file,
      });

    return successResponse(
      res,
      "CSV uploaded and processed successfully",
      result,
      201
    );

  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadCSV,
};