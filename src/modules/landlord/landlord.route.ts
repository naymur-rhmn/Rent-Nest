import { Router } from "express";
import { landlordController } from "./landlord.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/properties", auth(Role.LANDLORD), landlordController.createProperty)

router.put("/properties/:id",auth(Role.LANDLORD), landlordController.updateProperty)

router.get("/properties", auth(Role.LANDLORD), landlordController.getAllProperties)

router.get("/requests", auth(Role.LANDLORD), landlordController.getAllRentalRequest)

router.patch("/requests/:id", auth(Role.LANDLORD), landlordController.approveOrRejectRentalReq)

router.delete("/properties/:id", auth(Role.LANDLORD, Role.ADMIN), landlordController.removeProperty)

export const landloardRouter = router;