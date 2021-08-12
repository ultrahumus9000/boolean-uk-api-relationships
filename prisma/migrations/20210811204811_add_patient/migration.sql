-- DropIndex
DROP INDEX "Doctor.first_name_last_name_unique";

-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "patientId" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "first_time" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "dob" DATE NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "appointments" ADD FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
