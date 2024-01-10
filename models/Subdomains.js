const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    domainName: {
      type: String,
      required: true,
    },
    isActive:{
        type : Boolean ,
        default : false
    },
    client:{
        type : Schema.Types.ObjectId,
        ref : "Client"
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
