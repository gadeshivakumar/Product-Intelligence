const express = require("express");

const {
  getAllAlerts,
  getSingleAlert,
  markAsRead,
} = require("../controllers/alertController");

const router = express.Router();

/**
 * @swagger
 * /alerts:
 *   get:
 *     summary: Get all alerts
 */
router.get(
  "/alerts",
  getAllAlerts
);

/**
 * @swagger
 * /alerts/{alertId}:
 *   get:
 *     summary: Get alert by ID
 */
router.get(
  "/alerts/:alertId",
  getSingleAlert
);

/**
 * @swagger
 * /alerts:
 *   get:
 *     summary: Get all alerts
 *
 *     tags:
 *       - Alerts
 *
 *     responses:
 *       200:
 *         description: Alerts fetched successfully
 */

router.patch(
  "/alerts/:alertId/read",
  markAsRead
);

module.exports = router;