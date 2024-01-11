const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Subdomain = require("../models/Subdomains");
const Client = require("../models/client");
var jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const {
  getTransport,
  getToken,
  getMailOptions,
} = require("../services/mailHandler/mailHandler");

const createUser = async (req, res) => {
  const { name, email, password, cPassword } = req.body;
  const subdomain = req.headers.host;
  if (password !== cPassword)
    return res
      .status(400)
      .json({ error: "Password and confirm password does not match" });
  try {
    let user = await User.findOne({ email, subdomain });
    if (user) {
      return res
        .status(400)
        .json({ error: "User with this email already exist." });
    }
    user = await User.create({
      name,
      email,
      password,
      subdomain,
      ...(req.file && { profile: req.file.filename }),
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
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const subdomain = req.headers.host;
  try {
    let user = await User.findOne({ email, subdomain });
    if (!user) {
      return res
        .status(400)
        .json({ error: "User with this email does not exist" });
    }
    const passCompair = await bcrypt.compare(password, user.password);
    if (!passCompair) {
      return res.status(400).json({ error: "Email or Password is incorrect" });
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
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    // To Exclude the password field here in response we have used -password here at the end
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Something is wrong");
  }
};

// ========= CLIENT AUTH =================

const createClient = async (req, res) => {
  const { name, email, password, isAdmin, subdomain, projectCategory } =
    req.body;
  // Checking for existing client with the same Subdomain or Project Category
  try {
    let client = await Client.findOne({ email });
    if (client)
      return res.status(400).json({
        error: "Client already exist Please try again with another email.",
      });

    let subdomainIsAvailable = await Subdomain.findOne({
      domainName: subdomain,
    });
    if (subdomainIsAvailable)
      return res.status(400).json({
        error: "This domain is not available, please try another one.",
      });

    client = await Client.create({
      name,
      email,
      password,
      isAdmin,
      subdomain,
      projectCategory,
      ...(req.file && { profile: req.file.filename }),
    });
    if (client)
      new Subdomain({ domainName: subdomain, client: client._id }).save();
    //Send mail
    let mailRequest = getMailOptions(email, {
      email,
      password: req.body.password,
    });
    return getTransport().sendMail(mailRequest, (error) => {
      if (error) {
        res.status(500).send("Can't send email.");
      } else {
        res.status(200);
        res.send({
          message: `Credentials sent to ${email}`,
        });
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Something went Wrong");
  }
};

const loginClient = async (req, res) => {
  const { email, password } = req.body;
  const client = await Client.findOne({ email });
  if (!client) {
    return res
      .status(400)
      .json({ error: "User with this email does not exist" });
  }
  const passCompar = await bcrypt.compare(password, client.password);
  if (!passCompar) {
    return res.status(400).json({ error: "Email or Password is incorrect" });
  }
  const data = {
    client: {
      id: client.id,
    },
  };
  const jwtData = jwt.sign(data, JWT_SECRET);
  res.json({ jwtData, isAdmin: client.isAdmin });
};

const getClient = async (req, res) => {
  const { id } = req.params.id;
  const client = await Client.findById(id);
  if (!client) {
    return res.status(400).json({ error: "Client does not exist" });
  }
  res.send(client);
};

module.exports = {
  createUser,
  loginUser,
  getUser,

  createClient,
  loginClient,
  getClient,
};
