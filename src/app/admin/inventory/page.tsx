import { Boxes } from "lucide-react";
import type { Metadata } from "next";

import { ComingSoon } from "@/features/admin/shared/coming-soon";

export const metadata: Metadata = { title: "Inventory" };

export default function AdminInventoryPage() {
  return <ComingSoon title="Inventory" icon={Boxes} />;
}
