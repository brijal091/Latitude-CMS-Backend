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
      return res.status(400).json({
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
  try {
    const subdomain = req.headers.host;
    const property = await Property.findById(req.params.id);
    if (!property || property.subDomain !== subdomain)
      return res.status(404).send("No such property found");
    return res.status(200).json(property);
  } catch (error) {
    console.log(error);
    return res.send(500).json({ error: "Something went wrong" });
  }
};

// get all Properties API controller
const getAllProperties = async (req, res) => {
  try {
    const subDomain = req.headers.host;
    const properties = await Property.find({ subDomain });
    return res.status(200).json(properties);
  } catch (error) {
    console.log(error);
    return res.send(500).json({ error: "Something went wrong" });
  }
};

// get all Properties API controller
const deleteProperty = async (req, res) => {
  try {
    const subDomain = req.headers.host;
    const id = req.params.id;
    const properties = await Property.findOneAndDelete({ _id: id, subDomain });
    if (!properties) return res.status(404).send("No Such Property Found.");
    else {
      return res.status(200).send("Successfully Deleted the Property.");
    }
  } catch (error) {
    console.log(error);
    return res.send(500).json({ error: "Something went wrong" });
  }
};

// edit property
const editProperty = async (req, res) => {
  const {id} = req.params;
  const subdomain = req.headers.host
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
    // Assuming you have a Mongoose Property model
  const updatedProperty = await Property.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        propertyTitle,
        address,
        location,
        amenities,
        desc,
        email,
        phone,
        agentName,
        size,
        type,
        price,
        configurations,
      },
    },
    { new: true } // This option returns the updated document
  );

  if (!updatedProperty) {
    return res.status(404).json({ error: 'Property not found' });
  }

  return res.status(200).json(updatedProperty);
  } catch (error) {
    console.log("Internal server error", error);
  }
};

module.exports = {
  createProperty,
  getProperty,
  getAllProperties,
  deleteProperty,
  editProperty,
};
