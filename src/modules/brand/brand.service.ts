import status from "http-status";
import AppError from "../../errors/app-error.js";
import { CreateBrand, UpdateBrand } from "./brand.interface.js";
import { prisma } from "../../lib/prisma.js";
import { Brand, Prisma } from "@prisma/client";
import { QueryBuilder } from "../../utils/query-builder.js";
import {
  IQueryParams,
  QueryResult,
} from "../../interfaces/query-builder.interface.js";

const addNewBrand = async (payload: CreateBrand): Promise<Brand> => {
  try {
    const result = await prisma.brand.create({
      data: payload,
    });

    return result;
  } catch (error) {
    throw new AppError("Failed to add new brand", status.INTERNAL_SERVER_ERROR);
  }
};

const getBrands = async (query: IQueryParams): Promise<QueryResult<Brand>> => {
  try {
    const queryBuilder = new QueryBuilder<
      Brand,
      Prisma.BrandWhereInput,
      Prisma.BrandInclude
    >(prisma.brand, query, {});

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
    throw new AppError("Failed to get brands", status.INTERNAL_SERVER_ERROR);
  }
};

const getBrandById = async (id: string): Promise<Brand> => {
  try {
    const brand = await prisma.brand.findUnique({
      where: { id },
    });

    if (!brand) {
      throw new AppError("Brand not found", status.NOT_FOUND);
    }

    return brand;
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError("Failed to get brand", status.INTERNAL_SERVER_ERROR);
  }
};

const updateBrandById = async (
  id: string,
  payload: UpdateBrand,
): Promise<Brand> => {
  try {
    const brand = await prisma.brand.findUnique({
      where: { id },
    });

    if (!brand) {
      throw new AppError("Brand not found", status.NOT_FOUND);
    }

    const result = await prisma.brand.update({
      where: { id },
      data: payload,
    });

    return result;
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError("Failed to update brand", status.INTERNAL_SERVER_ERROR);
  }
};

const deleteBrandById = async (id: string): Promise<void> => {
  try {
    const brand = await prisma.brand.findUnique({
      where: { id },
    });

    if (!brand) {
      throw new AppError("Brand not found", status.NOT_FOUND);
    }

    await prisma.brand.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  } catch (error) {
    if (error instanceof AppError) throw error;

    throw new AppError("Failed to delete brand", status.INTERNAL_SERVER_ERROR);
  }
};

export const brandService = {
  addNewBrand,
  getBrands,
  getBrandById,
  updateBrandById,
  deleteBrandById,
};
