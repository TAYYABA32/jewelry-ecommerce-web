import { Badge } from "@/components/ui/badge";

const LOW_STOCK_THRESHOLD = 10;

export function StockStatusBadge({ quantity }: { quantity: number }) {
  if (quantity === 0) {
    return <Badge variant="destructive">Out of Stock</Badge>;
  }
  if (quantity <= LOW_STOCK_THRESHOLD) {
    return (
      <Badge className="bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400">
        Low Stock
      </Badge>
    );
  }
  return (
    <Badge className="bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
      In Stock
    </Badge>
  );
}
