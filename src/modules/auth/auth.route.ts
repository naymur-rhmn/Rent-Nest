import { Router } from "express";
import { authController } from "./auth.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.post("/register", authController.registerUser)
router.post("/login", authController.loginUser)
router.get("/me", auth(Role.LANDLORD, Role.TENANT, "ADMIN"), authController.getUserProfile)


export const authRouter = router;