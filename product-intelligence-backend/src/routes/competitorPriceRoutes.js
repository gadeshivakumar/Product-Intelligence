const express = require("express");

const {
  addManualCompetitorPrice,
  getPrices,
  refreshPrices,
  comparePrices,
} = require("../controllers/competitorPriceController");

const router = express.Router();

/**
 * @swagger
 * /products/{skuId}/competitor-prices:
 *   get:
 *     summary: Get competitor prices
 */
router.get(
  "/products/:skuId/competitor-prices",
  getPrices
);

/**
 * @swagger
 * /products/{skuId}/competitor-prices:
 *   post:
 *     summary: Add competitor price manually
 */
router.post(
  "/products/:skuId/competitor-prices",
  addManualCompetitorPrice
);

/**
 * @swagger
 * /products/{skuId}/price-comparison:
 *   get:
 *     summary: Compare product pricing
 */
router.get(
  "/products/:skuId/price-comparison",
  comparePrices
);

/**
 * @swagger
 * /competitor-prices/refresh:
 *   post:
 *     summary: Refresh competitor prices
 */
router.post(
  "/competitor-prices/refresh",
  refreshPrices
);

module.exports = router;