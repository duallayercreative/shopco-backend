import { NextFunction, Request, Response } from "express";
import status from "http-status";
import * as z from "zod";
import AppError from "../errors/app-error.js";
import { env } from "../config/env.js";
import { ErrorSourceType } from "../interfaces/error.js";
import { handleZodError } from "../errors/zod-error.js";
import { Prisma } from "@prisma/client";
import { handlePrismaError } from "../errors/prisma-error.js";

async function globalErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let statusCode: number = status.INTERNAL_SERVER_ERROR;
  let message: string = "Internal Server Error";
  let errorSources: ErrorSourceType[] = [];

  if (env.NODE_ENV === "development") {
    console.error(err);
  }

  if (err instanceof z.ZodError) {
    const simplifiedZodErrors = handleZodError(err);

    statusCode = simplifiedZodErrors.statusCode;
    message = simplifiedZodErrors.message;
    errorSources = [...simplifiedZodErrors.errorSources];
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const simplifiedPrismaErrors = handlePrismaError(err);

    statusCode = simplifiedPrismaErrors.statusCode;
    message = simplifiedPrismaErrors.message;
    errorSources = [...simplifiedPrismaErrors.errorSources];
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else {
    statusCode = status.INTERNAL_SERVER_ERROR;
    message = err.message || "Internal Server Error";
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    ...(env.NODE_ENV === "development" && { stack: err.stack }),
  });
}

export default globalErrorHandler;
