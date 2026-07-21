import { Mail } from "lucide-react";
import type { Metadata } from "next";

import { ComingSoon } from "@/features/admin/shared/coming-soon";

export const metadata: Metadata = { title: "Newsletter" };

export default function AdminNewsletterPage() {
  return <ComingSoon title="Newsletter" icon={Mail} />;
}
