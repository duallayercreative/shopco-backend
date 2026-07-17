import * as z from "zod";

const updateUser = z
  .object({
    name: z.string(),
    image: z.url(),
    address: z.string(),
    phone: z.string(),
    dateOfBirth: z.date(),
  })
  .partial();

export const userValidation = {
  updateUser,
};
