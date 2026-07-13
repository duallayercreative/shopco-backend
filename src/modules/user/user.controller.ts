import { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async.js";
import { userService } from "./user.service.js";
import { IQueryParams } from "../../interfaces/query-builder.interface.js";
import { sendResponse } from "../../utils/send-response.js";

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getUsers(req.query as IQueryParams);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users fetched successfully",
    data: result,
  });
});

export const userController = {
  getUsers,
};
