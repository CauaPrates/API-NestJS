/*
  Warnings:

  - Added the required column `nome` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `nome` VARCHAR(63) NOT NULL,
    ADD COLUMN `role` INTEGER NOT NULL DEFAULT 23,
    ADD COLUMN `senha` VARCHAR(127) NOT NULL;
