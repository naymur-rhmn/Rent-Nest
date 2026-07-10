import catchAsync from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse";
import { RentalService } from "./rental.service";
import httpStatus from "http-status";

const createRentalRequest = catchAsync(async (req , res ) => {
    const payload = req.body;
    const tenantId = req.user?.id;

    const rentalRequest = await RentalService.submitRentalRequest(payload, tenantId as string);
    
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Rental request submitted successfully",
        data: {rentalRequest}
    })
})

const getRentalRequests = catchAsync(async (req , res ) => {
    const landlordId = req.user?.id;
    const rentalRequests = await RentalService.getRentalRequests(landlordId as string);
    
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental requests retrieved successfully",
        data: rentalRequests
    });
})

const getRentalRequestDetails = catchAsync(async (req , res ) => {
    const rentalRequestId = req.params?.id;

    const rentalRequest = await RentalService.getRentalRequestById(rentalRequestId as string);
    
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental request details retrieved successfully",
        data: rentalRequest
    });
});

export const RentalController = {
    createRentalRequest,
    getRentalRequests,
    getRentalRequestDetails
}