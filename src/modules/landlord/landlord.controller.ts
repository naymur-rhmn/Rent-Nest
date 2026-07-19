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

const getAllProperties = catchAsync(async(req, res) => {
    const landlordId = req.user?.id;

    const allProperties = await landlordService.getAllProperties(landlordId as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Properties retrived success",
        data: {allProperties}
    })
})

const updateProperty = catchAsync(async(req, res) => {
    const payload = req.body;
    const propertyId = req.params?.id;
    const userId = req.user?.id;

    const updatedProperty = await landlordService.updateProperty(payload, propertyId as string, userId as string);

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
    const rentalId = req.params?.id;
    const landlordId = req.user?.id;

    const result = await landlordService.approveOrRejectRentalReq(req.body ,rentalId as string, landlordId as string)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Operation Successfull",
        data: result
    })
})

const removeProperty = catchAsync(async(req, res) => {
    const propertyId = req.params?.id;
    const landlordId = req.user?.id;

    const removedProperty = await landlordService.removeProperty(propertyId as string, landlordId as string);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Property removed Successfully",
        data: {removedProperty}
    })
})

export const landlordController = {
    createProperty,
    getAllProperties,
    updateProperty,
    removeProperty,
    getAllRentalRequest,
    approveOrRejectRentalReq
}