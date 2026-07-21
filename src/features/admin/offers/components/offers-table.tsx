"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { deleteCoupon, toggleCouponStatus } from "@/actions/admin/offers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/format-price";

type Coupon = {
  id: string;
  code: string;
  type: string;
  value: string | number;
  usageLimit: number | null;
  usedCount: number;
  isActive: boolean;
  startsAt: Date;
  expiresAt: Date;
};

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function OffersTable({ coupons }: { coupons: Coupon[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleToggle = (coupon: Coupon) => {
    startTransition(async () => {
      const result = await toggleCouponStatus(coupon.id, !coupon.isActive);
      if (result.success) {
        toast.success(coupon.isActive ? "Offer disabled" : "Offer enabled");
        router.refresh();
      } else {
        toast.error("Could not update this offer.");
      }
    });
  };

  const handleDelete = (coupon: Coupon) => {
    if (
      typeof window !== "undefined" &&
      !window.confirm(`Delete offer "${coupon.code}"? This cannot be undone.`)
    ) {
      return;
    }
    startTransition(async () => {
      const result = await deleteCoupon(coupon.id);
      if (result.success) {
        toast.success("Offer deleted");
        router.refresh();
      } else {
        toast.error("Could not delete this offer.");
      }
    });
  };

  if (coupons.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border py-16 text-center text-muted-foreground">
        No offers yet. Create your first discount code to get started.
      </div>
    );
  }

  const isExpired = (coupon: Coupon) => new Date(coupon.expiresAt) < new Date();

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border bg-muted/50 text-xs tracking-wide text-muted-foreground uppercase">
          <tr>
            <th className="px-4 py-3">Code</th>
            <th className="px-4 py-3">Discount</th>
            <th className="px-4 py-3">Usage</th>
            <th className="px-4 py-3">Expires</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {coupons.map((coupon) => (
            <tr key={coupon.id}>
              <td className="px-4 py-3 font-mono font-medium text-foreground">
                {coupon.code}
              </td>
              <td className="px-4 py-3 text-foreground">
                {coupon.type === "PERCENTAGE"
                  ? `${Number(coupon.value)}% OFF`
                  : `${formatPrice(coupon.value)} OFF`}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {coupon.usedCount}
                {coupon.usageLimit ? ` / ${coupon.usageLimit}` : ""}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {formatDate(coupon.expiresAt)}
              </td>
              <td className="px-4 py-3">
                {isExpired(coupon) ? (
                  <Badge variant="secondary">Expired</Badge>
                ) : coupon.isActive ? (
                  <Badge className="bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                    Active
                  </Badge>
                ) : (
                  <Badge variant="secondary">Disabled</Badge>
                )}
              </td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isPending}
                    onClick={() => handleToggle(coupon)}
                  >
                    {coupon.isActive ? "Disable" : "Enable"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={isPending}
                    onClick={() => handleDelete(coupon)}
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
