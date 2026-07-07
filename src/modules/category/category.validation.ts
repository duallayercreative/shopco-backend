import * as z from "zod";

const createCategory = z.object({
  name: z
    .string("Invalid name")
    .min(1, "Name is required")
    .max(255, "Name can't be more than 255 characters long"),
  description: z
    .string()
    .max(1000, "Description can't be more than 1000 characters long")
    .optional(),
});

export const categoryValidation = {
  createCategory,
};
