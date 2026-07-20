import { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async.js";
import { sendResponse } from "../../utils/send-response.js";
import status from "http-status";
import { cartService } from "./cart.service.js";
import { User } from "@prisma/client";
import { IQueryParams } from "../../interfaces/query-builder.interface.js";

const addToCart = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as User;

  const result = await cartService.addToCart(user.id, req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Product added to cart successfully",
    data: result,
  });
});

const getCarts = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as User;

  const result = await cartService.getCarts(user.id, req.query as IQueryParams);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Carts fetched successfully",
    data: result,
  });
});

const deleteFromCart = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = req.user as User;

  const result = await cartService.deleteFromCart(user.id, id as string);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Product deleted from cart successfully",
    data: result,
  });
});

export const cartController = {
  addToCart,
  getCarts,
  deleteFromCart,
};
