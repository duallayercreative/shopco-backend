import { Router } from "express";
import { authController } from "./auth.controller.js";
import { validateRequestBody } from "../../middlewares/zod-middleware.js";
import { AuthValidation } from "./auth.validation.js";

const router: Router = Router();

router.post(
  "/register",
  validateRequestBody(AuthValidation.registerUser),
  authController.registerUser,
);

router.post(
  "/verify-email",
  validateRequestBody(AuthValidation.verifyEmail),
  authController.verifyEmail,
);

router.post("/login", authController.loginUser);

export { router as authRouter };
