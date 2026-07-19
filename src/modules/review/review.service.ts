import { PaymentStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma"
import { createReviewValidator } from "../../validator/schema";
import { IReviewPayload } from "./review.interface"

const createReview = async (payload: IReviewPayload, tenantId: string) => {
    const validate = createReviewValidator.safeParse(payload);

    if(!validate.success) {
        throw new Error(validate.error.issues[0]?.message)
    }
    const {...validatedData} = validate.data;

    // check user payment success 
    // user can  review after payment success for a property
    const isPaymentSuccess = await prisma.payment.findFirst({
        where: {
            status: PaymentStatus.SUCCEEDED,
            rentalRequest: {
                propertyId: validatedData.propertyId,
                tenantId
            },
        },
    });

    if(!isPaymentSuccess) {
        throw new Error("You can review only rented properties")
    }

    const existingReview = await prisma.review.findFirst({
        where: {
            propertyId: validatedData.propertyId,
            tenantId
        }
    })

    if (existingReview) {
        throw new Error("You have already reviewed this property.");
    }

    const review = await prisma.review.create({
        data: {
            ...validatedData,
            tenantId
        }
    })
    return review
}

export const reviewService = {
    createReview
}