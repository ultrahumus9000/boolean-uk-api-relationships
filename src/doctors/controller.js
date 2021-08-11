//     -- Full CRUD base routes

const { doctor, appointment } = require("../database");
const { handleError } = require("../appointments/controller");

async function getAllDoctors(req, res) {
  try {
    const result = await doctor.findMany();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}
async function getOneDoctor(req, res) {
  const doctorId = Number(req.params.id);
  try {
    const doctorInfo = await doctor.findUnique({
      where: {
        id: doctorId,
      },
    });
    if (doctorInfo) res.json(doctorInfo);
    throw "doctor doesnt exist";
  } catch (error) {
    res.json(handleError(error));
  }
}

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
    res.json(handleError(error));
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

async function postNewDoctor(req, res) {
  try {
    const result = await doctor.create({
      data: req.body,
    });
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}
async function updateOneDoctor(req, res) {
  try {
    const doctorInfo = await doctor.findUnique({
      where: {
        id: req.body.doctorId,
      },
    });

    const updatedDoctor = await doctor.update({
      where: {
        id: req.body.doctorId,
      },
      data: {
        specialty: req.body.specialty,
      },
    });
    res.json(updatedDoctor);
  } catch (error) {
    res.json(error);
  }
}
async function deleteOneDoctor(req, res) {
  // method one simply delete the doctor with cascading style
  //method 2 delete the existing doctor and ressign new doctor

  const doctorId = Number(req.params.id);

  let doctors = await doctor.findMany();

  const newDoctors = doctors.filter((doctor) => doctor.id !== doctorId);

  const doctorsIds = newDoctors.map((doctor) => doctor.id);

  const newDoctorId = Math.floor(Math.random() * doctors.length);

  try {
    if (doctorsIds.length === doctors.length) throw "no such doctor";

    await appointment.updateMany({
      where: {
        doctorId: doctorId,
      },
      data: {
        doctorId: newDoctors[newDoctorId].id,
      },
    });

    const result = await doctor.delete({
      where: {
        id: doctorId,
      },
    });
    res.json(result);
  } catch (error) {
    console.log("failure");
    res.json(handleError(error));
  }
}

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
