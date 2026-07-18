"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { createAddress, updateAddress } from "@/actions/address";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  type AddressFormValues,
  addressSchema,
} from "@/features/addresses/schema";
import type { Address } from "@/generated/prisma";

const EMPTY_VALUES: AddressFormValues = {
  fullName: "",
  phone: "",
  line1: "",
  city: "",
  state: "",
  postalCode: "",
  country: "",
};

export function AddressFormSheet({
  open,
  onOpenChange,
  address,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  address: Address | null;
  onSuccess: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: EMPTY_VALUES,
  });

  useEffect(() => {
    if (open) {
      reset(
        address
          ? {
              fullName: address.fullName,
              phone: address.phone,
              line1: address.line1,
              city: address.city,
              state: address.state,
              postalCode: address.postalCode,
              country: address.country,
            }
          : EMPTY_VALUES,
      );
    }
  }, [open, address, reset]);

  const onSubmit = (values: AddressFormValues) => {
    startTransition(async () => {
      const result = address
        ? await updateAddress(address.id, values)
        : await createAddress(values);

      if (result.success) {
        toast.success(address ? "Address updated" : "Address saved");
        onSuccess();
      } else {
        toast.error(
          result.error._root?.[0] ??
            "Something went wrong. Please check the form and try again.",
        );
      }
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-heading text-xl">
            {address ? "Edit Address" : "Add New Address"}
          </SheetTitle>
        </SheetHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 pb-4"
        >
          <div className="space-y-1.5">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" {...register("fullName")} />
            {errors.fullName ? (
              <p className="text-sm text-destructive">
                {errors.fullName.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" {...register("phone")} />
            {errors.phone ? (
              <p className="text-sm text-destructive">
                {errors.phone.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="line1">Street</Label>
            <Input
              id="line1"
              placeholder="House number, street, area"
              {...register("line1")}
            />
            {errors.line1 ? (
              <p className="text-sm text-destructive">
                {errors.line1.message}
              </p>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="city">City</Label>
              <Input id="city" {...register("city")} />
              {errors.city ? (
                <p className="text-sm text-destructive">
                  {errors.city.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="state">State / Province</Label>
              <Input id="state" {...register("state")} />
              {errors.state ? (
                <p className="text-sm text-destructive">
                  {errors.state.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input id="postalCode" {...register("postalCode")} />
              {errors.postalCode ? (
                <p className="text-sm text-destructive">
                  {errors.postalCode.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="country">Country</Label>
              <Input id="country" {...register("country")} />
              {errors.country ? (
                <p className="text-sm text-destructive">
                  {errors.country.message}
                </p>
              ) : null}
            </div>
          </div>

          <Button type="submit" size="lg" disabled={isPending} className="mt-2">
            {isPending ? "Saving..." : address ? "Save Changes" : "Save Address"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
