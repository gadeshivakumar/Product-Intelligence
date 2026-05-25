const express = require("express");

const {
  healthCheck,
} = require("../controllers/healthController");

const router = express.Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check endpoint
 *     responses:
 *       200:
 *         description: Server healthy
 */
router.get("/health", healthCheck);

module.exports = router;