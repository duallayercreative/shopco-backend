import { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async.js";
import { categoryService } from "./category.service.js";
import { sendResponse } from "../../utils/send-response.js";
import status from "http-status";
import { IQueryParams } from "../../interfaces/query-builder.interface.js";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.createCategory(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});

const getCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.getCategories(req.query as IQueryParams);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Categories fetched successfully",
    data: result,
  });
});

const getCategoryById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await categoryService.getCategoryById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Category fetched successfully",
    data: result,
  });
});

const updateCategoryById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await categoryService.updateCategoryById(
    id as string,
    req.body,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Category updated successfully",
    data: result,
  });
});

const deleteCategoryById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  await categoryService.deleteCategoryById(id as string);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Category deleted successfully",
  });
});

export const categoryController = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
