const doctorRouter = require("express").Router();

doctorRouter.get("/", (req, res) => {});
doctorRouter.get("/:id", (req, res) => {});
doctorRouter.patch("/:id", (req, res) => {});
doctorRouter.post("/", (req, res) => {});
doctorRouter.delete("/:id", (req, res) => {});

module.exports = doctorRouter;
// Build these routes and controllers for the doctor resource that work with the following fetch requests:
//     -- Full CRUD base routes
//     -- /doctors/:id/appointments returns the appointments from specific doctor
//         -- /doctors/:id/practice returns a list of places where the doctor has appoinments
//         -- /doctors/most-busy returns the doctor with the most appointments booked
//         -- /doctors/total-hours returns the total amount of time in appontments, ssuming each appointment is 30 mins
