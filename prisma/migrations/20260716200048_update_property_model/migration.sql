/*
  Warnings:

  - The `status` column on the `Rental_Requests` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "RentalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "RentalType" AS ENUM ('MONTHLY', 'YEARLY');

-- AlterTable
ALTER TABLE "Properties" ADD COLUMN     "area" DECIMAL(8,2),
ADD COLUMN     "availableRentalPeriodMonth" INTEGER DEFAULT 1,
ADD COLUMN     "gMapLocation" TEXT,
ADD COLUMN     "rentalType" "RentalType" NOT NULL DEFAULT 'MONTHLY';

-- AlterTable
ALTER TABLE "Rental_Requests" DROP COLUMN "status",
ADD COLUMN     "status" "RentalStatus" NOT NULL DEFAULT 'PENDING';

-- DropEnum
DROP TYPE "Currency";

-- DropEnum
DROP TYPE "RENTAL_STATUS";
