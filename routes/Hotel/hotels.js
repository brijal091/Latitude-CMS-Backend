const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Hotels = require("../../models/Categories/Hotels/Hotels");
// const Rooms = require("../../models/");
const mongoose = require("mongoose");
// const {createHotel} = require("../../controllers/Hotel/hotel");
// Route : 1 Create Hotel
router.post(
  "/create-hotel",
  body("hotelName", "Hostname is required").notEmpty(),
  async (req, res) => {
    const result = validationResult(req);
    if (result.errors.length > 0) {
      return res.status(400).json({ errors: result.errors });
    }
    createHotel(req, res);
  }
);

// Define a route to fetch all rooms
router.get("/get-hotels", async (req, res) => {
  try {
    const hotels = await Hotels.find();
    res.json(hotels);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const hotelWithRooms = await Hotels.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) }, // Match the specific hotel
        },
        {
          $lookup: {
            from: "rooms",
            localField: "_id",
            foreignField: "hotel",
            as: "rooms",
          },
        },
      ]);
      console.log(hotelWithRooms);
      res.json(hotelWithRooms);
    } catch (error) {
      console.error("Error fetching hotel:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
