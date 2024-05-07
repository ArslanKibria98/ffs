/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Form` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Form` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Form" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Form_name_key" ON "Form"("name");
