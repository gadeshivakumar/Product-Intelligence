-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('PENDING', 'RUNNING', 'COMPLETED', 'FAILED', 'PARTIALLY_COMPLETED');

-- CreateEnum
CREATE TYPE "Severity" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- CreateEnum
CREATE TYPE "Availability" AS ENUM ('in_stock', 'out_of_stock');

-- CreateEnum
CREATE TYPE "ExtractedFrom" AS ENUM ('VIDEO', 'CSV', 'MANUAL');

-- CreateEnum
CREATE TYPE "ProcessingStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "AlertReadStatus" AS ENUM ('UNREAD', 'READ');

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "skuId" TEXT NOT NULL,
    "productTitle" TEXT,
    "description" TEXT,
    "brand" TEXT,
    "category" TEXT,
    "price" DOUBLE PRECISION,
    "mrp" DOUBLE PRECISION,
    "imageUrl" TEXT,
    "productUrl" TEXT,
    "availability" "Availability" NOT NULL DEFAULT 'in_stock',
    "color" TEXT,
    "size" TEXT,
    "material" TEXT,
    "visiblePackagingText" TEXT,
    "extractedAttributes" JSONB,
    "extractedFrom" "ExtractedFrom" NOT NULL DEFAULT 'MANUAL',
    "extractionConfidence" DOUBLE PRECISION,
    "titleEnhancementEnabled" BOOLEAN NOT NULL DEFAULT false,
    "enhancedTitle" TEXT,
    "listingQualityScore" DOUBLE PRECISION DEFAULT 100,
    "validationStatus" TEXT,
    "processingStatus" "ProcessingStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductIssue" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "issueType" TEXT NOT NULL,
    "severity" "Severity" NOT NULL,
    "message" TEXT NOT NULL,
    "suggestedFix" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductIssue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetitorPrice" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "competitorUrl" TEXT,
    "competitorPrice" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "lastCheckedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompetitorPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alert" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "severity" "Severity" NOT NULL,
    "alertType" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "readStatus" "AlertReadStatus" NOT NULL DEFAULT 'UNREAD',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Alert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "jobType" TEXT NOT NULL,
    "status" "JobStatus" NOT NULL DEFAULT 'PENDING',
    "progress" INTEGER NOT NULL DEFAULT 0,
    "errorMessage" TEXT,
    "metadata" JSONB,
    "totalRows" INTEGER,
    "successfulRows" INTEGER,
    "failedRows" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_skuId_key" ON "Product"("skuId");

-- CreateIndex
CREATE INDEX "Product_category_idx" ON "Product"("category");

-- CreateIndex
CREATE INDEX "Product_brand_idx" ON "Product"("brand");

-- CreateIndex
CREATE INDEX "Product_availability_idx" ON "Product"("availability");

-- CreateIndex
CREATE INDEX "Product_processingStatus_idx" ON "Product"("processingStatus");

-- CreateIndex
CREATE INDEX "ProductIssue_severity_idx" ON "ProductIssue"("severity");

-- CreateIndex
CREATE INDEX "ProductIssue_productId_idx" ON "ProductIssue"("productId");

-- CreateIndex
CREATE INDEX "CompetitorPrice_platform_idx" ON "CompetitorPrice"("platform");

-- CreateIndex
CREATE INDEX "CompetitorPrice_productId_idx" ON "CompetitorPrice"("productId");

-- CreateIndex
CREATE INDEX "Alert_severity_idx" ON "Alert"("severity");

-- CreateIndex
CREATE INDEX "Alert_productId_idx" ON "Alert"("productId");

-- CreateIndex
CREATE INDEX "Job_status_idx" ON "Job"("status");

-- CreateIndex
CREATE INDEX "Job_jobType_idx" ON "Job"("jobType");

-- AddForeignKey
ALTER TABLE "ProductIssue" ADD CONSTRAINT "ProductIssue_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetitorPrice" ADD CONSTRAINT "CompetitorPrice_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
