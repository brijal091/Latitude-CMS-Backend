const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "profiles")); // Set your upload directory
  },
  filename: (req, file, cb) => {
    // Generate a unique filename, you can use a library like uuid
    const uniqueFileName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage });

module.exports = {upload};