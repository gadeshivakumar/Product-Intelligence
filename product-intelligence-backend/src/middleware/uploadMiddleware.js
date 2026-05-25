const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, "src/uploads/");
  },

  filename: (req, file, cb) => {

    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9);

    cb(
      null,
      uniqueName +
        path.extname(file.originalname)
    );
  },
});

const fileFilter = (
  req,
  file,
  cb
) => {

  const allowedTypes = [
    "video/mp4",
    "video/mov",
    "video/avi",
    "video/quicktime",
  ];

  if (
    allowedTypes.includes(file.mimetype)
  ) {
    cb(null, true);

  } else {

    cb(
      new Error(
        "Only video files are allowed"
      ),
      false
    );
  }
};

const upload = multer({
  storage,

  limits: {
    fileSize: 50 * 1024 * 1024,
  },

  fileFilter,
});

module.exports = upload;