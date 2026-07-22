import type { Metadata } from "next";

import { Tabs, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";
import { AdminPasswordForm } from "@/features/admin/settings/components/admin-password-form";
import { NotificationSettingsForm } from "@/features/admin/settings/components/notification-settings-form";
import { PaymentSettingsForm } from "@/features/admin/settings/components/payment-settings-form";
import { ShippingSettingsForm } from "@/features/admin/settings/components/shipping-settings-form";
import { StoreDetailsForm } from "@/features/admin/settings/components/store-details-form";
import { getStoreSettings } from "@/services/admin/settings-service";

export const metadata: Metadata = { title: "Settings" };

export default async function AdminSettingsPage() {
  const settings = await getStoreSettings();

  return (
    <div>
      <header className="border-b border-border pb-6">
        <h1 className="font-heading text-2xl font-semibold text-foreground">
          Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage store details, shipping, payments, and admin account
          preferences.
        </p>
      </header>

      <div className="mt-8">
        <Tabs defaultValue="store">
          <TabsList>
            <TabsTab value="store">Store Details</TabsTab>
            <TabsTab value="shipping">Shipping & Orders</TabsTab>
            <TabsTab value="payment">Payment Methods</TabsTab>
            <TabsTab value="notifications">Notifications & Security</TabsTab>
          </TabsList>

          <TabsPanel value="store">
            <StoreDetailsForm
              settings={{
                storeName: settings.storeName,
                supportEmail: settings.supportEmail,
                supportWhatsapp: settings.supportWhatsapp ?? "",
                currency: settings.currency,
              }}
            />
          </TabsPanel>

          <TabsPanel value="shipping">
            <ShippingSettingsForm
              settings={{
                standardShippingRate: Number(
                  settings.standardShippingRate.toString(),
                ),
                freeShippingThreshold: Number(
                  settings.freeShippingThreshold.toString(),
                ),
                estimatedDeliveryDays: settings.estimatedDeliveryDays,
              }}
            />
          </TabsPanel>

          <TabsPanel value="payment">
            <PaymentSettingsForm
              settings={{
                codEnabled: settings.codEnabled,
                bankName: settings.bankName ?? "",
                bankAccountTitle: settings.bankAccountTitle ?? "",
                bankIban: settings.bankIban ?? "",
              }}
            />
          </TabsPanel>

          <TabsPanel value="notifications">
            <div className="space-y-6">
              <NotificationSettingsForm
                settings={{
                  orderEmailNotifications: settings.orderEmailNotifications,
                }}
              />
              <AdminPasswordForm />
            </div>
          </TabsPanel>
        </Tabs>
      </div>
    </div>
  );
}
