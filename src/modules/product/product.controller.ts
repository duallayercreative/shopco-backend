import { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async.js";
import { productService } from "./product.service.js";
import { sendResponse } from "../../utils/send-response.js";
import { IQueryParams } from "../../interfaces/query-builder.interface.js";
import status from "http-status";

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
    statusCode: status.CREATED,
    success: true,
    message: "Product added successfully",
    data: result,
  });
});

const getProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await productService.getProducts(req.query as IQueryParams);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Products fetched successfully",
    data: result,
  });
});

const getProductById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await productService.getProductById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Product fetched successfully",
    data: result,
  });
});

const updateProductById = catchAsync(async (req: Request, res: Response) => {});

const deleteProductById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  await productService.deleteProductById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Product deleted successfully",
  });
});

export const productController = {
  addProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
