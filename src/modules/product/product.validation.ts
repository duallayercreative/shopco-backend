import { ProductSize } from "@prisma/client";
import * as z from "zod";

const createProductVariant = z.object({
  size: z.enum(ProductSize),
  price: z
    .number({
      error: "Price must be a number",
    })
    .positive("Price must be greater than 0"),
  stock: z
    .number({
      error: "Stock must be a number",
    })
    .int("Stock must be an integer")
    .min(0, "Stock cannot be negative"),
});

const createProductColor = z.object({
  color: z
    .string()
    .trim()
    .min(1, "Color is required")
    .max(50, "Color can't be more than 50 characters"),

  // Image URL will be added by the backend after Cloudinary upload
  imageUrl: z.url().optional(),

  // Temporary field to map uploaded files
  imageIndex: z.number().int().min(0).optional(),

  variants: z
    .array(createProductVariant)
    .min(1, "At least one variant is required"),
});

const createProduct = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title can't be more than 255 characters"),

  description: z
    .string()
    .min(1, "Description is required")
    .max(5000, "Description can't exceed 5000 characters"),

  discountPercentage: z
    .number()
    .int()
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot exceed 100%")
    .optional()
    .default(0),

  brandId: z.uuid("Invalid brand ID"),

  categoryId: z.uuid("Invalid category ID"),

  colors: z.array(createProductColor).min(1, "At least one color is required"),
});

const updateProduct = createProduct
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required to update.",
  });

export const productValidation = {
  createProduct,
  updateProduct,
};
