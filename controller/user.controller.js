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
  const User = mongoose.model("Users");

  User.name = name;
  User.password = password;
  try {
    let dbUser = await User.create({ name, password });
    if (!dbUser) {
      res.status(500).send({ error: "user not created" });
    }
    let token = jwt.sign(
      { user_id: dbUser.id, user_name: dbUser.name },
      JWT_KEY,
      { expiresIn: "1d" }
    );
    res.send({
      token
    });
  } catch (error) {
    res.status(500).send({ error });
  }
};
