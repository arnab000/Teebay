/*
  Warnings:

  - You are about to drop the column `renterId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_renterId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "renterId",
ADD COLUMN     "sold" BOOLEAN;

-- CreateTable
CREATE TABLE "RentSystem" (
    "id" SERIAL NOT NULL,
    "renterId" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RentSystem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_renter" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_renter_AB_unique" ON "_renter"("A", "B");

-- CreateIndex
CREATE INDEX "_renter_B_index" ON "_renter"("B");

-- AddForeignKey
ALTER TABLE "RentSystem" ADD CONSTRAINT "RentSystem_renterId_fkey" FOREIGN KEY ("renterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_renter" ADD CONSTRAINT "_renter_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_renter" ADD CONSTRAINT "_renter_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
