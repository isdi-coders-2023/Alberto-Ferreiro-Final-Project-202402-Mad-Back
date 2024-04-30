/*
  Warnings:

  - A unique constraint covering the columns `[policyNumber]` on the table `Policy` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `carAge` to the `Policy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plateNumber` to the `Policy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `policyType` to the `Policy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Policy" ADD COLUMN     "carAge" INTEGER NOT NULL,
ADD COLUMN     "plateNumber" TEXT NOT NULL,
ADD COLUMN     "policyType" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Policy_policyNumber_key" ON "Policy"("policyNumber");
