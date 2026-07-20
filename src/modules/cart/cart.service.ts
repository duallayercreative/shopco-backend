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
      .includes({
        variant: {
          include: {
            _count: true,
            color: {
              include: {
                _count: true,
                product: true,
              },
            },
          },
        },
      })
      .execute();

    return result;
  } catch (error) {
    throw error;
  }
};

const deleteFromCart = async (
  userId: string,
  variantId: string,
): Promise<void> => {
  try {
    await prisma.cart.delete({
      where: {
        userId_variantId: {
          userId,
          variantId,
        },
      },
    });
  } catch (error) {
    throw error;
  }
};

export const cartService = {
  addToCart,
  getCarts,
  deleteFromCart,
};
