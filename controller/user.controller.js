const mongoose = require("mongoose");
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
    res.send({
      name: dbUser.name
    });
  } catch (error) {
    res.status(500).send({ error });
  }
};
