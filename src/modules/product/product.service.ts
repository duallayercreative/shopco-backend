import status from "http-status";
import AppError from "../../errors/app-error.js";
import { CreateProduct } from "./product.interface.js";
import { prisma } from "../../lib/prisma.js";
import { Product } from "@prisma/client";
import { generateUniqueSlug } from "../../utils/generate-slug.js";

const addProduct = async (payload: CreateProduct): Promise<Product> => {
  try {
    if (
      payload.discountPercentage &&
      (payload.discountPercentage < 0 || payload.discountPercentage > 100)
    ) {
      throw new AppError(
        "Discount percentage must be between 0 and 100",
        status.BAD_REQUEST,
      );
    }

    const slug = await generateUniqueSlug(payload.title);

    const result = await prisma.product.create({
      data: {
        ...payload,
        slug,
      },
    });

    return result;
  } catch (error) {
    throw new AppError("Failed to add product", status.INTERNAL_SERVER_ERROR);
  }
};

const getProducts = async () => {
  try {
  } catch (error) {
    throw new AppError("Failed to get products", status.INTERNAL_SERVER_ERROR);
  }
};

const getProductById = async () => {
  try {
  } catch (error) {
    throw new AppError("Failed to get product", status.INTERNAL_SERVER_ERROR);
  }
};

const updateProductById = async () => {
  try {
  } catch (error) {
    throw new AppError(
      "Failed to update product",
      status.INTERNAL_SERVER_ERROR,
    );
  }
};

const deleteProductById = async () => {
  try {
  } catch (error) {
    throw new AppError(
      "Failed to delete product",
      status.INTERNAL_SERVER_ERROR,
    );
  }
};

export const productService = {
  addProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
};
