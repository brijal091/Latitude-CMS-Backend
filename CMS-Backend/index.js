const express = require('express');
var cors = require('cors')
require("./db")

const app = express()
const port = 5000

app.use(cors());

// Middle ware 
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/client', require('./routes/client'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})