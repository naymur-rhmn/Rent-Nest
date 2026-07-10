import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { propertiesService } from "./properties.service";
import httpStatus from "http-status";

const getAllProperties = catchAsync(async (req, res) => {
    const properties = await propertiesService.getAllProperties();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Properties fetched successfully",
        data: properties
    });
});

const getPropertyById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const property = await propertiesService.getPropertyById(id as string);
    
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Property fetched successfully",
        data: property
    });
});

export const propertiesController = {
    getAllProperties,
    getPropertyById
}