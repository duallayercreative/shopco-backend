import { Router } from "express";
import { userController } from "./user.controller.js";
import { authMiddleware } from "../../middlewares/auth-middleware.js";
import { UserRole } from "@prisma/client";

const router = Router();

router.get("/", authMiddleware(UserRole.ADMIN), userController.getUsers);

export { router as userRouter };
