const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
var fetchuser = require("../middleware/fetchuser");
const { getClients } = require("../controllers/client")

router.get("/get-clients", fetchuser, async (req, res) => {
    getClients(req, res)
   });
   module.exports = router;