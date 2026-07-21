"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const SIZE = 160;

export function RepeatCustomerDonut({
  rate,
  repeatCustomers,
  totalCustomers,
}: {
  rate: number;
  repeatCustomers: number;
  totalCustomers: number;
}) {
  const data = [
    { name: "Repeat", value: rate },
    { name: "Remaining", value: 100 - rate },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <ResponsiveContainer width={SIZE} height={SIZE}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              innerRadius={56}
              outerRadius={72}
              stroke="none"
              isAnimationActive={false}
            >
              <Cell fill="var(--primary)" />
              <Cell fill="var(--border)" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-heading text-2xl font-semibold text-foreground">
            {rate}%
          </span>
          <span className="text-xs text-muted-foreground">Repeat</span>
        </div>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        {repeatCustomers} of {totalCustomers} customers ordered more than once
      </p>
    </div>
  );
}
