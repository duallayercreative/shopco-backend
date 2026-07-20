import * as z from "zod";

const addToCart = z.object({
  variantId: z.uuid("Invalid brand ID"),
  quantity: z
    .number({
      error: "Quantity must be a number",
    })
    .positive("Quantity must be greater than 0"),
});

export const cartValidation = {
  addToCart,
};
