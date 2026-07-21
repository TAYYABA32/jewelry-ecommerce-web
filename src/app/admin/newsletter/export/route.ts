import { requireAdmin } from "@/lib/admin-auth";
import { getNewsletterSubscribers } from "@/services/admin/newsletter-service";

function escapeCsvField(value: string) {
  if (/[",\n]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET() {
  await requireAdmin();

  const subscribers = await getNewsletterSubscribers();

  const rows = [
    ["Email", "Status", "Subscribed At"],
    ...subscribers.map((subscriber) => [
      subscriber.email,
      subscriber.isActive ? "Active" : "Unsubscribed",
      subscriber.subscribedAt.toISOString(),
    ]),
  ];

  const csv = rows.map((row) => row.map(escapeCsvField).join(",")).join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="newsletter-subscribers.csv"`,
    },
  });
}
