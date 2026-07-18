import Image from "next/image";

import type { Prisma } from "@/generated/prisma";
import { OrderStatusBadge } from "@/features/orders/components/order-status-badge";
import { formatPrice } from "@/utils/format-price";

type OrderWithItems = Prisma.OrderGetPayload<{ include: { items: true } }>;

export function OrderCard({ order }: { order: OrderWithItems }) {
  const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="rounded-2xl border border-[#D4AF37]/30 bg-white p-6 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-5">
        <div>
          <p className="font-heading text-lg font-semibold text-foreground">
            Order #{order.orderNumber}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{orderDate}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <ul className="mt-5 space-y-4">
        {order.items.map((item) => (
          <li key={item.id} className="flex items-center gap-4">
            <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted">
              {item.productImage ? (
                <Image
                  src={item.productImage}
                  alt={item.productName}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              ) : null}
            </div>
            <div className="flex flex-1 items-center justify-between gap-2">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {item.productName}
                </p>
                <p className="text-xs text-muted-foreground">
                  Qty {item.quantity}
                </p>
              </div>
              <p className="text-sm font-medium text-foreground">
                {formatPrice(item.price)}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-5">
        <span className="text-sm text-muted-foreground">Total</span>
        <span className="font-heading text-lg font-semibold text-foreground">
          {formatPrice(order.totalAmount)}
        </span>
      </div>
    </div>
  );
}
