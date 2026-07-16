import { Router } from "express";
import { cartController } from "./cart.controller.js";
import { authMiddleware } from "../../middlewares/auth-middleware.js";
import { validateRequestBody } from "../../middlewares/zod-middleware.js";
import { cartValidation } from "./cart.validation.js";

const router = Router();

router.post(
  "/",
  authMiddleware(),
  validateRequestBody(cartValidation.addToCart),
  cartController.addToCart,
);

router.get("/", authMiddleware(), cartController.getCarts);

export { router as cartRouter };
