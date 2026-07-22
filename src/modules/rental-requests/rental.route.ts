import Router from "express";
import { RentalController } from "./rental.controller";
import { auth } from "../../middleware/auth"; 
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/", auth(Role.TENANT), RentalController.createRentalRequest);

router.get("/", auth(Role.TENANT), RentalController.getRentalRequests);

router.get("/:id", auth(Role.TENANT), RentalController.getRentalRequestDetails);

export const rentalRouter = router; 