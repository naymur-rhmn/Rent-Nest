/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tenantId,propertyId]` on the table `Rental_Requests` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Categories_name_key" ON "Categories"("name");

-- CreateIndex
CREATE INDEX "Properties_landlordId_idx" ON "Properties"("landlordId");

-- CreateIndex
CREATE INDEX "Properties_categoryId_idx" ON "Properties"("categoryId");

-- CreateIndex
CREATE INDEX "Properties_landlordId_status_idx" ON "Properties"("landlordId", "status");

-- CreateIndex
CREATE INDEX "Rental_Requests_tenantId_idx" ON "Rental_Requests"("tenantId");

-- CreateIndex
CREATE INDEX "Rental_Requests_propertyId_idx" ON "Rental_Requests"("propertyId");

-- CreateIndex
CREATE UNIQUE INDEX "Rental_Requests_tenantId_propertyId_key" ON "Rental_Requests"("tenantId", "propertyId");
