import { Settings } from "lucide-react";
import type { Metadata } from "next";

import { ComingSoon } from "@/features/admin/shared/coming-soon";

export const metadata: Metadata = { title: "Settings" };

export default function AdminSettingsPage() {
  return <ComingSoon title="Settings" icon={Settings} />;
}
