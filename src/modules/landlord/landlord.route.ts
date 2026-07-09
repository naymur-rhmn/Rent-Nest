import { Router } from "express";
import { landlordController } from "./landlord.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/properties", auth(Role.LANDLORD), landlordController.createProperty)
router.get("/requests", landlordController.getAllRentalRequest)
router.put("/properties/:id", landlordController.updateProperty)
router.patch("/requests", landlordController.approveOrRejectRentalReq)
router.delete("/properties/:id", landlordController.deleteProperty)

export const landloardRouter = router;