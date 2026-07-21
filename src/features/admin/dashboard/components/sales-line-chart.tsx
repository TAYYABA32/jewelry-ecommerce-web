"use client";

import { useId, useMemo, useState } from "react";

import { formatPrice } from "@/utils/format-price";

type Point = { date: string; revenue: number };

const WIDTH = 640;
const HEIGHT = 220;
const PADDING = 24;

export function SalesLineChart({ data }: { data: Point[] }) {
  const gradientId = useId();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const { path, areaPath, points, maxValue } = useMemo(() => {
    const max = Math.max(...data.map((d) => d.revenue), 1);
    const stepX =
      data.length > 1 ? (WIDTH - PADDING * 2) / (data.length - 1) : 0;

    const pts = data.map((d, i) => {
      const x = PADDING + i * stepX;
      const y =
        HEIGHT - PADDING - (d.revenue / max) * (HEIGHT - PADDING * 2);
      return { x, y, ...d };
    });

    const linePath = pts
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
      .join(" ");

    const area =
      pts.length > 0
        ? `${linePath} L ${pts[pts.length - 1].x} ${HEIGHT - PADDING} L ${pts[0].x} ${HEIGHT - PADDING} Z`
        : "";

    return { path: linePath, areaPath: area, points: pts, maxValue: max };
  }, [data]);

  const hovered = hoverIndex !== null ? points[hoverIndex] : null;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="h-56 w-full"
        preserveAspectRatio="none"
        onMouseLeave={() => setHoverIndex(null)}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {areaPath ? <path d={areaPath} fill={`url(#${gradientId})`} /> : null}
        <path
          d={path}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {points.map((p, i) => (
          <rect
            key={p.date}
            x={p.x - (WIDTH / points.length) / 2}
            y={0}
            width={WIDTH / points.length}
            height={HEIGHT}
            fill="transparent"
            onMouseEnter={() => setHoverIndex(i)}
          />
        ))}

        {hovered ? (
          <>
            <line
              x1={hovered.x}
              x2={hovered.x}
              y1={PADDING}
              y2={HEIGHT - PADDING}
              stroke="var(--border)"
              strokeDasharray="4 4"
            />
            <circle
              cx={hovered.x}
              cy={hovered.y}
              r={4}
              fill="var(--primary)"
            />
          </>
        ) : null}
      </svg>

      {hovered ? (
        <div className="pointer-events-none absolute top-0 rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs shadow-md">
          <p className="font-medium text-foreground">
            {formatPrice(hovered.revenue)}
          </p>
          <p className="text-muted-foreground">
            {new Date(hovered.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      ) : null}

      <div className="mt-2 flex justify-between text-[11px] text-muted-foreground">
        <span>
          {new Date(data[0]?.date ?? Date.now()).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </span>
        <span>
          Peak: {formatPrice(maxValue)}
        </span>
        <span>
          {new Date(
            data[data.length - 1]?.date ?? Date.now(),
          ).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </span>
      </div>
    </div>
  );
}
