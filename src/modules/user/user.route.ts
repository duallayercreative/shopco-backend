import { Router } from "express";
import { userController } from "./user.controller.js";
import { authMiddleware } from "../../middlewares/auth-middleware.js";
import { UserRole } from "@prisma/client";
import { validateRequestBody } from "../../middlewares/zod-middleware.js";
import { multerUpload } from "../../config/multer.config.js";
import { userValidation } from "./user.validation.js";

const router = Router();

router.get("/", authMiddleware(UserRole.ADMIN), userController.getUsers);

router.patch(
  "/",
  authMiddleware(),
  multerUpload.single("file"),
  validateRequestBody(userValidation.updateUser),
  userController.updateProfile,
);

router.delete(
  "/:id",
  authMiddleware(UserRole.ADMIN),
  userController.deleteUserById,
);

export { router as userRouter };
