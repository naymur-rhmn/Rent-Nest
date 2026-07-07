import { NextFunction, Request, RequestHandler, Response } from "express"
import httpStatus from "http-status"

const catchAsync = (fn: RequestHandler) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await fn(req, res, next)

        } catch (error) {
            console.log(error)
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: (error as Error).message,
                error: error
            })

        }
    }
}

export default catchAsync;