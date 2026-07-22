"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateShippingSettings } from "@/actions/admin/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  type ShippingSettingsValues,
  shippingSettingsSchema,
} from "@/features/admin/settings/schema";

export function ShippingSettingsForm({
  settings,
}: {
  settings: ShippingSettingsValues;
}) {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingSettingsValues>({
    resolver: zodResolver(shippingSettingsSchema),
    defaultValues: settings,
  });

  const onSubmit = (values: ShippingSettingsValues) => {
    startTransition(async () => {
      const result = await updateShippingSettings(values);
      if (result.success) {
        toast.success("Shipping settings saved");
      } else {
        toast.error("Could not save shipping settings. Please check the form.");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl space-y-5 rounded-2xl border border-border bg-card p-6"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="standardShippingRate">
            Standard Shipping Rate (PKR)
          </Label>
          <Input
            id="standardShippingRate"
            type="number"
            step="0.01"
            min="0"
            {...register("standardShippingRate", { valueAsNumber: true })}
          />
          {errors.standardShippingRate ? (
            <p className="text-sm text-destructive">
              {errors.standardShippingRate.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="freeShippingThreshold">
            Free Shipping Threshold (PKR)
          </Label>
          <Input
            id="freeShippingThreshold"
            type="number"
            step="0.01"
            min="0"
            {...register("freeShippingThreshold", { valueAsNumber: true })}
          />
          {errors.freeShippingThreshold ? (
            <p className="text-sm text-destructive">
              {errors.freeShippingThreshold.message}
            </p>
          ) : null}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="estimatedDeliveryDays">
          Estimated Delivery Days
        </Label>
        <Input
          id="estimatedDeliveryDays"
          placeholder="3-5 business days"
          {...register("estimatedDeliveryDays")}
        />
        {errors.estimatedDeliveryDays ? (
          <p className="text-sm text-destructive">
            {errors.estimatedDeliveryDays.message}
          </p>
        ) : null}
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
