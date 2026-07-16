import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { paymentService } from "./payment.service";
import httpStatus from "http-status"

const createPaymentSession = catchAsync(async (req, res) => {
    const userId = req.user?.id;
    const {rentalRequestId} = req.body  

    const result = await paymentService.createPaymentSession(userId as string, rentalRequestId as string)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Checkout Completed Successfully",
        data: result
    })
})

const handleWebhook = catchAsync(async(req, res) => {
    const event = req.body
    const signature = req.headers['stripe-signature']! ;

    const result = await paymentService.handleWebhook(event, signature as string)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Webhook triggered Successfully",
        data: null
    })
})

export const  paymentController = {
    createPaymentSession,
    handleWebhook
}