const { doctor, appointment } = require("../database");
// Build these routes and controllers for the appointment resource that work with the following fetch requests:
//     -- Full CRUD base routes
//
//     -- /appointments?filter=type&value=value that returns appointments by filter

async function getAllAppointments(req, res) {
  const filterQuery = req.query.filter;
  const orderCommend = req.query.order;
  let result = [];
  try {
    if (filterQuery) {
    } else if (orderCommend) {
      result = await appointment.findMany({
        orderBy: {
          time: "desc",
        },
      });
    } else {
      result = await appointment.findMany();
    }

    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}
async function getAptWithDoctors(req, res) {
  try {
    const result = await appointment.findMany({
      include: {
        doctor: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
      },
    });
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}
async function updateAppointment(req, res) {}

async function makeNewAppointment(req, res) {
  try {
    const result = await appointment.create({
      data: {
        ...req.body,
      },
    });

    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}
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
