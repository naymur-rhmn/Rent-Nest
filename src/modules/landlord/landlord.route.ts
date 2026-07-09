import { Router } from "express";
import { landlordController } from "./landlord.controller";

const router = Router();

router.post("/properties", landlordController.createProperty)
router.put("/properties/:id", landlordController.updateProperty)
router.delete("/properties/:id", landlordController.deleteProperty)
router.get("/requests", landlordController.getAllRentalRequest)
router.patch("/requests", landlordController.approveOrRejectRentalReq)

export const landloardRouter = router;