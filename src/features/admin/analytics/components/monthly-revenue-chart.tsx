"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  type TooltipContentProps,
  XAxis,
  YAxis,
} from "recharts";

import { formatPrice } from "@/utils/format-price";

type MonthlyRevenue = { month: string; revenue: number };

function ChartTooltip({ active, payload }: TooltipContentProps) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload as MonthlyRevenue;

  return (
    <div className="rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs shadow-md">
      <p className="font-medium text-foreground">{formatPrice(point.revenue)}</p>
      <p className="text-muted-foreground">{point.month}</p>
    </div>
  );
}

export function MonthlyRevenueChart({ data }: { data: MonthlyRevenue[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
        <XAxis
          dataKey="month"
          tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
          axisLine={{ stroke: "var(--border)" }}
          tickLine={false}
        />
        <YAxis hide domain={[0, "dataMax"]} />
        <Tooltip content={ChartTooltip} cursor={{ fill: "var(--muted)" }} />
        <Bar
          dataKey="revenue"
          fill="var(--primary)"
          radius={[6, 6, 0, 0]}
          isAnimationActive={false}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
