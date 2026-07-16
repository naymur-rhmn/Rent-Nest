-- DropForeignKey
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_rentalRequestId_fkey";

-- DropForeignKey
ALTER TABLE "Properties" DROP CONSTRAINT "Properties_landlordId_fkey";

-- DropForeignKey
ALTER TABLE "Rental_Requests" DROP CONSTRAINT "Rental_Requests_tenantId_fkey";

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_rentalRequestId_fkey" FOREIGN KEY ("rentalRequestId") REFERENCES "Rental_Requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Properties" ADD CONSTRAINT "Properties_landlordId_fkey" FOREIGN KEY ("landlordId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rental_Requests" ADD CONSTRAINT "Rental_Requests_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
