const express = require("express");
const mongoose = require("mongoose");
const { PORT, DB_URL } = require("./config");
var bodyParser = require("body-parser");
const { router } = require("./route");
mongoose.connect(DB_URL, {
  useNewUrlParser: true
});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);
app.listen(PORT, console.log(`server running at port ${PORT}`));
