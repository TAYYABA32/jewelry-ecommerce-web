import { PaymentStatusBadge } from "@/features/admin/sales/components/payment-status-badge";
import { formatPrice } from "@/utils/format-price";

type SalesTransaction = {
  id: string;
  orderNumber: string;
  createdAt: Date;
  paymentStatus: string;
  totalAmount: string | number;
  shippingAddress: { fullName: string } | null;
};

export function SalesTable({
  transactions,
}: {
  transactions: SalesTransaction[];
}) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border py-16 text-center text-muted-foreground">
        No sales yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border bg-muted/50 text-xs tracking-wide text-muted-foreground uppercase">
          <tr>
            <th className="px-4 py-3">Order ID</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Payment Status</th>
            <th className="px-4 py-3">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-4 py-3 font-medium text-foreground">
                #{transaction.orderNumber}
              </td>
              <td className="px-4 py-3 text-foreground">
                {transaction.shippingAddress?.fullName ?? "—"}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {new Date(transaction.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
              <td className="px-4 py-3">
                <PaymentStatusBadge status={transaction.paymentStatus} />
              </td>
              <td className="px-4 py-3 font-medium text-foreground">
                {formatPrice(transaction.totalAmount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
