import type { Metadata } from "next";

import { CustomersTable } from "@/features/admin/customers/components/customers-table";
import { getCustomers } from "@/services/admin/customers-service";

export const metadata: Metadata = { title: "Customers" };

export default async function AdminCustomersPage() {
  const customers = await getCustomers();

  return (
    <div>
      <header className="border-b border-border pb-6">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Customers
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {customers.length} {customers.length === 1 ? "customer" : "customers"}
        </p>
      </header>

      <div className="mt-8">
        <CustomersTable customers={customers} />
      </div>
    </div>
  );
}
