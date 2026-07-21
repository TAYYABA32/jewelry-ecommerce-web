"use client";

import { Check, Pencil, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { updateProductStock } from "@/actions/admin/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function StockCell({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(quantity.toString());
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    const parsed = Number(value);
    startTransition(async () => {
      const result = await updateProductStock(productId, parsed);
      if (result.success) {
        toast.success("Stock updated");
        setIsEditing(false);
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  };

  if (!isEditing) {
    return (
      <button
        type="button"
        onClick={() => {
          setValue(quantity.toString());
          setIsEditing(true);
        }}
        className="flex items-center gap-2 text-foreground hover:text-primary"
      >
        {quantity}
        <Pencil className="size-3.5 text-muted-foreground" />
      </button>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      <Input
        type="number"
        min="0"
        step="1"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-8 w-20"
        autoFocus
      />
      <Button
        variant="ghost"
        size="icon-sm"
        disabled={isPending}
        onClick={handleSave}
        aria-label="Save stock quantity"
      >
        <Check className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        disabled={isPending}
        onClick={() => setIsEditing(false)}
        aria-label="Cancel"
      >
        <X className="size-4" />
      </Button>
    </div>
  );
}
