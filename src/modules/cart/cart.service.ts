import status from "http-status";
import AppError from "../../errors/app-error.js";
import { AddToCart } from "./cart.interface.js";
import { prisma } from "../../lib/prisma.js";
import { Cart, Prisma } from "@prisma/client";
import { QueryBuilder } from "../../utils/query-builder.js";
import {
  IQueryParams,
  QueryResult,
} from "../../interfaces/query-builder.interface.js";

const addToCart = async (userId: string, payload: AddToCart): Promise<Cart> => {
  try {
    const result = await prisma.cart.upsert({
      where: {
        userId_variantId: {
          userId,
          variantId: payload.variantId,
        },
      },
      update: {
        quantity: {
          increment: payload.quantity,
        },
      },
      create: {
        userId,
        quantity: payload.quantity,
        variantId: payload.variantId,
      },
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const getCarts = async (
  userId: string,
  query: IQueryParams,
): Promise<QueryResult<Cart>> => {
  try {
    const queryBuilder = new QueryBuilder<
      Cart,
      Prisma.CartWhereInput,
      Prisma.CartInclude
    >(prisma.cart, query, {});

    const result = await queryBuilder
      .where({
        userId,
        deletedAt: null,
      })
      .includes({})
      .execute();

    return result;
  } catch (error) {
    throw new AppError("Failed to get cart", status.INTERNAL_SERVER_ERROR);
  }
};

export const cartService = {
  addToCart,
  getCarts,
};
