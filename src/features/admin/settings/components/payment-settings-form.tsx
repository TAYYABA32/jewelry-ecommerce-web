"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { updatePaymentSettings } from "@/actions/admin/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  type PaymentSettingsValues,
  paymentSettingsSchema,
} from "@/features/admin/settings/schema";

export function PaymentSettingsForm({
  settings,
}: {
  settings: PaymentSettingsValues;
}) {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentSettingsValues>({
    resolver: zodResolver(paymentSettingsSchema),
    defaultValues: settings,
  });

  const onSubmit = (values: PaymentSettingsValues) => {
    startTransition(async () => {
      const result = await updatePaymentSettings(values);
      if (result.success) {
        toast.success("Payment settings saved");
      } else {
        toast.error("Could not save payment settings. Please check the form.");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl space-y-6 rounded-2xl border border-border bg-card p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">
            Cash on Delivery (COD)
          </p>
          <p className="text-xs text-muted-foreground">
            Allow customers to pay when their order is delivered.
          </p>
        </div>
        <Controller
          control={control}
          name="codEnabled"
          render={({ field }) => (
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              aria-label="Toggle Cash on Delivery"
            />
          )}
        />
      </div>

      <div className="space-y-4 border-t border-border pt-5">
        <p className="text-sm font-medium text-foreground">
          Bank Transfer Details
        </p>

        <div className="space-y-1.5">
          <Label htmlFor="bankName">Bank Name</Label>
          <Input id="bankName" {...register("bankName")} />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="bankAccountTitle">Account Title</Label>
            <Input id="bankAccountTitle" {...register("bankAccountTitle")} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="bankIban">IBAN</Label>
            <Input
              id="bankIban"
              placeholder="PK00XXXX0000000000000000"
              {...register("bankIban")}
            />
          </div>
        </div>
      </div>

      {errors.codEnabled ? (
        <p className="text-sm text-destructive">{errors.codEnabled.message}</p>
      ) : null}

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
