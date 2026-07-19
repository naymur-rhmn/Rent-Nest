import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status"
import { reviewService } from "./review.service";

const createReview = catchAsync(async(req, res) => {
    const userId = req.user?.id;
 
    const result = await reviewService.createReview(req.body, userId as string)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Review create success",
        data: result
    })
})

export const reviewController = {
    createReview
}