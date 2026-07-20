import { Router } from "express";
import { cartController } from "./cart.controller.js";
import { authMiddleware } from "../../middlewares/auth-middleware.js";
import {
  paramsIdZodSchema,
  validateRequestBody,
  validateRequestParams,
} from "../../middlewares/zod-middleware.js";
import { cartValidation } from "./cart.validation.js";

const router = Router();

router.post(
  "/",
  authMiddleware(),
  validateRequestBody(cartValidation.addToCart),
  cartController.addToCart,
);

router.get("/", authMiddleware(), cartController.getCarts);

router.delete(
  "/:id",
  authMiddleware(),
  validateRequestParams(paramsIdZodSchema),
  cartController.deleteFromCart,
);

export { router as cartRouter };
