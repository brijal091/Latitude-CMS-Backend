const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
var fetchuser = require("../middleware/fetchuser");
var userisadmin = require("../middleware/userisadmin");
var clientoradmin = require("../middleware/clientoradmin");
const Client = require("../models/Client")
const { createUser, getUser, loginUser } = require("../controllers/auth");
const { createClient, getClients, getClient, loginClient } = require("../controllers/auth");
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
router.get("/getuser/:id",clientoradmin, async (req, res) => {
  getUser(req, res);
});

// =======================================CLIENT AUTH==============================================

// Route : 4 /Create new clients
router.post("/create-client",upload.single("profile"), userisadmin, async (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    createClient(req, res);
});
// Route : 5 /Client Login Page
router.post("/client-login", async (req, res) => {
  loginClient(req,res);
});
// Route : 6 /Get all clients
router.get('/allclients',userisadmin ,async (req, res)=>{
  try {
    let allClients = await Client.find()
    return res.send(allClients);
  } catch (error) {
    console.log(error);
    return res.status(500).json({msg:"Server Error"});
  }
  })
// Route : 7 /Get particular clients
router.get('/client/:id',userisadmin ,async (req, res)=>{
  const {id} = req.params
  try {
    let client = await Client.findById(id)
    if(!client) return res.status(400).json({error: "Client does not exist"})
    return res.send(client);
  } catch (error) {
    console.log(error);
    return res.status(500).json({msg:"Server Error"});
  }
  })
module.exports = router;
