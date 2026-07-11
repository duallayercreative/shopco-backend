import { ProductSize } from "@prisma/client";

export interface CreateProduct {
  title: string;
  description: string;
  discountPercentage?: number;
  brandId: string;
  categoryId: string;
  colors: {
    color: string;
    imageUrl?: string;
    variants: {
      size: ProductSize;
      price: number;
      stock: number;
    }[];
  }[];
}
