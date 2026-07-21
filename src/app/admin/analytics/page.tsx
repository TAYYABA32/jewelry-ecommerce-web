import { BarChart3 } from "lucide-react";
import type { Metadata } from "next";

import { ComingSoon } from "@/features/admin/shared/coming-soon";

export const metadata: Metadata = { title: "Analytics" };

export default function AdminAnalyticsPage() {
  return <ComingSoon title="Analytics" icon={BarChart3} />;
}
