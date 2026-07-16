-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCEEDED', 'FAILED', 'REFUNDED', 'CANCELED');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('BDT', 'USD', 'EUR');

-- CreateTable
CREATE TABLE "Payments" (
    "id" TEXT NOT NULL,
    "rentalRequestId" TEXT NOT NULL,
    "stripePaymentIntentId" TEXT,
    "stripeCustomerId" TEXT,
    "amount" DECIMAL(10,2) NOT NULL,
    "currency" "Currency" NOT NULL DEFAULT 'USD',
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paymentMethod" TEXT,
    "transactionId" TEXT,
    "stripeChargeId" TEXT,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payments_rentalRequestId_key" ON "Payments"("rentalRequestId");

-- CreateIndex
CREATE UNIQUE INDEX "Payments_stripePaymentIntentId_key" ON "Payments"("stripePaymentIntentId");

-- CreateIndex
CREATE UNIQUE INDEX "Payments_transactionId_key" ON "Payments"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "Payments_stripeChargeId_key" ON "Payments"("stripeChargeId");

-- CreateIndex
CREATE INDEX "Payments_status_idx" ON "Payments"("status");

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_rentalRequestId_fkey" FOREIGN KEY ("rentalRequestId") REFERENCES "Rental_Requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
