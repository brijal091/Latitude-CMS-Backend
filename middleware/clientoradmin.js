var jwt = require('jsonwebtoken');
const JWT_SECRET = "management"
const Client = require("../models/Client")

clientoradmin = async (req,res,next) => {
    const token = req.header('auth-token');
    if (!token){
        res.status(401).send({error: "You have to login to view this page"})
    }
    try {
        // Comparing Current Token with the Generated one 
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.client;
        console.log("This is your data", data)
        const user = await Client.findById(req.user.id)
        if(!user) return res.status(400).json({error: "You can not view this page"})
        req.user = data.user;
        // Next will run the next function 
        next()
    }
     catch (error) {
        res.status(401).send({error: "Please Login with Correct credentials"});
    }
}

module.exports = clientoradmin;