const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/user.controller");

userRouter.get("/", userController.test);
userRouter.post("/register", userController.register);
module.exports = { userRouter };
