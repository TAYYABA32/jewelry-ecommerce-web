-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('PKR', 'USD');

-- CreateTable
CREATE TABLE "store_settings" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "storeName" TEXT NOT NULL,
    "supportEmail" TEXT NOT NULL,
    "supportWhatsapp" TEXT,
    "currency" "Currency" NOT NULL DEFAULT 'PKR',
    "standardShippingRate" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "freeShippingThreshold" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "estimatedDeliveryDays" TEXT NOT NULL DEFAULT '3-5 business days',
    "codEnabled" BOOLEAN NOT NULL DEFAULT true,
    "bankName" TEXT,
    "bankAccountTitle" TEXT,
    "bankIban" TEXT,
    "orderEmailNotifications" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "store_settings_pkey" PRIMARY KEY ("id")
);
