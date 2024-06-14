/*
  Warnings:

  - You are about to alter the column `date` on the `jadwal` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `jadwal` MODIFY `date` TIMESTAMP NOT NULL,
    MODIFY `daterange` TIMESTAMP NULL;
