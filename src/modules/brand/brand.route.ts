import { Router } from "express";
import { brandController } from "./brand.controller.js";
import {
  paramsIdZodSchema,
  validateRequestBody,
  validateRequestParams,
} from "../../middlewares/zod-middleware.js";
import { brandValidation } from "./brand.validation.js";
import { authMiddleware } from "../../middlewares/auth-middleware.js";
import { UserRole } from "@prisma/client";

const router = Router();

router.post(
  "/",
  authMiddleware(UserRole.ADMIN),
  validateRequestBody(brandValidation.createBrand),
  brandController.addNewBrand,
);

router.get("/", brandController.getBrands);

router.get(
  "/:id",
  validateRequestParams(paramsIdZodSchema),
  brandController.getBrandById,
);

router.patch(
  "/:id",
  authMiddleware(UserRole.ADMIN),
  validateRequestParams(paramsIdZodSchema),
  brandController.updateBrandById,
);

router.delete(
  "/:id",
  authMiddleware(UserRole.ADMIN),
  validateRequestParams(paramsIdZodSchema),
  brandController.deleteBrandById,
);

export { router as brandRouter };
