import { Users } from "lucide-react";
import type { Metadata } from "next";

import { ComingSoon } from "@/features/admin/shared/coming-soon";

export const metadata: Metadata = { title: "Customers" };

export default function AdminCustomersPage() {
  return <ComingSoon title="Customers" icon={Users} />;
}
