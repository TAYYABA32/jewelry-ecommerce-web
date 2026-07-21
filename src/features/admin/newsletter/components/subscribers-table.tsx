import { Badge } from "@/components/ui/badge";

type Subscriber = {
  id: string;
  email: string;
  isActive: boolean;
  subscribedAt: Date;
};

export function SubscribersTable({
  subscribers,
}: {
  subscribers: Subscriber[];
}) {
  if (subscribers.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border py-16 text-center text-muted-foreground">
        No subscribers yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border bg-muted/50 text-xs tracking-wide text-muted-foreground uppercase">
          <tr>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Subscribed</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {subscribers.map((subscriber) => (
            <tr key={subscriber.id}>
              <td className="px-4 py-3 font-medium text-foreground">
                {subscriber.email}
              </td>
              <td className="px-4 py-3">
                <Badge variant={subscriber.isActive ? "default" : "secondary"}>
                  {subscriber.isActive ? "Active" : "Unsubscribed"}
                </Badge>
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {new Date(subscriber.subscribedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
