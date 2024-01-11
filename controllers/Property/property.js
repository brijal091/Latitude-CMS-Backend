const express = require("express");
const Property = require("../../models/Categories/Properties/PropertyList");

// Create Property API controller
const createProperty = async (req, res) => {
  const {
    propertyTitle,
    address,
    location,
    amenities,
    subDomain,
    desc,
    email,
    phone,
    agentName,
    size,
    type,
    price,
    configurations,
  } = req.body;
  try {
    const property = await Property.create({
      propertyTitle,
      address,
      location,
      amenities,
      subDomain,
      desc,
      email,
      phone,
      agentName,
      size,
      type,
      price,
      configurations,
    });
    if (!property)
      return res
        .status(400)
        .json({
          message: "Property not created, please try again sometimes later",
        });
    return res
      .status(200)
      .json({ message: "Your Property has been registered. Thank you." });
  } catch (error) {
    console.log("Something went wrong", error);
  }
};
// get Property API controller
const getProperty = async (req, res) => {
  const subdomain = req.headers.host;
  const property = await Property.findById(req.params.id);
  if (!property || property.subDomain !== subdomain)
    return res.status(404).send("No such property found");
  return res.status(200).json(property);
};

// get all Properties API controller
const getAllProperties = async (req, res) => {
  const subDomain = req.headers.host;
  const properties = await Property.find({subDomain});
  return res.status(200).json(properties);
};

module.exports = {
  createProperty,
  getProperty,
  getAllProperties,
};
