const express = require("express");

const {
  getQualitySummary,
} = require("../controllers/dashboardController");

const router = express.Router();

/**
 * @swagger
 * /dashboard/quality-summary:
 *   get:
 *     summary: Get dashboard quality summary
 *
 *     tags:
 *       - Dashboard
 *
 *     responses:
 *       200:
 *         description: Dashboard summary fetched successfully
 */

router.get(
  "/dashboard/quality-summary",
  getQualitySummary
);

module.exports = router;