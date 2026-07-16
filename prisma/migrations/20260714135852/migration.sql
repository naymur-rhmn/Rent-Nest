/*
  Warnings:

  - A unique constraint covering the columns `[stripeCustomerId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "stripeCustomerId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Users_stripeCustomerId_key" ON "Users"("stripeCustomerId");
