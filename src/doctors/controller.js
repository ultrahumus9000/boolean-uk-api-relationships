//     -- Full CRUD base routes

const { doctor, appointment } = require("../database");

async function getAllDoctors(req, res) {
  try {
    const result = await doctor.findMany();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}
async function getOneDoctor(req, res) {}

async function getDoctorWithAppointments(req, res) {
  const doctorId = Number(req.params.id);
  try {
    let result = await doctor.findUnique({
      where: {
        id: doctorId,
      },
      select: {
        first_name: true,
        last_name: true,
        appointments: {
          select: {
            date: true,
            time: true,
            reason: true,
            practice_name: true,
          },
        },
      },
    });

    // where: {
    //     id: doctorId,
    //   },
    //   include: {
    //     appointments: {
    //       select: {
    //         date: true,
    //         time: true,
    //         reason: true,
    //         practice_name: true,
    //       },
    //     },
    //   },
    // }

    result = result === null ? "no such doctor" : result;
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}
async function getOneDoctorPracticePlace(req, res) {
  const doctorId = Number(req.params.id);
  try {
    const result = await doctor.findUnique({
      where: {
        id: doctorId,
      },
      select: {
        appointments: {
          select: {
            practice_name: true,
          },
        },
      },
    });
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}

async function getMostBusyDoctor(req, res) {
  try {
    const doctors = await doctor.findMany({
      include: {
        appointments: true,
      },
    });

    const result = doctors.map((doctor) => {
      let data = {
        first_name: doctor.first_name,
        last_name: doctor.last_name,
        appointment: doctor.appointments.length,
      };
      return data;
    });

    const max = result.reduce(function (prev, current) {
      return prev.appointment > current.appointment ? prev : current;
    });

    res.json(`most busy doctor is ${max.first_name} ${max.last_name}`);
  } catch (error) {
    res.json(error.message);
  }
}

async function getTotalHoursOneDoctor(req, res) {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  try {
    const doctors = await doctor.findMany({
      include: {
        appointments: true,
      },
    });

    const appoitmentArray = doctors.map((doctor) => doctor.appointments.length);
    const result = appoitmentArray.reduce(reducer);
    res.json(`total work hours are ${(result * 30) / 60} hrs`);
  } catch (error) {
    res.json(error.message);
  }
}
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
