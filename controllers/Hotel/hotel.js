const express = require("express");
const Hotels = require("../../models/Categories/Hotels/Hotels")
const createHotel = async (req, res) => {
    const {
        hotelCode,
        hotelName,
        location,
        address,
        facilities,
        email,
        phone,
      } = req.body;
      const hotelExist = await Hotels.findOne({ hotelCode });
      if (hotelExist)
        return res
          .status(401)
          .json({ error: "Hotel with this code already exist" });
      const newHotel = new Hotels({
        hotelCode,
        hotelName,
        location,
        address,
        facilities,
        email,
        phone,
      });
      // Save the data in database
      let savedHotel = await newHotel.save();
      return res.status(201).send(savedHotel);
  };


  module.exports = {
    createHotel,
  };
  