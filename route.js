const express = require("express");
const router = express.Router();
const { userRouter } = require("./routes/user.router");
router.get("/", (req, res) => res.send({ success: true }));
router.use("/user", userRouter);
module.exports = { router };
