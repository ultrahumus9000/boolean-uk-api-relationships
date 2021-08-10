// Build these routes and controllers for the appointment resource that work with the following fetch requests:
//     -- Full CRUD base routes
//         -- When you create an appointment, it should have a doctor assigned
//     -- /appointments?filter=type&value=value that returns appointments by filter
//         -- /appointments?order=recent returns appointments order by date
//         -- /appointment/doctors should return all doctors with appointments
async function getAllAppointments(req, res) {}
async function getAptWithDoctors(req, res) {}
async function updateAppointment(req, res) {}
async function makeNewAppointment(req, res) {}
async function getOneAppointment(req, res) {}
async function deleteAppointment(req, res) {}

module.exports = {
  getAllAppointments,
  getAptWithDoctors,
  updateAppointment,
  makeNewAppointment,
  getOneAppointment,
  deleteAppointment,
};
