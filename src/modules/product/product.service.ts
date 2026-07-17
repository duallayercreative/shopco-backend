import status from "http-status";
import AppError from "../../errors/app-error.js";
import { CreateProduct } from "./product.interface.js";
import { prisma } from "../../lib/prisma.js";
import { Prisma, Product } from "@prisma/client";
import { generateUniqueSlug } from "../../utils/generate-slug.js";
import { generateSku } from "../../utils/generate-sku.js";
import { QueryBuilder } from "../../utils/query-builder.js";
import {
  IQueryParams,
  QueryResult,
} from "../../interfaces/query-builder.interface.js";

const addProduct = async (payload: CreateProduct): Promise<any> => {
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

    const slug = generateUniqueSlug(payload.title);

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

    const updatedProduct = await prisma.product.findUnique({
      where: { id: result.id, deletedAt: null },
      include: {
        _count: true,
        productColors: {
          include: {
            _count: true,
            productVariants: true,
          },
        },
      },
    });

    return updatedProduct;
  } catch (error) {
    throw error;
  }
};

const getProducts = async (
  query: IQueryParams,
): Promise<QueryResult<Product>> => {
  try {
    const queryBuilder = new QueryBuilder<
      Product,
      Prisma.ProductWhereInput,
      Prisma.ProductInclude
    >(prisma.product, query, {});

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
        productColors: {
          include: {
            _count: true,
            productVariants: true,
          },
        },
      })
      .execute();

    return result;
  } catch (error) {
    throw error;
  }
};

const getProductById = async (id: string): Promise<Product> => {
  try {
    const product = await prisma.product.findUnique({
      where: { id, deletedAt: null },
      include: {
        _count: true,
        productColors: {
          include: {
            _count: true,
            productVariants: true,
          },
        },
      },
    });

    if (!product) {
      throw new AppError("Product not found", status.NOT_FOUND);
    }

    return product;
  } catch (error) {
    throw error;
  }
};

const updateProductById = async (id: string) => {
  try {
  } catch (error) {
    throw new AppError(
      "Failed to update product",
      status.INTERNAL_SERVER_ERROR,
    );
  }
};

const deleteProductById = async (id: string): Promise<void> => {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new AppError("Product not found", status.NOT_FOUND);
    }

    await prisma.product.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  } catch (error) {
    if (error instanceof AppError) throw error;

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
