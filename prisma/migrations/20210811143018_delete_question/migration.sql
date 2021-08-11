/*
  Warnings:

  - Made the column `doctorId` on table `appointments` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "appointments" ALTER COLUMN "doctorId" SET NOT NULL;
