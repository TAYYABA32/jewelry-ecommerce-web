"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { INQUIRY_TYPES } from "@/features/contact/schema";
import { InquiryViewSheet } from "@/features/admin/inquiries/components/inquiry-view-sheet";

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferredDate: Date | null;
  inquiryType: string;
  message: string;
  isResolved: boolean;
  createdAt: Date;
};

export function InquiriesTable({ inquiries }: { inquiries: Inquiry[] }) {
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const openInquiry = (inquiry: Inquiry) => {
    setSelected(inquiry);
    setSheetOpen(true);
  };

  if (inquiries.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border py-16 text-center text-muted-foreground">
        No consultation requests yet.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/50 text-xs tracking-wide text-muted-foreground uppercase">
            <tr>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Inquiry Type</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {inquiries.map((inquiry) => (
              <tr key={inquiry.id}>
                <td className="px-4 py-3 font-medium text-foreground">
                  {inquiry.name}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {inquiry.email}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {inquiry.phone}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {INQUIRY_TYPES.find((t) => t.value === inquiry.inquiryType)
                    ?.label ?? inquiry.inquiryType}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(inquiry.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-4 py-3 text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openInquiry(inquiry)}
                  >
                    View Message
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <InquiryViewSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        inquiry={selected}
      />
    </>
  );
}
