// Build these routes and controllers for the doctor resource that work with the following fetch requests:
//     -- Full CRUD base routes
//     -- /doctors/:id/appointments returns the appointments from specific doctor
//         -- /doctors/:id/practice returns a list of places where the doctor has appoinments
//         -- /doctors/most-busy returns the doctor with the most appointments booked
//         -- /doctors/total-hours returns the total amount of time in appontments, ssuming each appointment is 30 mins

async function getAllDoctors(req, res) {}
async function getOneDoctor(req, res) {}
async function getDoctorWithAppointments(req, res) {}
async function getOneDoctorPracticePlace(req, res) {}
async function getMostBusyDoctor(req, res) {}
async function getTotalHoursOneDoctor(req, res) {}
async function postNewDoctor(req, res) {}
async function updateOneDoctor(req, res) {}
async function deleteOneDoctor(req, res) {}

module.exports = {
  getAllDoctors,
  getOneDoctor,
  getDoctorWithAppointments,
  getOneDoctorPracticePlace,
  getMostBusyDoctor,
  getTotalHoursOneDoctor,
  postNewDoctor,
  updateOneDoctor,
  deleteOneDoctor,
};
