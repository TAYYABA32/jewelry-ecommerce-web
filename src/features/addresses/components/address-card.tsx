"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { deleteAddress } from "@/actions/address";
import { Button } from "@/components/ui/button";
import type { Address } from "@/generated/prisma";

export function AddressCard({
  address,
  onEdit,
  onDeleted,
}: {
  address: Address;
  onEdit: () => void;
  onDeleted: () => void;
}) {
  const [isPending, startTransition] = useTransition();

  const handleRemove = () => {
    if (
      typeof window !== "undefined" &&
      !window.confirm(`Remove the address for ${address.fullName}?`)
    ) {
      return;
    }

    startTransition(async () => {
      const result = await deleteAddress(address.id);
      if (result.success) {
        toast.success("Address removed");
        onDeleted();
      } else {
        toast.error("Could not remove this address.");
      }
    });
  };

  return (
    <div className="rounded-2xl border border-[#D4AF37]/30 bg-white p-6">
      <p className="font-heading text-base font-semibold text-foreground">
        {address.fullName}
      </p>
      <div className="mt-2 space-y-0.5 text-sm text-muted-foreground">
        <p>{address.line1}</p>
        <p>
          {address.city}, {address.state} {address.postalCode}
        </p>
        <p>{address.country}</p>
        <p className="mt-1">{address.phone}</p>
      </div>
      <div className="mt-5 flex gap-3 border-t border-border pt-4">
        <Button variant="outline" size="sm" onClick={onEdit}>
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          disabled={isPending}
          onClick={handleRemove}
          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          Remove
        </Button>
      </div>
    </div>
  );
}
