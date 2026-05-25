const {
  successResponse,
  errorResponse,
} = require("../utils/apiResponse");

const {
  getJobs,
  getJobById,
} = require("../services/jobService");

const getAllJobs = async (
  req,
  res,
  next
) => {
  try {

    const result =
      await getJobs(req.query);

    return successResponse(
      res,
      "Jobs fetched successfully",
      result
    );

  } catch (error) {
    next(error);
  }
};

const getSingleJob = async (
  req,
  res,
  next
) => {
  try {

    const { jobId } = req.params;

    const job =
      await getJobById(jobId);

    if (!job) {
      return errorResponse(
        res,
        "Job not found",
        null,
        404
      );
    }

    return successResponse(
      res,
      "Job fetched successfully",
      job
    );

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllJobs,

  getSingleJob,
};