const express = require("express");
const router = express.Router();

// Require controller modules.
let {createProperty, getProperty, getAllProperties} = require("../../controllers/Property/property");

// Create Property API
router.post("/add-property", (req, res) => {
    createProperty(req, res);
    });
// Get Property Details based on id
router.get("/get-property/:id", (req, res) => {
    getProperty(req,res)
}) 

// Get Properties
router.get("/getallproperties", (req, res) => {
    getAllProperties(req,res)
}) 
module.exports = router;
