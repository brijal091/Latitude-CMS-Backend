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

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // file size should not be more than 5MB
  },
  fileFilter: function (_req, file, cb) {
    const acceptedFiles = ["image/jpeg", "image/jpg", "image/png"]
    if(!acceptedFiles.includes(file.mimetype)) cb(new Error("Invalid file type. Only JPEG, PNG, and JPG files are allowed."), false); // Reject the file
    else cb(null, true); // Accept the file
  },
});

// Custom middleware to handle Multer errors
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ error: err.message });
  } else if (err) {
    res.status(500).json({ error: "Internal Server Error", message: err.message});
  } else {
    next();
  }
};

module.exports = { upload, handleMulterError };
