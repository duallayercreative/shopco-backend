import { Router } from "express";
import { categoryController } from "./category.controller.js";
import {
  paramsIdZodSchema,
  validateRequestBody,
  validateRequestParams,
} from "../../middlewares/zod-middleware.js";
import { categoryValidation } from "./category.validation.js";
import { authMiddleware } from "../../middlewares/auth-middleware.js";
import { UserRole } from "@prisma/client";

const router: Router = Router();

router.post(
  "/",
  authMiddleware(UserRole.ADMIN),
  validateRequestBody(categoryValidation.createCategory),
  categoryController.createCategory,
);

router.get("/", categoryController.getCategories);

router.get(
  "/:id",
  validateRequestParams(paramsIdZodSchema),
  categoryController.getCategoryById,
);

// router.patch("/:id");

// router.delete("/:id");

export { router as categoryRouter };
