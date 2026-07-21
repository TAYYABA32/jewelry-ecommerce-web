"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  type TooltipContentProps,
  XAxis,
  YAxis,
} from "recharts";

import { formatPrice } from "@/utils/format-price";

type Point = { date: string; revenue: number };

function formatTick(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function ChartTooltip({ active, payload }: TooltipContentProps) {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload as Point;

  return (
    <div className="rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs shadow-md">
      <p className="font-medium text-foreground">{formatPrice(point.revenue)}</p>
      <p className="text-muted-foreground">{formatTick(point.date)}</p>
    </div>
  );
}

export function SalesLineChart({ data }: { data: Point[] }) {
  const maxValue = Math.max(...data.map((d) => d.revenue), 1);

  return (
    <div>
      <ResponsiveContainer width="100%" height={224}>
        <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.25} />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tickFormatter={formatTick}
            tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
            axisLine={{ stroke: "var(--border)" }}
            tickLine={false}
            minTickGap={24}
          />
          <YAxis hide domain={[0, "dataMax"]} />
          <Tooltip content={ChartTooltip} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="var(--primary)"
            strokeWidth={2}
            fill="url(#revenueFill)"
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="mt-1 flex justify-end text-[11px] text-muted-foreground">
        <span>Peak: {formatPrice(maxValue)}</span>
      </div>
    </div>
  );
}
