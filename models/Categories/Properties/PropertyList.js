const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create User schema
const addressSchema = new mongoose.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: {type: Number, required: true}
})

const PropertySchema = new mongoose.Schema({
  propertyTitle: {
    type: String,
    required: true,
  },
  address: {
    type: addressSchema,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  amenities: {
    type: [String],
    required: true,
  },
  subDomain:{
    type: String,
    required: true
  },
  desc:{
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true
  },  
  agentName:{
    type: String,
    required: true
  },
  area: {
    type: Number,
    required: true
  },
  type:{
    type: String, // "rent" or "sale"
    enum: ["Sale", "Rent"],
  },
  price: {
    type: Number,
    required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("property", PropertySchema);
