import type { Metadata } from "next";

import { LegalPage } from "@/components/shared/legal-page";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/constants/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Aurelia collects, uses, and protects your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="Your trust is part of what we craft. This policy explains what information we collect, why we collect it, and the standards we hold ourselves to in protecting it."
      sections={[
        {
          heading: "Our Commitment to Your Privacy",
          body: "Aurelia collects only the information needed to serve you well — to process an order, respond to an inquiry, or provide the concierge experience our clients expect. We do not collect information beyond what is necessary, and we do not sell your personal information to anyone.",
        },
        {
          heading: "Information You Share With Us",
          body: "When you place an order, book a consultation, or contact our concierge team, you may voluntarily provide details such as your name, shipping address, phone number, and email address. This information is used solely to fulfill your order, coordinate delivery, and respond to your requests.",
        },
        {
          heading: "How We Protect Your Information From Third Parties",
          body: "We do not share, rent, or disclose your personal information to third parties for marketing purposes. Your details are shared only with the parties directly required to complete your order — such as our delivery couriers and payment processors — or where disclosure is required by law.",
        },
        {
          heading: "Data Security",
          body: "We maintain reasonable technical and organizational safeguards to protect your information from unauthorized access, alteration, or disclosure. Access to customer data within Aurelia is limited to those who need it to serve your order or inquiry.",
        },
        {
          heading: "Questions About This Policy",
          body: `If you have any questions about how your information is handled, please reach our concierge team at ${CONTACT_EMAIL} or ${CONTACT_PHONE}.`,
        },
      ]}
    />
  );
}
