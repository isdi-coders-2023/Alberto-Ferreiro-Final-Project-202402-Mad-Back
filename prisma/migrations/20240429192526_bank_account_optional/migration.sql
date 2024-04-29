/*
  Warnings:

  - You are about to drop the column `imgUrl` on the `Claim` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Claim" DROP COLUMN "imgUrl";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "bankAccount" DROP NOT NULL;
