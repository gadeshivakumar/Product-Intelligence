const express = require("express");

const {
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
} = require("../controllers/productController");

const router = express.Router();


/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Products
 *
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Products fetched successfully
 */

router.get("/", getAllProducts);

/**
 * @swagger
 * /products/{skuId}:
 *   get:
 *     summary: Get product by SKU
 *
 *     tags:
 *       - Products
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
 *         description: Product fetched successfully
 *
 *       404:
 *         description: Product not found
 */

router.get("/:skuId", getSingleProduct);

/**
 * @swagger
 * /products/{skuId}:
 *   patch:
 *     summary: Update product
 *
 *     tags:
 *       - Products
 *
 *     parameters:
 *       - in: path
 *         name: skuId
 *         required: true
 *         schema:
 *           type: string
 *
 *     requestBody:
 *       required: true
 *
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             properties:
 *               productTitle:
 *                 type: string
 *
 *               price:
 *                 type: number
 *
 *               color:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Product updated successfully
 */

router.patch("/:skuId", updateSingleProduct);

module.exports = router;