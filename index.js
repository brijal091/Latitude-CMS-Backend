const express = require("express");
var cors = require("cors");
require("./db");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());

// Middle ware
app.use(express.json());

// Available Routes
app.get("/", (req, res) => {
  console.log(`Server is running ${port}`);
  res.send("Server is running");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/checkdomain", require("./routes/subdomain"));
// app.use("/api/hotel", require("./routes/Hotel/hotels"))
app.use("/api/property", require("./routes/Property/property"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
