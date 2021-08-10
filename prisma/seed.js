const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();
const { appointment, doctor } = db;
async function seed() {}

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
