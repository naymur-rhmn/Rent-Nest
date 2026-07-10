import { Router } from "express";
import { landlordController } from "./landlord.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/properties", auth(Role.LANDLORD), landlordController.createProperty)
router.put("/properties/:id",auth(Role.LANDLORD), landlordController.updateProperty)
router.get("/requests", landlordController.getAllRentalRequest)
router.patch("/requests", landlordController.approveOrRejectRentalReq)
router.delete("/properties/:id", landlordController.deleteProperty)

export const landloardRouter = router;