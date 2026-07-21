import { formatPrice } from "@/utils/format-price";

type Customer = {
  id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: Date | null;
};

export function CustomersTable({ customers }: { customers: Customer[] }) {
  if (customers.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border py-16 text-center text-muted-foreground">
        No customers yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border bg-muted/50 text-xs tracking-wide text-muted-foreground uppercase">
          <tr>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Total Orders</th>
            <th className="px-4 py-3">Total Spent</th>
            <th className="px-4 py-3">Last Order</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td className="px-4 py-3 font-medium text-foreground">
                {customer.name}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {customer.email}
              </td>
              <td className="px-4 py-3 text-foreground">
                {customer.totalOrders}
              </td>
              <td className="px-4 py-3 font-medium text-foreground">
                {formatPrice(customer.totalSpent)}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {customer.lastOrderDate
                  ? new Date(customer.lastOrderDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
