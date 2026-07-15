import status from "http-status";
import AppError from "../../errors/app-error.js";
import { AddToCart } from "./cart.interface.js";
import { prisma } from "../../lib/prisma.js";
import { Cart } from "@prisma/client";

const addToCart = async (payload: AddToCart, userId: string): Promise<Cart> => {
  try {
    const result = await prisma.cart.upsert({
      where: {
        userId_productId: {
          userId,
          productId: payload.productId,
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
        productId: payload.productId,
      },
    });

    return result;
  } catch (error) {
    throw new AppError("Failed to add to cart", status.INTERNAL_SERVER_ERROR);
  }
};

export const cartService = {
  addToCart,
};
