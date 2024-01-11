var jwt = require('jsonwebtoken');
const JWT_SECRET = "management"
const Client = require("../models/client")

userisadmin = async (req,res,next) => {
    const token = req.header('auth-token');
    if (!token){
        res.status(401).send({error: "Only Admin can view this Page."})
    }
    try {
        // Comparing Current Token with the Generated one 
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.client;
        const user = await Client.findById(req.user.id)
        if(!user.isAdmin){
            return res.status(400).json({error: "Only admin can view this page"})
        }
        req.user = data.user;
        // Next will run the next function 
        next()
    }
     catch (error) {
        res.status(401).send({error: "Please Login with Correct credentials"});
    }
}

module.exports = userisadmin;