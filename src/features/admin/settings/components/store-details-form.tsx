"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateStoreDetails } from "@/actions/admin/settings";
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
  CURRENCIES,
  type StoreDetailsValues,
  storeDetailsSchema,
} from "@/features/admin/settings/schema";

export function StoreDetailsForm({
  settings,
}: {
  settings: StoreDetailsValues;
}) {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<StoreDetailsValues>({
    resolver: zodResolver(storeDetailsSchema),
    defaultValues: settings,
  });

  const onSubmit = (values: StoreDetailsValues) => {
    startTransition(async () => {
      const result = await updateStoreDetails(values);
      if (result.success) {
        toast.success("Store details saved");
      } else {
        toast.error("Could not save store details. Please check the form.");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl space-y-5 rounded-2xl border border-border bg-card p-6"
    >
      <div className="space-y-1.5">
        <Label htmlFor="storeName">Store Name</Label>
        <Input id="storeName" {...register("storeName")} />
        {errors.storeName ? (
          <p className="text-sm text-destructive">
            {errors.storeName.message}
          </p>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="supportEmail">Support Email</Label>
          <Input
            id="supportEmail"
            type="email"
            {...register("supportEmail")}
          />
          {errors.supportEmail ? (
            <p className="text-sm text-destructive">
              {errors.supportEmail.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="supportWhatsapp">Contact WhatsApp Number</Label>
          <Input
            id="supportWhatsapp"
            placeholder="+92 3XX XXXXXXX"
            {...register("supportWhatsapp")}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="currency">Currency</Label>
        <Controller
          control={control}
          name="currency"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="currency" className="w-full sm:w-64">
                <SelectValue placeholder="Select a currency">
                  {(value: string) =>
                    CURRENCIES.find((c) => c.value === value)?.label ?? value
                  }
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
