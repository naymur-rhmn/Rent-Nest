import Stripe from "stripe";
import { PaymentStatus, PropertyStatus, RentalStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

export const handleCheckoutCompleted = async (session: Stripe.Checkout.Session) => {
    const rentalRequestId = session.metadata?.rentalRequestId;

    if (!rentalRequestId) {
        console.log("Missing rentalRequestId in metadata");
        return;
    }

    const stripePaymentIntentId = session.payment_intent as string;

    const paymentData = {
        rentalRequestId,
        stripePaymentIntentId,
        stripeCustomerId: session.customer as string,
        amount: Number(session.amount_total) / 100,
        currency: session.currency as string,
        paymentMethod: session.payment_method_types[0],
        status: PaymentStatus.SUCCEEDED,
        paidAt: new Date(session.created * 1000),
    };

    await prisma.$transaction(async (tx: any) => {
        // Save payment
        await tx.payment.upsert({
            where: {
                rentalRequestId,
            },
            create: paymentData,
            update: paymentData,
        });
        
        // approve rantal request 
        await tx.rental_Request.update({
            where: {
                id: rentalRequestId,
            },
            data: {
                status: RentalStatus.APPROVED,
            },
        });
        
        const rentalReq = await tx.rental_Request.findUniqueOrThrow({
            where: {
                id: rentalRequestId
            }
        })
        
        await tx.property.update({
            where: {
                id: rentalReq.propertyId
            },
            data: {
                status: PropertyStatus.RENTED
            }
        }) 
    });
}

export const handleCheckoutExpired = async (session: Stripe.Checkout.Session) => {
    const rentalRequestId = session.metadata?.rentalRequestId;

    if (!rentalRequestId) {
        return;
    }

    await prisma.payment.update({
        where: {
            rentalRequestId,
        },
        data: {
            status: PaymentStatus.FAILED,
        },
    });    
}