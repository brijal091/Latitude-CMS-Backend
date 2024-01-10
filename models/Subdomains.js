const mongoose = require("mongoose");
const { Schema } = mongoose;

const subDomainSchema = new Schema(
  {
    domainName: {
      type: String,
      required: true,
    },
    isActive:{
        type : Boolean ,
        default : true
    },
    client:{
        type : Schema.Types.ObjectId,
        ref : "client"
    }
  },
  {
    timestamps: true,
  }
);

const subdomain = mongoose.model("subdomain", subDomainSchema);
module.exports = subdomain;
