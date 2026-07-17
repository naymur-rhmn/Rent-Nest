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
        message: "Payment Session Created Successfully",
        data: result
    })
})

const handleWebhook = catchAsync(async(req, res) => {
    const event = req.body
    const signature = req.headers['stripe-signature']! ;

    await paymentService.handleWebhook(event, signature as string)
})

const getAllPayments = catchAsync(async(req, res) => {
    const userId = req?.user?.id as string

    const allPayments = await paymentService.getAllPayments(userId)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Payments retrived successfully",
        data: {allPayments}
    })
})


const getPaymentDetails = catchAsync(async(req, res) => {
    const id = req.params?.id;
    const paymentDetails = await paymentService.getPaymentDetails(id as string)

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Payment Details Retrieved Success",
        data: paymentDetails
    })
})

export const  paymentController = {
    createPaymentSession,
    handleWebhook,
    getAllPayments,
    getPaymentDetails
}