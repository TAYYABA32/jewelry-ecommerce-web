import type { Metadata } from "next";

import { PlaceholderPage } from "@/components/shared/placeholder-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of Aurelia and its services.",
};

export default function TermsOfServicePage() {
  return (
    <PlaceholderPage
      eyebrow="Legal"
      title="Terms of Service"
      description="Our full Terms of Service are being finalized and will be published here shortly. For any questions in the meantime, please contact our concierge team."
    />
  );
}
