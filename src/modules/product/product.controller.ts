import { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async.js";
import { productService } from "./product.service.js";
import { sendResponse } from "../../utils/send-response.js";

const addProduct = catchAsync(async (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];

  const payload = {
    ...req.body,
    colors: req.body.colors.map((color: any) => ({
      ...color,
      imageUrl: files[color.imageIndex].path,
    })),
  };

  const result = await productService.addProduct(payload);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Product added successfully",
    data: result,
  });
});

const getProducts = catchAsync(async (req: Request, res: Response) => {});

const getProductById = catchAsync(async (req: Request, res: Response) => {});

const updateProductById = catchAsync(async (req: Request, res: Response) => {});

const deleteProductById = catchAsync(async (req: Request, res: Response) => {});

export const productController = {
  addProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
