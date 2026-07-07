 
import   httpStatus   from "http-status"
import catchAsync from "../../utils/catchAsync" 
import { authService } from "./auth.service"
import { sendResponse } from "../../utils/sendResponse"
import { NextFunction, Request, Response } from "express"

const registerUser = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body

    const user = await authService.userRegistration(payload)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User registration successfull",
        data: {user}
    })
})




export const authController = {
    registerUser,

}