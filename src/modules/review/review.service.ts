import { PaymentStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma"
import { IReviewPayload } from "./review.interface"

const createReview = async (payload: IReviewPayload, tenantId: string) => {
    console.log(payload, tenantId)
    // check user payment success 
    // user can  review after payment success for a property
    const isPaymentSuccess = await prisma.payment.findFirst({
        where: {
            status: PaymentStatus.SUCCEEDED,
            rentalRequest: {
                propertyId: payload.propertyId,
                tenantId
            },
        },
    });

    if(!isPaymentSuccess) {
        throw new Error("You can review only rented properties")
    }

    const existingReview = await prisma.review.findFirst({
        where: {
            propertyId: payload.propertyId,
            tenantId
        }
    })

    if (existingReview) {
        throw new Error("You have already reviewed this property.");
    }

    const review = await prisma.review.create({
        data: {
            ...payload,
            tenantId
        }
    })
    return review
}



export const reviewService = {
    createReview
}