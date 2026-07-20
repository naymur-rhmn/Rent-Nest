 
import   httpStatus   from "http-status"
import catchAsync from "../../utils/catchAsync" 
import { authService } from "./auth.service"
import { sendResponse } from "../../utils/sendResponse"
import { CookieOptions, NextFunction, Request, Response } from "express" 
import config from "../../config"

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

    const isProduction = config.node_env === "production";

    res.cookie("accessToken", accessToken, {  
        httpOnly : true,
        secure : isProduction,
        sameSite : "none",
        maxAge : 1000 * 60 * 60 * 24   //1d      
    })

    
    res.cookie("refreshToken", refreshToken, {
        httpOnly : true,
        secure : isProduction,
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

const logout = async (req: Request, res: Response) => {
    const isProduction = config.node_env === "production";

    const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax" ,
    };

    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Logged out successfully",
    data: null,
  });
};


const getUserProfile = catchAsync(async (req, res) => {
    const userId = req.user?.id as string

    const user = await authService.getUserProfile(userId)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User Profile Retrived Successfully",
        data: {user}
    })
})


export const authController = {
    registerUser,
    loginUser,
    logout,
    getUserProfile
}