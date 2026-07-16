/*
  Warnings:

  - Made the column `stripePaymentIntentId` on table `Payments` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Payments" ALTER COLUMN "stripePaymentIntentId" SET NOT NULL;
