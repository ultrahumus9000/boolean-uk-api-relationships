const { doctor, appointment, patient } = require("../database");
const { handleError } = require("../appointments/controller");
const patientsRouter = require("./router");

async function checkPatient(id) {
  const result = await patient.findUnique({
    where: {
      id: id,
    },
  });
  if (result) return result;
  return false;
}
async function findAllPatients(req, res) {
  try {
    const result = await patient.findMany();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}
async function findOnePatient(req, res) {
  const patientId = Number(req.params.id);
  try {
    const result = await patient.findUnique({
      where: {
        id: patientId,
      },
    });
    if (result) {
      res.json(result);
    } else {
      throw "no such patient";
    }
  } catch (error) {
    res.json(handleError(error));
  }
}

//   -"/patients/:id/doctors?filterPractice=value" to see a list of doctors, filtered by practice

async function findOnePatientWithAppointment(req, res) {
  const patientId = Number(req.params.id);
  try {
    const checker = await checkPatient(patientId);
    if (checker) {
      const result = await patient.findUnique({
        where: {
          id: patientId,
        },
        include: {
          appointments: {
            select: {
              date: true,
              reason: true,
              practice_name: true,
              doctor: {
                select: {
                  first_name: true,
                  last_name: true,
                  specialty: true,
                },
              },
            },
          },
        },
      });

      res.json(result);
    } else {
      throw "no such patient";
    }
  } catch (error) {
    res.json(handleError(error));
  }
}
async function findOnePatienWithDoctors(req, res) {
  const patientId = Number(req.params.id);
  const filteredPractice = req.query.filterPractice;
  try {
    const checker = await checkPatient(patientId);
    if (checker) {
      if (filteredPractice) {
        const result = await patient.findUnique({
          where: {
            id: patientId,
          },
          include: {
            appointments: {
              where: {
                practice_name: filteredPractice,
              },
              select: {
                doctor: {
                  select: {
                    first_name: true,
                    last_name: true,
                  },
                },
              },
            },
          },
        });

        res.json(result);
      } else {
        const result = await patient.findUnique({
          where: {
            id: patientId,
          },
          include: {
            appointments: {
              select: {
                doctor: {
                  select: {
                    first_name: true,
                    last_name: true,
                    specialty: true,
                  },
                },
              },
            },
          },
        });
        res.json(result);
      }
    } else {
      throw "no such patient";
    }
  } catch (error) {
    res.json(handleError(error));
  }
}

async function createNewPatient(req, res) {
  const newPatient = req.body;
  try {
    const result = await patient.create({
      data: newPatient,
    });
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
}
async function updatePatient(req, res) {
  const patientId = Number(req.params.id);
  const updateContent = req.body;

  try {
    const checker = await checkPatient(patientId);
    if (checker) {
      const result = await patient.update({
        where: {
          id: patientId,
        },
        data: { ...checker, ...updateContent },
      });
      res.json(result);
    } else {
      throw "no such patient";
    }
  } catch (error) {
    res.json(handleError(error));
  }
}
async function deletePatients(req, res) {
  const patientId = Number(req.params.id);

  try {
    const checker = await checkPatient(patientId);
    if (checker) {
      await patient.delete({
        where: {
          id: patientId,
        },
      });
      res.json("deleted");
    } else {
      throw "no such patient";
    }
  } catch (error) {
    res.json(handleError(error));
  }
}

module.exports = {
  findAllPatients,
  findOnePatient,
  findOnePatientWithAppointment,
  findOnePatienWithDoctors,
  createNewPatient,
  updatePatient,
  deletePatients,
};
