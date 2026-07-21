import { Download, Mail, Users } from "lucide-react";
import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { SubscribersTable } from "@/features/admin/newsletter/components/subscribers-table";
import {
  getNewsletterStats,
  getNewsletterSubscribers,
} from "@/services/admin/newsletter-service";

export const metadata: Metadata = { title: "Newsletter" };

export default async function AdminNewsletterPage() {
  const [subscribers, stats] = await Promise.all([
    getNewsletterSubscribers(),
    getNewsletterStats(),
  ]);

  return (
    <div>
      <header className="flex items-start justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="font-heading text-2xl font-semibold text-foreground">
            Newsletter
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Subscribers captured from the site footer.
          </p>
        </div>
        <Button
          variant="outline"
          nativeButton={false}
          render={
            <a href="/admin/newsletter/export">
              <Download />
              Export CSV
            </a>
          }
        />
      </header>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6">
          <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Users className="size-5" />
          </div>
          <div>
            <p className="text-xs tracking-wide text-muted-foreground uppercase">
              Total Subscribers
            </p>
            <p className="mt-1 text-2xl font-semibold text-foreground">
              {stats.total}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6">
          <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Mail className="size-5" />
          </div>
          <div>
            <p className="text-xs tracking-wide text-muted-foreground uppercase">
              Active
            </p>
            <p className="mt-1 text-2xl font-semibold text-foreground">
              {stats.active}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <SubscribersTable subscribers={subscribers} />
      </div>
    </div>
  );
}
