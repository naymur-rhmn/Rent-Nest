 
import   httpStatus   from "http-status"
import catchAsync from "../../utils/catchAsync" 
import { authService } from "./auth.service"
import { sendResponse } from "../../utils/sendResponse"
import { NextFunction, Request, Response } from "express" 

const registerUser = catchAsync(async (req, res) => {
    const payload = req.body

    const user = await authService.userRegistration(payload)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User registration successfull",
        data: {user}
    })
})

const loginUser = catchAsync(async (req, res) => {
    const payload = req.body; 

    const {accessToken, refreshToken} = await authService.loginUser(payload);

    res.cookie("accessToken", accessToken, {  
        httpOnly : true,
        secure : false,
        sameSite : "none",
        maxAge : 1000 * 60 * 60 * 24   //1d      
    })

    
    res.cookie("refreshToken", refreshToken, {
        httpOnly : true,
        secure : false,
        sameSite : "none",
        maxAge : 1000 * 60 * 60 * 24 * 7      // 7day
    })

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Login successfull",
        data: {accessToken, refreshToken}
    })
})


const getUserProfile = catchAsync(async (req, res) => {
    const accessToken = req.cookies?.accessToken;

    const user = await authService.getUserProfile(accessToken)
})


export const authController = {
    registerUser,
    loginUser,
    getUserProfile
}