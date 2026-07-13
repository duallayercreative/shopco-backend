import { Router } from "express";
import { userController } from "./user.controller.js";
import { authMiddleware } from "../../middlewares/auth-middleware.js";
import { UserRole } from "@prisma/client";
import {
  paramsIdZodSchema,
  validateRequestParams,
} from "../../middlewares/zod-middleware.js";

const router = Router();

router.get("/", authMiddleware(UserRole.ADMIN), userController.getUsers);

router.patch("/", authMiddleware(), userController.updateProfile);

router.delete(
  "/:id",
  authMiddleware(UserRole.ADMIN),
  validateRequestParams(paramsIdZodSchema),
  userController.deleteUserById,
);

export { router as userRouter };
