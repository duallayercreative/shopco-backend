export interface CreateProduct {
  title: string;
  description: string;
  discountPercentage?: number;
  brandId: string;
  categoryId: string;
}
