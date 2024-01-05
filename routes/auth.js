const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
var fetchuser = require("../middleware/fetchuser");
const { createUser, getUser, loginUser } = require("../controllers/auth");
const {
  upload,
  handleMulterError,
} = require("../services/imageHandler/multer");
// Route : 1 Create User
router.post(
  "/createuser",
  upload.single("profile"),
  handleMulterError,
  [
    body("email").isEmail(),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be more than 5 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{5,}$/
      )
      .withMessage(
        "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character"
      ),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    createUser(req, res);
  }
);

// Route : 2 Authenticating at login
router.post(
  "/login",
  body("email", "Please Enter Valid email").isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    loginUser(req, res);
  }
);

// Route : 3 /get loggedIn User details and Login is required here
router.get("/getuser", fetchuser, async (req, res) => {
  getUser(req, res);
});

module.exports = router;
