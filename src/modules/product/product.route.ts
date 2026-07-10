import { Router } from "express";
import { productController } from "./product.controller.js";
import { multerUpload } from "../../config/multer.config.js";
import { authMiddleware } from "../../middlewares/auth-middleware.js";
import { UserRole } from "@prisma/client";
import { validateRequestBody } from "../../middlewares/zod-middleware.js";

const router = Router();

router.post(
  "/",
  authMiddleware(UserRole.ADMIN),
  multerUpload.single("file"),
  //   validateRequestBody(),
  productController.addProduct,
);

router.get("/", productController.getProducts);

router.get("/:id", productController.getProductById);

router.patch("/:id", productController.updateProductById);

router.delete("/:id", productController.deleteProductById);

export { router as productRouter };
