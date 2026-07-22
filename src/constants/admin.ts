export const ADMIN_ORDER_STATUSES = [
  { value: "PENDING", label: "Pending" },
  { value: "CONFIRMED", label: "In Atelier" },
  { value: "PROCESSING", label: "Processing" },
  { value: "SHIPPED", label: "Shipped" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "CANCELLED", label: "Cancelled" },
  { value: "REFUNDED", label: "Refunded" },
] as const;

export const ADMIN_PRODUCT_OCCASIONS = [
  { value: "mehndi", label: "Mehndi" },
  { value: "barat", label: "Barat" },
  { value: "walima", label: "Walima" },
  { value: "engagement", label: "Engagement" },
  { value: "everyday", label: "Everyday" },
] as const;
