const doctorRouter = require("express").Router();

const {
  getAllDoctors,
  getOneDoctor,
  getDoctorWithAppointments,
  getOneDoctorPracticePlace,
  getMostBusyDoctor,
  getTotalHoursOneDoctor,
  postNewDoctor,
  updateOneDoctor,
  deleteOneDoctor,
} = require("./controller");

doctorRouter.get("/", getAllDoctors);
doctorRouter.get("/doctor/:id", getOneDoctor);
doctorRouter.get("/:id/appointments", getDoctorWithAppointments);
doctorRouter.get("/:id/practice", getOneDoctorPracticePlace);
doctorRouter.get("/mostbusy", getMostBusyDoctor);
doctorRouter.get("/total-hours", getTotalHoursOneDoctor);
doctorRouter.patch("/:id", updateOneDoctor);
doctorRouter.post("/", postNewDoctor);
doctorRouter.delete("/:id", deleteOneDoctor);

module.exports = doctorRouter;
// Build these routes and controllers for the doctor resource that work with the following fetch requests:
//     -- Full CRUD base routes
//     -- /doctors/:id/appointments returns the appointments from specific doctor
//         -- /doctors/:id/practice returns a list of places where the doctor has appoinments
//         -- /doctors/most-busy returns the doctor with the most appointments booked
//         -- /doctors/total-hours returns the total amount of time in appontments, ssuming each appointment is 30 mins
