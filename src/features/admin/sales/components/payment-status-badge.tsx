import { Badge } from "@/components/ui/badge";

const STYLES: Record<string, string> = {
  PAID: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
  PENDING: "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400",
  FAILED: "bg-destructive/10 text-destructive",
  REFUNDED: "bg-muted text-muted-foreground",
  PARTIALLY_REFUNDED: "bg-muted text-muted-foreground",
};

const LABELS: Record<string, string> = {
  PAID: "Paid",
  PENDING: "Pending",
  FAILED: "Failed",
  REFUNDED: "Refunded",
  PARTIALLY_REFUNDED: "Partially Refunded",
};

export function PaymentStatusBadge({ status }: { status: string }) {
  return (
    <Badge className={STYLES[status] ?? "bg-muted text-muted-foreground"}>
      {LABELS[status] ?? status}
    </Badge>
  );
}
