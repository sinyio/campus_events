/*
  Warnings:

  - Added the required column `date` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "maxParticipants" INTEGER,
ADD COLUMN     "registrationDeadline" TIMESTAMP(3);
