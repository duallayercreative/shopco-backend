/*
  Warnings:

  - You are about to drop the column `productId` on the `cart` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,variantId]` on the table `cart` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `variantId` to the `cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_productId_fkey";

-- DropIndex
DROP INDEX "cart_userId_productId_key";

-- AlterTable
ALTER TABLE "cart" DROP COLUMN "productId",
ADD COLUMN     "variantId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cart_userId_variantId_key" ON "cart"("userId", "variantId");

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "product_variant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
