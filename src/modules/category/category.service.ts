import status from "http-status";
import AppError from "../../errors/app-error.js";
import { prisma } from "../../lib/prisma.js";
import { CreateCategory, UpdateCategory } from "./category.interface.js";
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
    throw error;
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
      .where({
        deletedAt: null,
      })
      .search()
      .filter()
      .select()
      .includes({
        _count: true,
      })
      .execute();

    return result;
  } catch (error) {
    throw error;
  }
};

const getCategoryById = async (id: string): Promise<Category> => {
  try {
    const result = await prisma.category.findUnique({
      where: { id, deletedAt: null },
    });

    if (!result) {
      throw new AppError("Category not found", status.NOT_FOUND);
    }

    return result;
  } catch (error) {
    throw error;
  }
};

const updateCategoryById = async (
  id: string,
  payload: UpdateCategory,
): Promise<Category> => {
  try {
    const isCategoryExist = await prisma.category.findUnique({
      where: { id, deletedAt: null },
    });

    if (!isCategoryExist) {
      throw new AppError("Category not found", status.NOT_FOUND);
    }

    const result = await prisma.category.update({
      where: { id },
      data: payload,
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const deleteCategoryById = async (id: string): Promise<void> => {
  try {
    const isCategoryExist = await prisma.category.findUnique({
      where: { id, deletedAt: null },
    });

    if (!isCategoryExist) {
      throw new AppError("Category not found", status.NOT_FOUND);
    }

    await prisma.category.update({
      where: { id, deletedAt: null },
      data: {
        deletedAt: new Date(),
      },
    });
  } catch (error) {
    throw error;
  }
};

export const categoryService = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
