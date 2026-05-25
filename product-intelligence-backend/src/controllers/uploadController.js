const {
  successResponse,
  errorResponse,
} = require("../utils/apiResponse");

const {
  processVideoUpload,
} = require("../services/videoProcessingService");

const uploadVideo = async (
  req,
  res,
  next
) => {
  try {

    if (!req.file) {

      return errorResponse(
        res,
        "Video file is required",
        null,
        400
      );
    }

    const enhanceTitle =
      req.body.enhanceTitle === "true";

    const result =
      await processVideoUpload({
        file: req.file,

        enhanceTitle,
      });

    return successResponse(
      res,
      "Video uploaded and processed successfully",
      result,
      201
    );

  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadVideo,
};