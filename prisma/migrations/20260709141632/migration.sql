/*
  Warnings:

  - A unique constraint covering the columns `[landlordId,title,address]` on the table `Properties` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Properties_landlordId_title_address_key" ON "Properties"("landlordId", "title", "address");
