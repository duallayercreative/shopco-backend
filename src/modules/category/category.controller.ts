import { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async.js";
import { categoryService } from "./category.service.js";
import { sendResponse } from "../../utils/send-response.js";
import status from "http-status";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryService.createCategory(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});

export const categoryController = {
  createCategory,
};
