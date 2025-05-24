/*
  Warnings:

  - You are about to drop the column `date` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `maxParticipants` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `registrationDeadline` on the `events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "date",
DROP COLUMN "maxParticipants",
DROP COLUMN "registrationDeadline",
ADD COLUMN     "max_participants" INTEGER,
ADD COLUMN     "registration_deadline" TIMESTAMP(3);
