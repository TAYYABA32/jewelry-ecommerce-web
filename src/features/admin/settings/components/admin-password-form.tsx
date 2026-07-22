"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateAdminPassword } from "@/actions/admin/settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  type AdminPasswordValues,
  adminPasswordSchema,
} from "@/features/admin/settings/schema";

export function AdminPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminPasswordValues>({
    resolver: zodResolver(adminPasswordSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const onSubmit = (values: AdminPasswordValues) => {
    if (
      typeof window !== "undefined" &&
      !window.confirm(
        "This will immediately change the password used to sign in to this admin account. Continue?",
      )
    ) {
      return;
    }

    startTransition(async () => {
      const result = await updateAdminPassword(values);
      if (result.success) {
        toast.success("Password updated");
        reset();
      } else {
        toast.error(
          result.error.newPassword?.[0] ??
            result.error.confirmPassword?.[0] ??
            "Could not update password.",
        );
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl space-y-5 rounded-2xl border border-border bg-card p-6"
    >
      <div>
        <p className="text-sm font-medium text-foreground">Admin Password</p>
        <p className="text-xs text-muted-foreground">
          Update the password for this admin account.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type="password"
            autoComplete="new-password"
            {...register("newPassword")}
          />
          {errors.newPassword ? (
            <p className="text-sm text-destructive">
              {errors.newPassword.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword ? (
            <p className="text-sm text-destructive">
              {errors.confirmPassword.message}
            </p>
          ) : null}
        </div>
      </div>

      <Button type="submit" variant="destructive" disabled={isPending}>
        {isPending ? "Updating..." : "Update Password"}
      </Button>
    </form>
  );
}
