/*
  Warnings:

  - You are about to drop the `Carousel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Carousel" DROP CONSTRAINT "Carousel_imageId_fkey";

-- DropForeignKey
ALTER TABLE "Carousel" DROP CONSTRAINT "Carousel_itemId_fkey";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "expiredAt" SET DEFAULT NOW() + interval '15minutes';

-- DropTable
DROP TABLE "Carousel";
