import { Tag } from "lucide-react";
import type { Metadata } from "next";

import { ComingSoon } from "@/features/admin/shared/coming-soon";

export const metadata: Metadata = { title: "Offers" };

export default function AdminOffersPage() {
  return <ComingSoon title="Offers" icon={Tag} />;
}
