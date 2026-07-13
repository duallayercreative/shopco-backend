import { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async.js";
import { userService } from "./user.service.js";
import { IQueryParams } from "../../interfaces/query-builder.interface.js";
import { sendResponse } from "../../utils/send-response.js";
import { User } from "@prisma/client";

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getUsers(req.query as IQueryParams);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users fetched successfully",
    data: result,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as User;

  const result = await userService.updateProfile(user.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile updated successfully",
    data: result,
  });
});

const deleteUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  await userService.deleteUserById(id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User deleted successfully",
  });
});

export const userController = {
  getUsers,
  updateProfile,
  deleteUserById,
};
