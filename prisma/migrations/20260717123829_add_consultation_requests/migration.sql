-- CreateEnum
CREATE TYPE "InquiryType" AS ENUM ('BRIDAL_CONSULTATION', 'CUSTOM_ORDER', 'GENERAL', 'PRESS');

-- CreateTable
CREATE TABLE "consultation_requests" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "preferredDate" TIMESTAMP(3),
    "inquiryType" "InquiryType" NOT NULL DEFAULT 'BRIDAL_CONSULTATION',
    "message" TEXT NOT NULL,
    "isResolved" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "consultation_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "consultation_requests_email_idx" ON "consultation_requests"("email");

-- CreateIndex
CREATE INDEX "consultation_requests_createdAt_idx" ON "consultation_requests"("createdAt");
