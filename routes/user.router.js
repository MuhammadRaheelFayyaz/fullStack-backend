const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/user.controller");
const auth = require("../midelware/auth");
userRouter.get("/", userController.test);
userRouter.post("/register", userController.register);
userRouter.get("/signin/:name/:password", userController.signIn);
userRouter.get("/authenticate", auth, userController.authencateUser);

module.exports = { userRouter };
