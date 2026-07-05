import { Router } from "express";
import { authController } from "./auth.controller.js";
import { validateRequestBody } from "../../middlewares/zod-middleware.js";
import { AuthValidation } from "./auth.validation.js";
import { authMiddleware } from "../../middlewares/auth-middleware.js";

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

router.post(
  "/login",
  validateRequestBody(AuthValidation.loginUser),
  authController.loginUser,
);

// http://localhost:5000/api/v1/auth/login/google
router.get("/login/google", authController.googleLogin);

router.get("/google/success", authController.googleLoginSuccess);

router.get("/get-me", authMiddleware(), authController.getMe);

export { router as authRouter };
