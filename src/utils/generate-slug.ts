import slugify from "slugify";
import { prisma } from "../lib/prisma.js";

export const generateUniqueSlug = async (title: string) => {
  const baseSlug = slugify(title, {
    lower: true,
    strict: true,
  });

  let slug = baseSlug;
  let counter = 1;

  while (
    await prisma.product.findUnique({
      where: { slug },
    })
  ) {
    slug = `${baseSlug}-${counter++}`;
  }

  return slug;
};
