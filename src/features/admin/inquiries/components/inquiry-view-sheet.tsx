"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { INQUIRY_TYPES } from "@/features/contact/schema";

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

function formatDate(date: Date | null) {
  if (!date) return "Not specified";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function InquiryViewSheet({
  open,
  onOpenChange,
  inquiry,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  inquiry: Inquiry | null;
}) {
  const inquiryTypeLabel =
    INQUIRY_TYPES.find((type) => type.value === inquiry?.inquiryType)
      ?.label ?? inquiry?.inquiryType;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-heading text-xl">
            {inquiry?.name}
          </SheetTitle>
        </SheetHeader>

        {inquiry ? (
          <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 pb-4 text-sm">
            <div>
              <p className="text-xs tracking-wide text-muted-foreground uppercase">
                Email
              </p>
              <p className="mt-1 text-foreground">{inquiry.email}</p>
            </div>

            <div>
              <p className="text-xs tracking-wide text-muted-foreground uppercase">
                Phone
              </p>
              <p className="mt-1 text-foreground">{inquiry.phone}</p>
            </div>

            <div>
              <p className="text-xs tracking-wide text-muted-foreground uppercase">
                Inquiry Type
              </p>
              <p className="mt-1 text-foreground">{inquiryTypeLabel}</p>
            </div>

            <div>
              <p className="text-xs tracking-wide text-muted-foreground uppercase">
                Preferred Date
              </p>
              <p className="mt-1 text-foreground">
                {formatDate(inquiry.preferredDate)}
              </p>
            </div>

            <div>
              <p className="text-xs tracking-wide text-muted-foreground uppercase">
                Submitted
              </p>
              <p className="mt-1 text-foreground">
                {formatDate(inquiry.createdAt)}
              </p>
            </div>

            <div>
              <p className="text-xs tracking-wide text-muted-foreground uppercase">
                Message
              </p>
              <p className="mt-1 leading-relaxed text-foreground">
                {inquiry.message}
              </p>
            </div>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}
