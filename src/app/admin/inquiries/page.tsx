import type { Metadata } from "next";

import { InquiriesTable } from "@/features/admin/inquiries/components/inquiries-table";
import { getAdminInquiries } from "@/services/admin/inquiry-service";

export const metadata: Metadata = { title: "Inquiries" };

export default async function AdminInquiriesPage() {
  const inquiries = await getAdminInquiries();

  return (
    <div>
      <header className="border-b border-border pb-6">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Inquiries
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {inquiries.length}{" "}
          {inquiries.length === 1 ? "consultation request" : "consultation requests"}
        </p>
      </header>

      <div className="mt-8">
        <InquiriesTable inquiries={inquiries} />
      </div>
    </div>
  );
}
