import status from "http-status";
import AppError from "../../errors/app-error.js";
import { prisma } from "../../lib/prisma.js";
import { CreateCategory } from "./category.interface.js";
import { Category } from "@prisma/client";

const createCategory = async (payload: CreateCategory): Promise<Category> => {
  try {
    const result = await prisma.category.create({
      data: payload,
    });

    return result;
  } catch (error) {
    throw new AppError(
      "Failed to create category",
      status.INTERNAL_SERVER_ERROR,
    );
  }
};

const getCategories = async () => {};

export const categoryService = {
  createCategory,
  getCategories,
};
