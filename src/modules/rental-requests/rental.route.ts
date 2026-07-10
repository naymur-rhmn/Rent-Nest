import Router from "express";
import { RentalController } from "./rental.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/client";

const router = Router();

router.post("/", auth(Role.TENANT), RentalController.createRentalRequest);

router.get("/", RentalController.getRentalRequests);

router.get("/:id", auth(Role.LANDLORD), RentalController.getRentalRequestDetails);

export const rentalRouter = router; 