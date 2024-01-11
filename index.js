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
  console.log(`Server is running on http://localhost:${port}`);
  // You can also send a response to the client if needed
  res.send("Server is Connected");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/checkdomain", require("./routes/subdomain"));
// app.use("/api/hotel", require("./routes/Hotel/hotels"))
// app.use("/api/property", require("./routes/Property/property"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
