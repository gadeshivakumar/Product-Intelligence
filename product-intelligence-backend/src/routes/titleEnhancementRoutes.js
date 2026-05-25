const express = require("express");

const {
  enhanceTitle,
} = require("../controllers/titleEnhancementController");

const router = express.Router();

/**
 * @swagger
 * /products/{skuId}/enhance-title:
 *   post:
 *     summary: Enhance product title
 */
router.post(
  "/products/:skuId/enhance-title",
  enhanceTitle
);

module.exports = router;