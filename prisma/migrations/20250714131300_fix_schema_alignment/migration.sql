/*
  Warnings:

  - You are about to alter the column `income` on the `MonthHistory` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.
  - You are about to alter the column `expense` on the `MonthHistory` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.
  - You are about to alter the column `amount` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.
  - You are about to alter the column `income` on the `YearHistory` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.
  - You are about to alter the column `expense` on the `YearHistory` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(12,2)`.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "MonthHistory" ALTER COLUMN "income" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "expense" SET DATA TYPE DECIMAL(12,2);

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(12,2);

-- AlterTable
ALTER TABLE "UserSettings" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "currency" SET DEFAULT 'EUR';

-- AlterTable
ALTER TABLE "YearHistory" ALTER COLUMN "income" SET DATA TYPE DECIMAL(12,2),
ALTER COLUMN "expense" SET DATA TYPE DECIMAL(12,2);

-- CreateIndex
CREATE INDEX "Category_userId_idx" ON "Category"("userId");

-- CreateIndex
CREATE INDEX "Category_userId_type_idx" ON "Category"("userId", "type");

-- CreateIndex
CREATE INDEX "MonthHistory_userId_year_month_idx" ON "MonthHistory"("userId", "year", "month");

-- CreateIndex
CREATE INDEX "Transaction_userId_date_idx" ON "Transaction"("userId", "date");

-- CreateIndex
CREATE INDEX "Transaction_userId_type_idx" ON "Transaction"("userId", "type");

-- CreateIndex
CREATE INDEX "Transaction_userId_category_idx" ON "Transaction"("userId", "category");

-- CreateIndex
CREATE INDEX "YearHistory_userId_year_idx" ON "YearHistory"("userId", "year");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_category_userId_type_fkey" FOREIGN KEY ("category", "userId", "type") REFERENCES "Category"("name", "userId", "type") ON DELETE RESTRICT ON UPDATE CASCADE;
