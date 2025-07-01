/*
  Warnings:

  - The primary key for the `IPOEvent` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "IPOEvent" DROP CONSTRAINT "IPOEvent_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "IPOEvent_pkey" PRIMARY KEY ("id");
