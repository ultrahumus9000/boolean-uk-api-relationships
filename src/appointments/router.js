const appointmentRouter = require("express").Router();
const {
  getAllAppointments,
  getAptWithDoctors,
  updateAppointment,
  makeNewAppointment,
  getOneAppointment,
  deleteAppointment,
} = require("./controller");
appointmentRouter.get("/", getAllAppointments);
appointmentRouter.get("/doctors", getAptWithDoctors);
appointmentRouter.get("/:id", getOneAppointment);
appointmentRouter.patch("/:id", updateAppointment);
appointmentRouter.post("/", makeNewAppointment);
appointmentRouter.delete("/:id", deleteAppointment);

module.exports = appointmentRouter;
