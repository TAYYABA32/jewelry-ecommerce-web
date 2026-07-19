"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { AddressCard } from "@/features/addresses/components/address-card";
import { AddressFormSheet } from "@/features/addresses/components/address-form-sheet";
import type { Address } from "@/generated/prisma";

export function AddressesView({ addresses }: { addresses: Address[] }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const router = useRouter();

  const openAddSheet = () => {
    setEditingAddress(null);
    setSheetOpen(true);
  };

  const openEditSheet = (address: Address) => {
    setEditingAddress(address);
    setSheetOpen(true);
  };

  const handleSuccess = () => {
    setSheetOpen(false);
    router.refresh();
  };

  if (addresses.length === 0) {
    return (
      <>
        <div className="flex min-h-[70vh] flex-col items-center justify-center bg-background px-4 text-center">
          <h1 className="font-heading text-4xl font-semibold text-foreground sm:text-5xl">
            Addresses
          </h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            Manage your shipping destinations for seamless white-glove
            delivery.
          </p>
          <Button
            className="mt-8 bg-[#D4AF37] text-[#111111] hover:bg-[#c9a227]"
            onClick={openAddSheet}
          >
            + Add Shipping Address
          </Button>
        </div>

        <AddressFormSheet
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          address={editingAddress}
          onSuccess={handleSuccess}
        />
      </>
    );
  }

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
              Your Account
            </p>
            <h1 className="mt-4 font-heading text-3xl font-semibold text-foreground sm:text-4xl">
              Addresses
            </h1>
          </div>
          <Button
            className="bg-[#D4AF37] text-[#111111] hover:bg-[#c9a227]"
            onClick={openAddSheet}
          >
            + Add New Address
          </Button>
        </header>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={() => openEditSheet(address)}
              onDeleted={() => router.refresh()}
            />
          ))}
        </div>
      </div>

      <AddressFormSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        address={editingAddress}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
