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
// Build these routes and controllers for the appointment resource that work with the following fetch requests:
//     -- Full CRUD base routes
//         -- When you create an appointment, it should have a doctor assigned
//     -- /appointments?filter=type&value=value that returns appointments by filter
//         -- /appointments?order=recent returns appointments order by date
//         -- /appointment/doctors should return all doctors with appointments
