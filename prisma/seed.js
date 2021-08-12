const faker = require("faker");

const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();
const { appointment, doctor, patient } = db;
const doctors = [1, 2, 3, 4, 5];
async function seed() {
  for await (const doc of doctors) {
    await doctor.create({
      data: {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        specialty: "diabetes",
        appointments: {
          create: [
            {
              practice_name: faker.company.companyName(),
              date: faker.date.recent(),
              reason: faker.lorem.words(5),
              patient: {
                create: {
                  first_name: faker.name.firstName(),
                  last_name: faker.name.lastName(),
                  dob: faker.date.past(40),
                },
              },
            },
            {
              practice_name: faker.company.companyName(),
              date: faker.date.recent(),
              reason: faker.lorem.words(5),
              patient: {
                create: {
                  first_name: faker.name.firstName(),
                  last_name: faker.name.lastName(),
                  dob: faker.date.past(40),
                },
              },
            },
            {
              practice_name: faker.company.companyName(),
              date: faker.date.recent(),
              reason: faker.lorem.words(5),
              patient: {
                create: {
                  first_name: faker.name.firstName(),
                  last_name: faker.name.lastName(),
                  dob: faker.date.past(40),
                },
              },
            },
            {
              practice_name: faker.company.companyName(),
              date: faker.date.recent(),
              reason: faker.lorem.words(5),
              patient: {
                create: {
                  first_name: faker.name.firstName(),
                  last_name: faker.name.lastName(),
                  dob: faker.date.past(40),
                },
              },
            },
            {
              practice_name: faker.company.companyName(),
              date: faker.date.recent(),
              reason: faker.lorem.words(5),
              patient: {
                create: {
                  first_name: faker.name.firstName(),
                  last_name: faker.name.lastName(),
                  dob: faker.date.past(40),
                },
              },
            },
          ],
        },
      },
      include: {
        appointments: true,
      },
    });

    console.log("lol");
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });

//   model Doctor {
//     id           Int           @id @default(autoincrement())
//     first_name   String
//     last_name    String
//     specialty    String
//     appointments Appointment[]

//     // @@unique([first_name, last_name])
//   }

//   model Appointment {
//     id            Int      @id @default(autoincrement())
//     practice_name String
//     date          DateTime @default(now())
//     time          DateTime @default(now())
//     doctor        Doctor   @relation(fields: [doctorId], references: [id], onDelete: Cascade)
//     doctorId      Int
//     reason        String
//     patient       Patient  @relation(fields: [patientId], references: [id], onDelete: Cascade)

//     patientId Int
//     @@map("appointments")
//   }

//   model Patient {
//     id           Int           @id @default(autoincrement())
//     first_time   String
//     last_name    String
//     dob          DateTime      @db.Date
//     appointments Appointment[]
//   }
