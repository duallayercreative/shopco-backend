import { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async.js";
import { sendResponse } from "../../utils/send-response.js";
import status from "http-status";
import { cartService } from "./cart.service.js";
import { User } from "@prisma/client";

const addToCart = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as User;

  const result = await cartService.addToCart(req.body, user.id);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Product added to cart successfully",
    data: result,
  });
});

export const cartController = {
  addToCart,
};
