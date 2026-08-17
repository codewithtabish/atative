-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "editorId" TEXT;

-- CreateTable
CREATE TABLE "Editor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "imageUrl" TEXT,
    "bio" TEXT,
    "experience" TEXT,
    "location" TEXT,
    "website" TEXT,
    "twitter" TEXT,
    "linkedin" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "github" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Editor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Editor_email_key" ON "Editor"("email");

-- CreateIndex
CREATE INDEX "Editor_isActive_idx" ON "Editor"("isActive");

-- CreateIndex
CREATE INDEX "Editor_name_idx" ON "Editor"("name");

-- CreateIndex
CREATE INDEX "Category_editorId_idx" ON "Category"("editorId");

-- CreateIndex
CREATE INDEX "Category_isActive_idx" ON "Category"("isActive");

-- CreateIndex
CREATE INDEX "Category_sortOrder_idx" ON "Category"("sortOrder");

-- CreateIndex
CREATE INDEX "Subcategory_isActive_idx" ON "Subcategory"("isActive");

-- CreateIndex
CREATE INDEX "Subcategory_sortOrder_idx" ON "Subcategory"("sortOrder");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_editorId_fkey" FOREIGN KEY ("editorId") REFERENCES "Editor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
