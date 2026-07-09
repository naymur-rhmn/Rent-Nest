import { Router } from "express";
import { categoriesController } from "./categories.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();


router.post("/", auth(Role.ADMIN), categoriesController.createCategories)
router.get("/", categoriesController.getAllCategories)
router.delete("/:id", auth(Role.ADMIN), categoriesController.deleteCategories)

export const categoriesRouter = router;