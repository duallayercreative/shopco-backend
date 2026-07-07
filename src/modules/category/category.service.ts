import status from "http-status";
import AppError from "../../errors/app-error.js";
import { prisma } from "../../lib/prisma.js";
import { CreateCategory } from "./category.interface.js";
import { Category, Prisma } from "@prisma/client";
import { QueryBuilder } from "../../utils/query-builder.js";
import {
  IQueryParams,
  QueryResult,
} from "../../interfaces/query-builder.interface.js";

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

const getCategories = async (
  query: IQueryParams,
): Promise<QueryResult<Category>> => {
  try {
    const queryBuilder = new QueryBuilder<
      Category,
      Prisma.CategoryWhereInput,
      Prisma.CategoryInclude
    >(prisma.category, query, {});

    const result = await queryBuilder
      .pagination()
      .sort()
      .where({})
      .search()
      .filter()
      .select()
      .includes({})
      .execute();

    return result;
  } catch (error) {
    throw new AppError(
      "Failed to fetch categories",
      status.INTERNAL_SERVER_ERROR,
    );
  }
};

const getCategoryById = async (id: string): Promise<Category | null> => {
  try {
    const result = await prisma.category.findUnique({
      where: { id },
    });

    if (!result) {
      throw new AppError("Category not found", status.NOT_FOUND);
    }

    return result;
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError(
      "Failed to fetch category",
      status.INTERNAL_SERVER_ERROR,
    );
  }
};

export const categoryService = {
  createCategory,
  getCategories,
  getCategoryById,
};
