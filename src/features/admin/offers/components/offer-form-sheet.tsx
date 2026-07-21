"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { createCoupon } from "@/actions/admin/offers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  type CouponFormValues,
  couponFormSchema,
} from "@/features/admin/offers/schema";

const COUPON_TYPES = [
  { value: "PERCENTAGE", label: "Percentage off" },
  { value: "FIXED", label: "Fixed amount off" },
] as const;

export function OfferFormSheet() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CouponFormValues>({
    resolver: zodResolver(couponFormSchema),
    defaultValues: {
      code: "",
      type: "PERCENTAGE",
      value: 10,
      startsAt: new Date().toISOString().slice(0, 10),
      expiresAt: "",
    },
  });

  const onSubmit = (values: CouponFormValues) => {
    startTransition(async () => {
      const result = await createCoupon(values);
      if (result.success) {
        toast.success("Offer created");
        reset();
        setOpen(false);
      } else {
        toast.error(
          result.error._root?.[0] ??
            result.error.code?.[0] ??
            "Something went wrong. Please check the form and try again.",
        );
      }
    });
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button>New Offer</Button>} />
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-heading text-xl">New Offer</SheetTitle>
        </SheetHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 pb-4"
        >
          <div className="space-y-1.5">
            <Label htmlFor="code">Discount Code</Label>
            <Input
              id="code"
              placeholder="AURELIA10"
              className="uppercase"
              {...register("code")}
            />
            {errors.code ? (
              <p className="text-sm text-destructive">{errors.code.message}</p>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="type">Type</Label>
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="type" className="w-full">
                      <SelectValue placeholder="Type">
                        {(value: string) =>
                          COUPON_TYPES.find((t) => t.value === value)?.label ??
                          value
                        }
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {COUPON_TYPES.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                type="number"
                step="0.01"
                min="0"
                {...register("value", { valueAsNumber: true })}
              />
              {errors.value ? (
                <p className="text-sm text-destructive">
                  {errors.value.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="minPurchase">Min. Purchase (optional)</Label>
              <Input
                id="minPurchase"
                type="number"
                step="0.01"
                min="0"
                {...register("minPurchase", {
                  setValueAs: (v) => (v === "" ? undefined : Number(v)),
                })}
              />
              {errors.minPurchase ? (
                <p className="text-sm text-destructive">
                  {errors.minPurchase.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="usageLimit">Usage Limit (optional)</Label>
              <Input
                id="usageLimit"
                type="number"
                step="1"
                min="1"
                {...register("usageLimit", {
                  setValueAs: (v) => (v === "" ? undefined : Number(v)),
                })}
              />
              {errors.usageLimit ? (
                <p className="text-sm text-destructive">
                  {errors.usageLimit.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="startsAt">Starts</Label>
              <Input id="startsAt" type="date" {...register("startsAt")} />
              {errors.startsAt ? (
                <p className="text-sm text-destructive">
                  {errors.startsAt.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="expiresAt">Expires</Label>
              <Input id="expiresAt" type="date" {...register("expiresAt")} />
              {errors.expiresAt ? (
                <p className="text-sm text-destructive">
                  {errors.expiresAt.message}
                </p>
              ) : null}
            </div>
          </div>

          <Button type="submit" size="lg" disabled={isPending}>
            {isPending ? "Creating..." : "Create Offer"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
