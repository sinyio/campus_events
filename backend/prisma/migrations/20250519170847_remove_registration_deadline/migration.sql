/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `max_participants` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `registration_deadline` on the `events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "imageUrl",
DROP COLUMN "max_participants",
DROP COLUMN "registration_deadline";
