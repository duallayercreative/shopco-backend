import { Router } from "express";
import { productController } from "./product.controller.js";
import { multerUpload } from "../../config/multer.config.js";
import { authMiddleware } from "../../middlewares/auth-middleware.js";
import { UserRole } from "@prisma/client";
import {
  paramsIdZodSchema,
  validateRequestBody,
  validateRequestParams,
} from "../../middlewares/zod-middleware.js";
import { productValidation } from "./product.validation.js";

const router = Router();

router.post(
  "/",
  authMiddleware(UserRole.ADMIN),
  multerUpload.array("images"),
  validateRequestBody(productValidation.createProduct),
  productController.addProduct,
);

router.get("/", productController.getProducts);

router.get(
  "/:id",
  validateRequestParams(paramsIdZodSchema),
  productController.getProductById,
);

router.patch(
  "/:id",
  authMiddleware(UserRole.ADMIN),
  multerUpload.array("images"),
  validateRequestParams(paramsIdZodSchema),
  validateRequestBody(productValidation.updateProduct),
  productController.updateProductById,
);

router.delete(
  "/:id",
  authMiddleware(UserRole.ADMIN),
  validateRequestParams(paramsIdZodSchema),
  productController.deleteProductById,
);

export { router as productRouter };
