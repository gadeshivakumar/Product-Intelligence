const express = require("express");

const multer = require("multer");

const path = require("path");

const {
  uploadCSV,
} = require("../controllers/csvController");

const router = express.Router();

const storage =
  multer.diskStorage({

    destination: (
      req,
      file,
      cb
    ) => {

      cb(null, "src/uploads/");
    },

    filename: (
      req,
      file,
      cb
    ) => {

      cb(
        null,
        Date.now() +
          path.extname(
            file.originalname
          )
      );
    },
  });

const upload = multer({
  storage,

  fileFilter: (
    req,
    file,
    cb
  ) => {

    if (
      file.mimetype ===
      "text/csv"
    ) {

      cb(null, true);

    } else {

      cb(
        new Error(
          "Only CSV files allowed"
        )
      );
    }
  },
});

/**
 * @swagger
 * /upload-products-csv:
 *   post:
 *     summary: Upload products CSV
 *
 *     tags:
 *       - CSV Imports
 *
 *     requestBody:
 *       required: true
 *
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *
 *     responses:
 *       201:
 *         description: CSV uploaded successfully
 */

router.post(
  "/upload-products-csv",

  upload.single("file"),

  uploadCSV
);

module.exports = router;