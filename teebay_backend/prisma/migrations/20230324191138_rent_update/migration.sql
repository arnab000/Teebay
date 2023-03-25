-- CreateTable
CREATE TABLE "_ProductToRentSystem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToRentSystem_AB_unique" ON "_ProductToRentSystem"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToRentSystem_B_index" ON "_ProductToRentSystem"("B");

-- AddForeignKey
ALTER TABLE "_ProductToRentSystem" ADD CONSTRAINT "_ProductToRentSystem_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToRentSystem" ADD CONSTRAINT "_ProductToRentSystem_B_fkey" FOREIGN KEY ("B") REFERENCES "RentSystem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
