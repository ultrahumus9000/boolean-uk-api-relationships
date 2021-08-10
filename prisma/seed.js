const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();
const { appointment, doctor } = db;

async function seed() {
  await doctor.create({
    data: {
      first_name: "linlin",
      last_name: "li",
      specialty: "diabetes",
      appointments: {
        createMany: {
          data: [
            {
              practice_name: "Sunny",
              date: "2021-08-05T11:13:00.000Z",
              time: "2021-08-05T11:13:00.000Z",
              reason: "blood sugar is high",
            },
            {
              practice_name: "Sunny",
              date: "2021-08-05T14:13:00.000Z",
              time: "2021-08-05T14:13:00.000Z",
              reason: "blood sugar is low",
            },
            {
              practice_name: "Moon",
              date: "2021-08-08T11:13:00.000Z",
              time: "2021-08-08T11:13:00.000Z",
              reason: "bellyache bad bowl",
            },
            {
              practice_name: "Moon",
              date: "2021-08-08T15:13:00.000Z",
              time: "2021-08-08T15:13:00.000Z",
              reason: "headache not good",
            },
          ],
        },
      },
    },
    include: {
      appointments: true,
    },
  });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

// model Doctor {
//     id           Int           @id @default(autoincrement())
//     first_name   String
//     last_name    String
//     specialty    String
//     appointments Appointment[]

//     @@unique([first_name, last_name])
//   }

//   model Appointment {
//     id       Int     @id @default(autoincrement())
//     date     String
//     time     String
//     doctor   Doctor? @relation(fields: [doctorId], references: [id])
//     doctorId Int
//     reason   String

//     @@map("appointments")
//   }
