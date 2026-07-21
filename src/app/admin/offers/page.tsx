import type { Metadata } from "next";

import { OfferFormSheet } from "@/features/admin/offers/components/offer-form-sheet";
import { OffersTable } from "@/features/admin/offers/components/offers-table";
import { getCoupons } from "@/services/admin/offers-service";

export const metadata: Metadata = { title: "Offers" };

export default async function AdminOffersPage() {
  const coupons = await getCoupons();

  return (
    <div>
      <header className="flex items-start justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-foreground">
            Offers
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {coupons.length} {coupons.length === 1 ? "offer" : "offers"}
          </p>
        </div>
        <OfferFormSheet />
      </header>

      <div className="mt-8">
        <OffersTable
          coupons={coupons.map((coupon) => ({
            id: coupon.id,
            code: coupon.code,
            type: coupon.type,
            value: coupon.value.toString(),
            usageLimit: coupon.usageLimit,
            usedCount: coupon.usedCount,
            isActive: coupon.isActive,
            startsAt: coupon.startsAt,
            expiresAt: coupon.expiresAt,
          }))}
        />
      </div>
    </div>
  );
}
