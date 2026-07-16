import { Router } from "express";
import { paymentController } from "./payment.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/create", auth(Role.ADMIN, Role.LANDLORD, Role.TENANT), paymentController.createPaymentSession)
router.post("/webhook", paymentController.handleWebhook)

export const paymentRouter = router;