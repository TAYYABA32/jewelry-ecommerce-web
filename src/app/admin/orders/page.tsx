import type { Metadata } from "next";

import { OrdersTable } from "@/features/admin/orders/components/orders-table";
import { getAdminOrders } from "@/services/admin/order-service";

export const metadata: Metadata = { title: "Orders" };

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders();

  return (
    <div>
      <header className="border-b border-border pb-6">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Orders
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {orders.length} {orders.length === 1 ? "order" : "orders"}
        </p>
      </header>

      <div className="mt-8">
        <OrdersTable
          orders={orders.map((order) => ({
            id: order.id,
            orderNumber: order.orderNumber,
            status: order.status,
            totalAmount: order.totalAmount.toString(),
            createdAt: order.createdAt,
            shippingAddress: order.shippingAddress
              ? { fullName: order.shippingAddress.fullName }
              : null,
            items: order.items.map((item) => ({
              id: item.id,
              productName: item.productName,
              quantity: item.quantity,
            })),
          }))}
        />
      </div>
    </div>
  );
}
