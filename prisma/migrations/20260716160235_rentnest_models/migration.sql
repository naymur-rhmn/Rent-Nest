/*
  Warnings:

  - You are about to drop the column `stripeChargeId` on the `Payments` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `Payments` table. All the data in the column will be lost.
  - Changed the type of `currency` on the `Payments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "Payments_stripeChargeId_key";

-- DropIndex
DROP INDEX "Payments_transactionId_key";

-- AlterTable
ALTER TABLE "Payments" DROP COLUMN "stripeChargeId",
DROP COLUMN "transactionId",
DROP COLUMN "currency",
ADD COLUMN     "currency" VARCHAR(10) NOT NULL;

-- CreateIndex
CREATE INDEX "Payments_rentalRequestId_idx" ON "Payments"("rentalRequestId");
