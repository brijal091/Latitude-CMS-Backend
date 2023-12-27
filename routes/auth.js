const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
var fetchuser = require("../middleware/fetchuser");
const {createUser, getUser, loginUser} = require("../controllers/auth")
const {upload} = require("../services/imageHandler/multer")
// Route : 1 Create User
router.post(
  "/createuser",
  // body("email").isEmail(),
  // body("password", "Password must me more then 5 char").isLength({ min: 5 }),
  upload.single("profile"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    createUser(req, res)
  }
);

// Route : 2 Authenticating at login
router.post(
  "/login",
  body("email", "Please Enter Valid email").isEmail(),
  body("password", "Password must me more then 5 char").isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    loginUser(req, res)
  }
);

// Route : 3 /get loggedIn User details and Login is required here
router.post("/getuser", fetchuser, async (req, res) => {
 getUser(req, res)
});

module.exports = router;
