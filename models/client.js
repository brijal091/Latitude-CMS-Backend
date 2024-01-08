const mongoose = require("mongoose");
const { Schema } = mongoose;

const ClientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin:{
      type: Boolean,
      default: false
    },
    subdomain:{
      type: String,
      lowercase: true,
      trim:true,
      unique:true,
      match: [
        /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/,
        'Invalid subdomain format. Subdomain must start and end with a lowercase letter or number, with optional hyphens in between.',
      ],
    },
    projectCategory:{
      type: String,
      enum: {
        values: ['PROPERTY', 'HOTEL', 'E-COMMERCE', 'SPORTS'],
        message: 'Please select category from the given list.'
      }
    },
    profile:{
      type: String
    },
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.model("client", ClientSchema);
module.exports = Client;
