import { Router } from "express";
import { brandController } from "./brand.controller.js";

const router = Router();

router.post("/", brandController.addNewBrand);

router.get("/", brandController.getBrands);

router.get("/:id", brandController.getBrandById);

router.patch("/:id", brandController.updateBrandById);

router.delete("/:id", brandController.deleteBrandById);

export { router as brandRouter };
