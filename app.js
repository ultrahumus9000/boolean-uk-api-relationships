var express = require("express");

var logger = require("morgan");

var app = express();

app.use(logger("dev"));
app.use(express.json());

app.all("*", (req, res) => {
  res.json("wrong routes");
});

module.exports = app;
