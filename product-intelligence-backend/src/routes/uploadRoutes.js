const express = require("express");

const upload =
  require("../middleware/uploadMiddleware");

const {
  uploadVideo,
} = require("../controllers/uploadController");

const router = express.Router();

/**
 * @swagger
 * /upload-video:
 *   post:
 *     summary: Upload product video
 *
 *     tags:
 *       - Uploads
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
 *               video:
 *                 type: string
 *                 format: binary
 *
 *               enhanceTitle:
 *                 type: boolean
 *
 *     responses:
 *       201:
 *         description: Video uploaded successfully
 */

router.post(
  "/upload-video",

  upload.single("video"),

  uploadVideo
);

module.exports = router;