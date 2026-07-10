import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { landlordService } from "./landlord.service";
import httpStatus from "http-status"

const createProperty = catchAsync(async(req, res) => {
    const id = req.user?.id
    const payload = req.body;

    const property = await landlordService.createProperty(payload, id as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Property created Successfull",
        data: {property}
    })
})

const updateProperty = catchAsync(async(req, res) => {
    const payload = req.body;
    const propertyId = req.params?.id;

    const updatedProperty = await landlordService.updateProperty(payload, propertyId as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Property Updated Successfull",
        data: {updatedProperty}
    })
})

const getAllRentalRequest = catchAsync(async(req, res) => {
    const landlordId = req.user?.id;
    const rentalRequests = await landlordService.getAllRentalRequest(landlordId as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Rental requests retrieved successfully",
        data: rentalRequests
    })
})
const approveOrRejectRentalReq = catchAsync(async(req, res) => {
    
})

const removeProperty = catchAsync(async(req, res) => {
    const propertyId = req.params?.id;

    const removedProperty = await landlordService.removeProperty(propertyId as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Property removed Successfully",
        data: {removedProperty}
    })
})

export const landlordController = {
    createProperty,
    updateProperty,
    removeProperty,
    getAllRentalRequest,
    approveOrRejectRentalReq
}