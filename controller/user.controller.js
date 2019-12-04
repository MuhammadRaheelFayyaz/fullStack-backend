const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { JWT_KEY } = require("../config");
require("../models/user.model");
const User = mongoose.model("Users");

exports.test = (req, res) => {
  res.send({
    success: true
  });
};

exports.register = async (req, res) => {
  let { name, password } = req.body;

  User.name = name;
  User.password = password;
  try {
    let check = await User.findOne({ name });
    if (check) res.status(500).send({ error: "user alredy exsist" });
    let dbUser = await User.create({ name, password });
    if (!dbUser) res.status(500).send({ error: "user not created" });
    let token = jwt.sign({ user_id: dbUser.id }, JWT_KEY, { expiresIn: "1d" });
    res.send({
      token
    });
  } catch (error) {
    res.status(500).send({ error });
  }
};
exports.signIn = async (req, res) => {
  let { name, password } = req.body;
  try {
    let dbUser = await User.findOne({ name });
    if (!dbUser || dbUser.password !== password)
      res.status(500).send({ error: "Wrong Credential" });
    let token = jwt.sign({ user_id: dbUser.id }, JWT_KEY, { expiresIn: "1d" });
    res.send({
      token
    });
  } catch (error) {
    res.status(500).send({ error });
  }
};
