const mongoose = require("mongoose");

const db = "mongodb+srv://brijalk:admin@cms.qe91rnt.mongodb.net/BVS"

mongoose.connect(db)
.then(()=>console.log("Connection Successful"))
.catch((err)=>console.log(err));
