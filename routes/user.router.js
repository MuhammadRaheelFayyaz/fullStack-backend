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
userRouter.delete("/delete/:id", auth, userController.deleteUser);
userRouter.get("/get/all", auth, userController.getAllUser);
userRouter.get("/get/deleted", auth, userController.getDeletedUsers);
userRouter.get("/get/undeleted", auth, userController.getUnDeletedUsers);

module.exports = { userRouter };
