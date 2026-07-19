import { Router } from "express";
import { paymentController } from "./payment.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";
import { validateApproveReq } from "../../middleware/validateRequest";

const router = Router();

router.post(
    "/create",
    auth(Role.ADMIN, Role.LANDLORD, Role.TENANT),
    validateApproveReq() , 
    paymentController.createPaymentSession
)

router.post("/confirm", paymentController.handleWebhook)

router.get(
    "/",
    auth(Role.ADMIN, Role.LANDLORD, Role.TENANT), 
    paymentController.getAllPayments
)

router.get(
    "/:id", auth(Role.TENANT, 
    Role.LANDLORD, Role.ADMIN), 
    paymentController.getPaymentDetails
)

export const paymentRouter = router;