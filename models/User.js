const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
var jwt = require("jsonwebtoken");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    subdomain: {
      type:String,
      lowercase :true,
      trim :true,
    },
    profile:{
      type: String
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// userSchema.methods.generateToken = async function(){
//   try {
//     let token = jwt.sign({_id: this._id}, process.env.JWT_SECRET)
//     return token;
//   } catch (error) {
//     console.log(error)
//   }
// }

const User = mongoose.model("user", userSchema);
module.exports = User;
