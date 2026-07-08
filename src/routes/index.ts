import { Router } from "express";
import { authRouter } from "../modules/auth/auth.route.js";
import { categoryRouter } from "../modules/category/category.route.js";
import { brandRouter } from "../modules/brand/brand.route.js";

const router: Router = Router();

router.use("/auth", authRouter);

router.use("/brands", brandRouter);

router.use("/categories", categoryRouter);

export { router as indexRouter };
