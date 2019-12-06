const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/user.controller");
const auth = require("../midelware/auth");
const validater = require("../midelware/validater");
const validation = require("../midelware/validate.schema");
userRouter.get("/", userController.test);
userRouter.post(
  "/register",
  validater(validation.register),
  userController.register
);
userRouter.get("/signin/:name/:password", userController.signIn);
userRouter.get("/authenticate", auth, userController.authencateUser);

module.exports = { userRouter };
