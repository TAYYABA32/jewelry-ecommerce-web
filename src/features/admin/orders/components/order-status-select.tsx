"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ADMIN_ORDER_STATUSES } from "@/constants/admin";
import { updateOrderStatus } from "@/actions/admin/orders";

export function OrderStatusSelect({
  orderId,
  status,
}: {
  orderId: string;
  status: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleChange = (nextStatus: string | null) => {
    if (!nextStatus) return;

    startTransition(async () => {
      const result = await updateOrderStatus(orderId, nextStatus);
      if (result.success) {
        toast.success("Order status updated");
        router.refresh();
      } else {
        toast.error("Could not update order status.");
      }
    });
  };

  return (
    <Select value={status} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Status">
          {(value: string) =>
            ADMIN_ORDER_STATUSES.find((s) => s.value === value)?.label ??
            value
          }
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {ADMIN_ORDER_STATUSES.map((s) => (
          <SelectItem key={s.value} value={s.value}>
            {s.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
