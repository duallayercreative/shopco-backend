import status from "http-status";
import * as z from "zod";

export interface ErrorSourceType {
  path: string;
  message: string;
}

export interface ErrorResponseType {
  statusCode: number;
  message: string;
  errorSources: ErrorSourceType[];
  stack?: string;
}

export const handleZodError = (err: z.ZodError): ErrorResponseType => {
  const statusCode: number = status.BAD_REQUEST;
  const message: string = "Zod Validation Error";
  const errorSources: ErrorSourceType[] = [];

  err.issues.forEach((issue) => {
    errorSources.push({
      path: issue.path.join("."),
      message: issue.message,
    });
  });

  return {
    statusCode,
    message,
    errorSources,
  };
};
