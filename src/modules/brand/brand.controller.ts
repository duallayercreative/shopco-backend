import { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async.js";
import { brandService } from "./brand.service.js";
import { sendResponse } from "../../utils/send-response.js";
import { IQueryParams } from "../../interfaces/query-builder.interface.js";

const addNewBrand = catchAsync(async (req: Request, res: Response) => {
  const result = await brandService.addNewBrand(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Brand created successfully",
    data: result,
  });
});

const getBrands = catchAsync(async (req: Request, res: Response) => {
  const result = await brandService.getBrands(req.query as IQueryParams);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Brands fetched successfully",
    data: result,
  });
});

const getBrandById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await brandService.getBrandById(id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Brand fetched successfully",
    data: result,
  });
});

const updateBrandById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await brandService.updateBrandById(id as string, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Brand updated successfully",
    data: result,
  });
});

const deleteBrandById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  await brandService.deleteBrandById(id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Brand deleted successfully",
  });
});

export const brandController = {
  addNewBrand,
  getBrands,
  getBrandById,
  updateBrandById,
  deleteBrandById,
};
