const express = require("express");
const User = require("../models/User");

const getClients = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if(user.isAdmin) {
            let allClients = await User.find({isClient: true})
            return res.status(200).json(allClients)
        }
        res.send({message: "Only Admin can view this data"});
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Something is wrong");
      }
}

module.exports = {
    getClients
}