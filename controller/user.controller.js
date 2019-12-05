const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config");
require("../models/user.model");

exports.test = (req, res) => {
  res.send({
    success: true
  });
};

exports.register = async (req, res) => {
  let { name, password } = req.body;
  try {
    const User = mongoose.model("Users");
    let check = await User.findOne({ name });
    User.name = name;
    User.password = password;
    if (check) throw "User already exist";
    let dbUser = await User.create({ name, password });
    if (!dbUser) throw "User not created";
    let token = jwt.sign({ user_id: dbUser.id }, JWT_KEY, { expiresIn: "1d" });
    return res.send({
      token
    });
  } catch (error) {
    console.log("error :", error);
    return res.send({
      status: "error",
      message: error
    });
  }
};
exports.signIn = async (req, res) => {
  let { name, password } = req.body;
  try {
    const User = mongoose.model("Users");
    let dbUser = await User.findOne({ name });
    if (!dbUser || dbUser.password !== password) throw "Wrong Credential";
    let token = jwt.sign({ user_id: dbUser.id }, JWT_KEY, { expiresIn: "1d" });
    return res.send({
      token
    });
  } catch (error) {
    console.log("error :", error);
    return res.send({ status: "error", message: error });
  }
};

exports.authencateUser = async (req, res) => {
  try {
    if (!req.isAuth) throw "Token expire";
    const User = mongoose.model("Users");
    let dbUser = await User.findById(req.userId);
    if (!dbUser) throw "User not exist";
    return res.send({
      user_id: dbUser._id,
      name: dbUser.name
    });
  } catch (error) {
    console.log("error :", error);
    return res.send({
      status: "error",
      message: error
    });
  }
};
