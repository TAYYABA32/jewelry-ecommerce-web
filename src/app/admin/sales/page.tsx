import { TrendingUp } from "lucide-react";
import type { Metadata } from "next";

import { ComingSoon } from "@/features/admin/shared/coming-soon";

export const metadata: Metadata = { title: "Sales" };

export default function AdminSalesPage() {
  return <ComingSoon title="Sales" icon={TrendingUp} />;
}
