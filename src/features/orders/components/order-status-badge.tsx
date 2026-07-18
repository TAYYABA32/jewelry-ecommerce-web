import type { OrderStatus } from "@/generated/prisma";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const STATUS_CONFIG: Record<OrderStatus, { label: string; className: string }> = {
  PENDING: {
    label: "In Atelier / Handcrafting",
    className: "bg-[#D4AF37]/15 text-[#8a6d1f]",
  },
  CONFIRMED: {
    label: "In Atelier / Handcrafting",
    className: "bg-[#D4AF37]/15 text-[#8a6d1f]",
  },
  PROCESSING: {
    label: "Processing",
    className: "bg-[#D4AF37]/15 text-[#8a6d1f]",
  },
  SHIPPED: {
    label: "Shipped",
    className: "bg-blue-500/10 text-blue-700",
  },
  DELIVERED: {
    label: "Delivered",
    className: "bg-emerald-500/10 text-emerald-700",
  },
  CANCELLED: {
    label: "Cancelled",
    className: "bg-destructive/10 text-destructive",
  },
  REFUNDED: {
    label: "Refunded",
    className: "bg-muted text-muted-foreground",
  },
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const config = STATUS_CONFIG[status];

  return (
    <Badge
      className={cn(
        "rounded-full px-3 py-1 text-[11px] font-medium tracking-wide uppercase",
        config.className,
      )}
    >
      {config.label}
    </Badge>
  );
}
