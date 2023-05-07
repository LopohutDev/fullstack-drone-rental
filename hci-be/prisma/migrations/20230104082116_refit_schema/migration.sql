/*
  Warnings:

  - You are about to drop the column `discount` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `eventOrderFee` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `orderFee` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `totalPerTicketFee` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the `_ItemToItemCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ItemToItemCategory" DROP CONSTRAINT "_ItemToItemCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_ItemToItemCategory" DROP CONSTRAINT "_ItemToItemCategory_B_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "discount",
DROP COLUMN "eventOrderFee",
ADD COLUMN     "itemCategoryId" TEXT,
ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "orderFee",
DROP COLUMN "totalPerTicketFee",
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "expiredAt" SET DEFAULT NOW() + interval '15minutes';

-- DropTable
DROP TABLE "_ItemToItemCategory";

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_itemCategoryId_fkey" FOREIGN KEY ("itemCategoryId") REFERENCES "ItemCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
