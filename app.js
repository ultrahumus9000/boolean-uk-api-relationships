var express = require("express");
var logger = require("morgan");
const doctorRouter = require("./src/doctors/router");
const appointmentRouter = require("./src/appointments/router");
var app = express();

app.use(logger("dev"));
app.use(express.json());

app.use("/doctors", doctorRouter);
app.use("/appointments", appointmentRouter);
app.all("*", (req, res) => {
  res.json("wrong routes");
});

module.exports = app;
