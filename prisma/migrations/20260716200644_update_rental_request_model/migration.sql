-- AlterTable
ALTER TABLE "Rental_Requests" ADD COLUMN     "askingRentMonth" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "moveInDate" DROP DEFAULT;
