/*
  Warnings:

  - You are about to drop the column `first_time` on the `Patient` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "first_time",
ADD COLUMN     "first_name" TEXT NOT NULL;
