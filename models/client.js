const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const clientSchema = new Schema(
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
      required: true,
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
clientSchema.pre('save', async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});
const Client = mongoose.model("client", clientSchema);
module.exports = Client;
