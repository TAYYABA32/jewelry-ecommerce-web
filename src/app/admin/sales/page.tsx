import type { Metadata } from "next";

import { SalesTable } from "@/features/admin/sales/components/sales-table";
import { getSalesTransactions } from "@/services/admin/sales-service";

export const metadata: Metadata = { title: "Sales" };

export default async function AdminSalesPage() {
  const transactions = await getSalesTransactions();

  return (
    <div>
      <header className="border-b border-border pb-6">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Sales
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {transactions.length}{" "}
          {transactions.length === 1 ? "transaction" : "transactions"}
        </p>
      </header>

      <div className="mt-8">
        <SalesTable
          transactions={transactions.map((transaction) => ({
            id: transaction.id,
            orderNumber: transaction.orderNumber,
            createdAt: transaction.createdAt,
            paymentStatus: transaction.paymentStatus,
            totalAmount: transaction.totalAmount.toString(),
            shippingAddress: transaction.shippingAddress,
          }))}
        />
      </div>
    </div>
  );
}
