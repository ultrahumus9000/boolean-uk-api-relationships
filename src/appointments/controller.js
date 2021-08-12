const { doctor, appointment, patient } = require("../database");
// Build these routes and controllers for the appointment resource that work with the following fetch requests:
//     -- Full CRUD base routes
//
//     -- /appointments?filter=type&value=value that returns appointments by filter

function handleError(error) {
  return error.message ? error.message : error;
}

async function getAllAppointments(req, res) {
  const { filter, value } = req.query;
  const orderCommend = req.query.order;
  let result = [];
  try {
    if (filter && value) {
    } else if (orderCommend === "recent") {
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
        patient: {
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
async function updateAppointment(req, res) {
  const appointmentId = Number(req.params.id);

  try {
    let appontments = await appointment.findMany();
    const appontmentsIds = appontments.map((appontment) => appontment.id);

    if (appontmentsIds.includes(appointmentId)) {
      const appointmentInfo = await appointment.findUnique({
        where: { id: appointmentId },
      });

      const result = await appointment.update({
        where: { id: appointmentId },
        data: { ...appointmentInfo, ...req.body },
      });
      res.json(result);
    } else {
      throw "no such appointment";
    }
  } catch (error) {
    res.json(handleError(error));
  }
}

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

async function getOneAppointment(req, res) {
  const appId = Number(req.params.id);
  try {
    const appointmentInfo = await appointment.findUnique({
      where: {
        id: appId,
      },
      include: {
        patient: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
        doctor: {
          select: {
            first_name: true,
            last_name: true,
          },
        },
      },
    });
    if (appointmentInfo) {
      res.json(appointmentInfo);
    } else {
      throw "no such appointment";
    }
  } catch (error) {
    res.json(handleError(error));
  }
}
async function deleteAppointment(req, res) {
  const appId = Number(req.params.id);
  try {
    await appointment.delete({
      where: {
        id: appId,
      },
    });
    res.json("deleted");
  } catch (error) {
    res.json(error.message);
  }
}

module.exports = {
  getAllAppointments,
  getAptWithDoctors,
  updateAppointment,
  makeNewAppointment,
  getOneAppointment,
  deleteAppointment,
  handleError,
};
