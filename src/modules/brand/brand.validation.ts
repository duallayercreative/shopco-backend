import * as z from "zod";

const createBrand = z.object({
  name: z
    .string("Invalid name")
    .min(1, "Name is required")
    .max(255, "Name can't be more than 255 characters long"),

  logo: z.string().optional(),

  description: z
    .string()
    .max(1000, "Description can't be more than 1000 characters long")
    .optional(),
});

const updateBrand = createBrand
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required to update.",
  });

export const brandValidation = {
  createBrand,
  updateBrand,
};
