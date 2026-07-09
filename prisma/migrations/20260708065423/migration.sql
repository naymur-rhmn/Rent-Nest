/*
  Warnings:

  - The values [REJECT] on the enum `RENTAL_STATUS` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RENTAL_STATUS_new" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
ALTER TABLE "public"."Rental_Requests" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Rental_Requests" ALTER COLUMN "status" TYPE "RENTAL_STATUS_new" USING ("status"::text::"RENTAL_STATUS_new");
ALTER TYPE "RENTAL_STATUS" RENAME TO "RENTAL_STATUS_old";
ALTER TYPE "RENTAL_STATUS_new" RENAME TO "RENTAL_STATUS";
DROP TYPE "public"."RENTAL_STATUS_old";
ALTER TABLE "Rental_Requests" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
