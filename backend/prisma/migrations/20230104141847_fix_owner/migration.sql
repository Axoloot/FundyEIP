-- AlterTable
ALTER TABLE "Association" ADD COLUMN     "ownerId" TEXT;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "ownerId" TEXT;

-- AddForeignKey
ALTER TABLE "Association" ADD CONSTRAINT "Association_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
