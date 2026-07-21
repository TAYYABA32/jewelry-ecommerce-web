import type { Metadata } from "next";

import { CategoryBreakdownChart } from "@/features/admin/analytics/components/category-breakdown-chart";
import { MonthlyRevenueChart } from "@/features/admin/analytics/components/monthly-revenue-chart";
import { RepeatCustomerDonut } from "@/features/admin/analytics/components/repeat-customer-donut";
import {
  getCategoryBreakdown,
  getMonthlyRevenue,
  getRepeatCustomerRate,
} from "@/services/admin/analytics-service";

export const metadata: Metadata = { title: "Analytics" };

export default async function AdminAnalyticsPage() {
  const [monthlyRevenue, categoryBreakdown, repeatCustomerRate] =
    await Promise.all([
      getMonthlyRevenue(6),
      getCategoryBreakdown(),
      getRepeatCustomerRate(),
    ]);

  return (
    <div>
      <header className="border-b border-border pb-6">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Analytics
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Deeper insight into revenue and customer behavior.
        </p>
      </header>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-heading text-lg font-semibold text-foreground">
          Monthly Revenue
        </h2>
        <p className="text-xs text-muted-foreground">Last 6 months</p>
        <div className="mt-4">
          <MonthlyRevenueChart data={monthlyRevenue} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Sales by Category
          </h2>
          <p className="text-xs text-muted-foreground">
            Revenue contribution per category
          </p>
          <div className="mt-4">
            <CategoryBreakdownChart data={categoryBreakdown} />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Repeat Customer Rate
          </h2>
          <p className="text-xs text-muted-foreground">
            Customers with 2+ orders
          </p>
          <div className="mt-6">
            <RepeatCustomerDonut
              rate={repeatCustomerRate.rate}
              repeatCustomers={repeatCustomerRate.repeatCustomers}
              totalCustomers={repeatCustomerRate.totalCustomers}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
