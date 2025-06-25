const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['video/mp4', 'image/jpeg', 'image/png', 'application/pdf'];
  allowedTypes.includes(file.mimetype) ? cb(null, true) : cb(new Error("Invalid file type"), false);
};

const upload = multer({ storage, fileFilter });
module.exports = upload;
