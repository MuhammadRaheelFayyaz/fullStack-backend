const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config");
const { errorMSg } = require("../errors/error");
require("../models/user.model");

const User = mongoose.model("Users");

exports.test = (req, res) => {
  res.send({
    success: true
  });
};

exports.register = async (req, res) => {
  let { name, password } = req.body;
  try {
    const check = await User.getUserByName({ name });
    if (check) throw "User already exist";
    User.name = name;
    User.password = password;
    let dbUser = await User.create({ name, password });
    if (!dbUser) throw "User not created";
    let token = jwt.sign({ user_id: dbUser.id }, JWT_KEY, { expiresIn: "1d" });
    return res.send({
      token,
      user_id: dbUser._id,
      name: dbUser.name
    });
  } catch (error) {
    return res.send(errorMSg(error));
  }
};
exports.signIn = async (req, res) => {
  let { name, password } = req.params;
  try {
    let dbUser = await User.getUserByName({ name });
    if (!dbUser || dbUser.password !== password) throw "Wrong Credential";
    let token = jwt.sign({ user_id: dbUser.id }, JWT_KEY, { expiresIn: "1d" });
    return res.send({
      token,
      user_id: dbUser._id,
      name: dbUser.name
    });
  } catch (error) {
    return res.send(errorMSg(error));
  }
};

exports.authencateUser = async (req, res) => {
  try {
    if (!req.isAuth) throw "Token expire";
    let dbUser = await User.getUserById(req.userId);
    if (!dbUser) throw "User not exist";
    return res.send({
      user_id: dbUser._id,
      name: dbUser.name
    });
  } catch (error) {
    return res.send(errorMSg(error));
  }
};

exports.deleteUser = async (req, res) => {
  try {
    return res.send(await User.deleteUser(req.params.id));
  } catch (error) {
    return res.send(errorMSg(error));
  }
};

exports.getAllUser = async (req, res) => {
  try {
    if (!req.isAuth) throw "Token expire";
    return res.send(await User.getAllUser());
  } catch (error) {
    return res.send(errorMSg(error));
  }
};

exports.getDeletedUsers = async (req, res) => {
  try {
    return res.send(await User.getDeletedUsers());
  } catch (error) {
    return res.send(errorMSg(error));
  }
};

exports.getUnDeletedUsers = async (req, res) => {
  try {
    return res.send(await User.getUnDeletedUsers());
  } catch (error) {
    return res.send(errorMSg(error));
  }
};
