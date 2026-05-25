const express = require("express");

const {
  validateSingleProduct,
  getIssues,
} = require("../controllers/validationController");

const router = express.Router();

/**
 * @swagger
 * /products/{skuId}/validate:
 *   post:
 *     summary: Validate product
 */
router.post(
  "/products/:skuId/validate",
  validateSingleProduct
);

/**
 * @swagger
 * /products/{skuId}/validate:
 *   post:
 *     summary: Validate product
 *
 *     tags:
 *       - Validation
 *
 *     parameters:
 *       - in: path
 *         name: skuId
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Product validated successfully
 */
router.get(
  "/products/:skuId/issues",
  getIssues
);

module.exports = router;