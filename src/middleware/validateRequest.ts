import { RentalStatus } from "../../generated/prisma/enums";
import { prisma } from "../lib/prisma";
import catchAsync from "../utils/catchAsync"

export const validateApproveReq = () => {
    return catchAsync(async(req, res, next) => { 
        const {rentalRequestId} = req.body

        const isApproved = await prisma.rental_Request.findUnique({
            where: {
                id: rentalRequestId
            }
        })
        
        if(isApproved?.status !== RentalStatus.APPROVED) {
            throw new Error("Your Rental request is not approved yet!")
        }

        next()
    })
}