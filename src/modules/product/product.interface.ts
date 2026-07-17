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

/**
 * {
  "title": "Premium Oversized T-Shirt",
  "description": "100% Cotton Premium Fabric",
  "discountPercentage": 10,
  "brandId": "019f5091-73c2-723f-a79d-b418fefa5f75",
  "categoryId": "019f507f-6f58-765c-b021-ffdd460b45d6",
  "colors": [
    {
      "color": "Blue",
      "imageIndex": 0,
      "variants": [
        {
          "size": "M",
          "price": 899,
          "stock": 10
        },
        {
          "size": "L",
          "price": 899,
          "stock": 5
        },
        {
          "size": "XL",
          "price": 899,
          "stock": 5
        }
      ]
    },
    {
      "color": "White",
      "imageIndex": 1,
      "variants": [
        {
          "size": "M",
          "price": 949,
          "stock": 8
        },
        {
          "size": "L",
          "price": 949,
          "stock": 3
        }
      ]
    }
  ]
}
 */
