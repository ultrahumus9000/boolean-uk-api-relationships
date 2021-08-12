const faker = require("faker");

const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

const { appointment, doctor, patient } = db;

function randomInt(array) {
  return Math.floor(Math.random() * array.length);
}
// async function seed() {
//   for await (const doc of doctors) {
//     await doctor.create({
//       data: {
//         first_name: faker.name.firstName(),
//         last_name: faker.name.lastName(),
//         specialty: "diabetes",
//         appointments: {
//           create: [
//             {
//               practice_name: faker.company.companyName(),
//               date: faker.date.recent(),
//               reason: faker.lorem.words(5),
//               patient: {
//                 create: {
//                   first_name: faker.name.firstName(),
//                   last_name: faker.name.lastName(),
//                   dob: faker.date.past(40),
//                 },
//               },
//             },
//             {
//               practice_name: faker.company.companyName(),
//               date: faker.date.recent(),
//               reason: faker.lorem.words(5),
//               patient: {
//                 create: {
//                   first_name: faker.name.firstName(),
//                   last_name: faker.name.lastName(),
//                   dob: faker.date.past(40),
//                 },
//               },
//             },
//             {
//               practice_name: faker.company.companyName(),
//               date: faker.date.recent(),
//               reason: faker.lorem.words(5),
//               patient: {
//                 create: {
//                   first_name: faker.name.firstName(),
//                   last_name: faker.name.lastName(),
//                   dob: faker.date.past(40),
//                 },
//               },
//             },
//             {
//               practice_name: faker.company.companyName(),
//               date: faker.date.recent(),
//               reason: faker.lorem.words(5),
//               patient: {
//                 create: {
//                   first_name: faker.name.firstName(),
//                   last_name: faker.name.lastName(),
//                   dob: faker.date.past(40),
//                 },
//               },
//             },
//             {
//               practice_name: faker.company.companyName(),
//               date: faker.date.recent(),
//               reason: faker.lorem.words(5),
//               patient: {
//                 create: {
//                   first_name: faker.name.firstName(),
//                   last_name: faker.name.lastName(),
//                   dob: faker.date.past(40),
//                 },
//               },
//             },
//           ],
//         },
//       },
//       include: {
//         appointments: true,
//       },
//     });

//     console.log("lol");
//   }
// }

// async function seed() {
//   const patients = await patient.findMany();
//   const doctors = await doctor.findMany();
//   const patientIds = patients.map(({ id }) => id);
//   const doctorIds = doctors.map(({ id }) => id);
//   const newAppointmentsArray = Array(10).fill("");

//   for await (const app of newAppointmentsArray) {
//     await appointment.create({
//       data: {
//         practice_name: faker.random.word(),
//         date: faker.date.future(1),
//         reason: faker.random.words(4),
//         doctorId: randomInt(doctorIds),
//         patientId: randomInt(patientIds),
//       },
//     });
//   }
// }

async function seed() {
  const patients = await patient.findMany();
  const doctors = await doctor.findMany();
  const patientIds = patients.map(({ id }) => id);
  const doctorIds = doctors.map(({ id }) => id);
  const newAppointmentsArray = Array(10).fill("");

  for await (const app of newAppointmentsArray) {
    await appointment.create({
      data: {
        practice_name: faker.random.word(),
        date: faker.date.future(1),
        reason: faker.random.words(4),
        doctor: {
          connect: {
            id: doctorIds[randomInt(doctorIds)],
          },
        },
        patient: {
          connect: {
            id: patientIds[randomInt(patientIds)],
          },
        },
      },
    });
  }
}

// id            Int      @id @default(autoincrement())
// practice_name String
// date          DateTime @default(now())
// doctor        Doctor   @relation(fields: [doctorId], references: [id], onDelete: Cascade)
// doctorId      Int
// reason        String
// patient       Patient  @relation(fields: [patientId], references: [id], onDelete: Cascade)

// patientId Int

// randomInt(array)
seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

//different way of creating seed data
//create doctors and patients then use apppointments to connect it
