import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/shared/placeholder-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Aurelia collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <PlaceholderPage
      eyebrow="Legal"
      title="Privacy Policy"
      description="Our full Privacy Policy is being finalized and will be published here shortly. For any questions about how we handle your data in the meantime, please contact our concierge team."
    />
  );
}
