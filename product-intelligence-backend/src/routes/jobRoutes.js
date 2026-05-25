const express = require("express");

const {
  getAllJobs,
  getSingleJob,
} = require("../controllers/jobController");

const router = express.Router();

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Get all jobs
 *
 *     tags:
 *       - Jobs
 *
 *     responses:
 *       200:
 *         description: Jobs fetched successfully
 */

router.get("/", getAllJobs);

/**
 * @swagger
 * /jobs/{jobId}:
 *   get:
 *     summary: Get job by ID
 */
router.get("/:jobId", getSingleJob);

module.exports = router;