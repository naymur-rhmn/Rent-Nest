import catchAsync from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse";
import { AdminService } from "./admin.service"
import httpStatus from "http-status"

const getAllUsers = catchAsync(async(req, res) => {
    const allUsers = await AdminService.getAllUsers();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Users Retrived Successfully",
        data: {allUsers}
    })
})

const updateUserStatus = catchAsync(async(req, res) => {
    const userId = req.params?.id;
    const payload = req.body;

    const updatedUserStatus = await AdminService.updateUserStatus(payload, userId as string)

        sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Status Update Successfully",
        data: updatedUserStatus
    })
})

const getAllProperties = catchAsync(async(req, res) => {
    const properties = await AdminService.getAllProperties();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "All Properties Retrieved Successfully",
        data: {properties}
    })
})

const getAllRentalRequests = catchAsync(async(req, res) => {
    const rentalRequests = await AdminService.getAllRentalRequests();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "All Rental Request Retrieved Successfully",
        data: {rentalRequests}
    })
})

export const AdminController = {
    getAllUsers,
    updateUserStatus,
    getAllProperties,
    getAllRentalRequests
}