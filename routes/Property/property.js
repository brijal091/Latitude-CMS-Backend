const express = require("express");
const router = express.Router();

// Require controller modules.
let {
  createProperty,
  getProperty,
  getAllProperties,
  deleteProperty,
  editProperty
} = require("../../controllers/Property/property");

// Create Property API
router.post("/add-property", (req, res) => {
  createProperty(req, res);
});
// Get Property Details based on id
router.get("/get-property/:id", (req, res) => {
  getProperty(req, res);
});

// Get Properties
router.get("/getallproperties", (req, res) => {
  getAllProperties(req, res);
});

// Edit Property
router.put("/edit-property/:id", (req, res) => {
  editProperty(req, res);
});

// Delete Property
router.delete("/delete-property/:id", (req, res) => {
  deleteProperty(req, res);
});
module.exports = router;
