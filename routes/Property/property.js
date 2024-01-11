const express = require("express");
const router = express.Router();

// Require controller modules.

// Create Property API
router.post("/properties", (req, res) => {
    // console.log(req);
    req.body.userID = req.session.user._id;
    let createProperty = require("../controllers/property").createNewProperty;
    createProperty(req, res);
    });
    
module.exports = router;
