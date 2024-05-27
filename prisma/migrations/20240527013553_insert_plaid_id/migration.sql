/*
  Warnings:

  - Added the required column `plaid_id` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "plaid_id" TEXT NOT NULL;
