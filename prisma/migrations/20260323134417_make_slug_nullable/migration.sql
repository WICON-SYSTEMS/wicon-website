/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."products" ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_key" ON "public"."products"("slug");
