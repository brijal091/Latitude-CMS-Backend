const express = require("express");
const router = express.Router();
const Subdomain = require("../models/Subdomains")

// Route : 1 Create User
router.get(
  "/:subdomain",
  async (req, res) => {
   const {subdomain} = req.params
   let check = await Subdomain.findOne({domainName: subdomain});
   if(check) return res.status(400).json({msg: "Domain name is not available"});
   return res.status(200).json({msg: "Domain name is available"})
  }
);

module.exports = router;
