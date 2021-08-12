const patientsRouter = require("express").Router();

const {
  findAllPatients,
  findOnePatient,
  findOnePatientWithAppointment,
  findOnePatienWithDoctors,
  createNewPatient,
  updatePatient,
  deletePatients,
} = require("./controller");

patientsRouter.get("/", findAllPatients);
patientsRouter.get("/:id", findOnePatient);
patientsRouter.get("/:id/appointments", findOnePatientWithAppointment);
patientsRouter.get("/:id/doctors", findOnePatienWithDoctors);
patientsRouter.post("/", createNewPatient);
patientsRouter.patch("/:id", updatePatient);
patientsRouter.delete("/:id", deletePatients);

module.exports = patientsRouter;
