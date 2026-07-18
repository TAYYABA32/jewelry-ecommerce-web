import { OrderStatusSelect } from "@/features/admin/orders/components/order-status-select";
import { formatPrice } from "@/utils/format-price";

type AdminOrder = {
  id: string;
  orderNumber: string;
  status: string;
  totalAmount: string | number;
  createdAt: Date;
  shippingAddress: { fullName: string } | null;
  items: { id: string; productName: string; quantity: number }[];
};

export function OrdersTable({ orders }: { orders: AdminOrder[] }) {
  if (orders.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border py-16 text-center text-muted-foreground">
        No orders yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border bg-muted/50 text-xs tracking-wide text-muted-foreground uppercase">
          <tr>
            <th className="px-4 py-3">Order</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Items</th>
            <th className="px-4 py-3">Total</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-4 py-3">
                <p className="font-medium text-foreground">
                  #{order.orderNumber}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </td>
              <td className="px-4 py-3 text-foreground">
                {order.shippingAddress?.fullName ?? "—"}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {order.items
                  .map((item) => `${item.productName} × ${item.quantity}`)
                  .join(", ")}
              </td>
              <td className="px-4 py-3 font-medium text-foreground">
                {formatPrice(order.totalAmount)}
              </td>
              <td className="px-4 py-3">
                <OrderStatusSelect orderId={order.id} status={order.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
