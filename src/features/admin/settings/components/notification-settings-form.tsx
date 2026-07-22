"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { updateNotificationSettings } from "@/actions/admin/settings";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  type NotificationSettingsValues,
  notificationSettingsSchema,
} from "@/features/admin/settings/schema";

export function NotificationSettingsForm({
  settings,
}: {
  settings: NotificationSettingsValues;
}) {
  const [isPending, startTransition] = useTransition();
  const { control, handleSubmit } = useForm<NotificationSettingsValues>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: settings,
  });

  const onSubmit = (values: NotificationSettingsValues) => {
    startTransition(async () => {
      const result = await updateNotificationSettings(values);
      if (result.success) {
        toast.success("Notification settings saved");
      } else {
        toast.error("Could not save notification settings.");
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
            Email notifications for new orders
          </p>
          <p className="text-xs text-muted-foreground">
            Get an email at the support address whenever a new order comes in.
          </p>
        </div>
        <Controller
          control={control}
          name="orderEmailNotifications"
          render={({ field }) => (
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              aria-label="Toggle new order email notifications"
            />
          )}
        />
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
