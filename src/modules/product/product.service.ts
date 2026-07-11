import status from "http-status";
import AppError from "../../errors/app-error.js";
import { CreateProduct } from "./product.interface.js";
import { prisma } from "../../lib/prisma.js";
import { Product } from "@prisma/client";
import { generateUniqueSlug } from "../../utils/generate-slug.js";
import { generateSku } from "../../utils/generate-sku.js";

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

    const result = await prisma.$transaction(async (tx) => {
      const product = await tx.product.create({
        data: {
          title: payload.title,
          slug,
          description: payload.description,
          discountPercentage: payload.discountPercentage ?? 0,
          brandId: payload.brandId,
          categoryId: payload.categoryId,
        },
      });

      for (const color of payload.colors) {
        const createdColor = await tx.productColor.create({
          data: {
            color: color.color,
            imageUrl: color.imageUrl,
            productId: product.id,
          },
        });

        for (const variant of color.variants) {
          await tx.productVariant.create({
            data: {
              sku: generateSku(product.title, color.color, variant.size),
              size: variant.size,
              price: variant.price,
              stock: variant.stock,
              colorId: createdColor.id,
            },
          });
        }
      }

      return product;
    });

    return result;
  } catch (error) {
    if (error instanceof AppError) throw error;

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
