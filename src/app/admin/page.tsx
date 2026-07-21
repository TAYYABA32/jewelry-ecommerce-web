import { Clock, DollarSign, ShoppingCart, Users } from "lucide-react";
import type { Metadata } from "next";

import { FulfillmentDonut } from "@/features/admin/dashboard/components/fulfillment-donut";
import { SalesLineChart } from "@/features/admin/dashboard/components/sales-line-chart";
import { StatCard } from "@/features/admin/dashboard/components/stat-card";
import { TopSellingProducts } from "@/features/admin/dashboard/components/top-selling-products";
import {
  getDashboardStats,
  getFulfillmentRate,
  getRevenueSeries,
  getTopSellingProducts,
} from "@/services/admin/dashboard-service";
import { formatPrice } from "@/utils/format-price";

export const metadata: Metadata = { title: "Dashboard" };

export default async function AdminDashboardPage() {
  const [stats, revenueSeries, fulfillment, topProducts] = await Promise.all([
    getDashboardStats(),
    getRevenueSeries(14),
    getFulfillmentRate(),
    getTopSellingProducts(8),
  ]);

  return (
    <div>
      <header className="border-b border-border pb-6">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          An overview of store performance.
        </p>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Revenue"
          value={formatPrice(stats.revenue.value)}
          changePercent={stats.revenue.changePercent}
          icon={DollarSign}
        />
        <StatCard
          label="Total Orders"
          value={stats.orders.value.toString()}
          changePercent={stats.orders.changePercent}
          icon={ShoppingCart}
        />
        <StatCard
          label="Total Customers"
          value={stats.customers.value.toString()}
          changePercent={stats.customers.changePercent}
          icon={Users}
        />
        <StatCard
          label="Pending Delivery"
          value={stats.pendingDelivery.value.toString()}
          icon={Clock}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading text-lg font-semibold text-foreground">
                Sales Analytic
              </h2>
              <p className="text-xs text-muted-foreground">
                Revenue, last 14 days
              </p>
            </div>
          </div>
          <div className="mt-4">
            <SalesLineChart data={revenueSeries} />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-heading text-lg font-semibold text-foreground">
            Fulfillment Rate
          </h2>
          <p className="text-xs text-muted-foreground">
            Delivered vs. all active orders
          </p>
          <div className="mt-6">
            <FulfillmentDonut
              rate={fulfillment.rate}
              delivered={fulfillment.delivered}
              total={fulfillment.total}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-heading text-lg font-semibold text-foreground">
          Top Selling Products
        </h2>
        <p className="text-xs text-muted-foreground">
          Ranked by total units sold
        </p>
        <div className="mt-4">
          <TopSellingProducts products={topProducts} />
        </div>
      </div>
    </div>
  );
}
