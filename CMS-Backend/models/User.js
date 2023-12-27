const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    userName: {
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
    profile:{
      type: String
    },
    isAdmin:{
      type : Boolean ,
      default: false
    },
    projectCategory:{
      type: String,
      enum: {
        values: ['PROPERTY', 'HOTEL', 'E-COMMERCE'],
        message: 'Please select category from the given list.'
      }
    },
    isClient:{
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", UserSchema);
//   User.createIndexes();
module.exports = User;
