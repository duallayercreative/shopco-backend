import { Router } from "express";
import { authRouter } from "../modules/auth/auth.route.js";
import { categoryRouter } from "../modules/category/category.route.js";
import { brandRouter } from "../modules/brand/brand.route.js";
import { productRouter } from "../modules/product/product.route.js";

const router: Router = Router();

router.use("/auth", authRouter);

router.use("/brands", brandRouter);

router.use("/categories", categoryRouter);

router.use("/products", productRouter);

export { router as indexRouter };
