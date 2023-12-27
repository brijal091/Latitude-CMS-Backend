const express = require("express")
const bcrypt = require("bcrypt");
const User = require("../models/User");
var jwt = require("jsonwebtoken");
const JWT_SECRET = "management";

const createUser = async (req, res) => {
    const { email, userName, isAdmin, isClient, projectCategory } = req.body;
    const profileImage = req.file.filename
    // check weather the user is already in database
    try {
      let user = await User.findOne({ email: email });
      if (user) {
        return res
          .status(400)
          .json({ error: "User with this email already exist." });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // Creating new user
      user = await User.create({
        userName,
        email,
        password: secPass,
        isAdmin,
        isClient,
        ...(isClient ? { projectCategory } : {}),
        ...(req.file && { image: req.file.filename }),
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const jwtData = jwt.sign(data, JWT_SECRET);
      res.json(jwtData);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Something went Wrong");
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "User with this email does not exist" });
      }
      const passCompair = await bcrypt.compare(password, user.password);
      if (!passCompair) {
        return res
          .status(400)
          .json({ error: "Email or Password is incorrect" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const jwtData = jwt.sign(data, JWT_SECRET);
      res.json({ jwtData, isAdmin: user.isAdmin, isClient: user.isClient });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Something is wrong");
    }
}

const getUser = async (req, res) => {
    try {
        const userId = req.user.id;
        // To Exclude the password field here in response we have used -password here at the end
        const user = await User.findById(userId).select("-password");
        res.send(user);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Something is wrong");
      }
}

module.exports = {
    createUser,
    loginUser,
    getUser
}