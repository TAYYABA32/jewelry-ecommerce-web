import type { Metadata } from "next";

import { LegalPage } from "@/components/shared/legal-page";
import { CONTACT_EMAIL, CONTACT_PHONE } from "@/constants/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of Aurelia and its services.",
};

export default function TermsOfServicePage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro="These terms govern how orders are placed, fulfilled, and delivered when you shop with Aurelia. By placing an order, you agree to the terms outlined below."
      sections={[
        {
          heading: "Orders & Order Tracking",
          body: "Every order placed with Aurelia is assigned a unique order number and tracked from confirmation through handcrafting to delivery. You can review the status of any order at any time from the My Orders page in your account.",
        },
        {
          heading: "Cash on Delivery",
          body: "For orders placed with Cash on Delivery, payment is due in full at the time of delivery. Please have the exact amount ready for our courier. Orders are prepared and shipped only once the order has been confirmed, and we reserve the right to verify orders by phone before dispatch.",
        },
        {
          heading: "Authenticity & Craftsmanship",
          body: "Every Aurelia piece is handcrafted using the materials and stones described at the time of purchase. Each item undergoes quality verification before it leaves our atelier, and we stand behind the authenticity and craftsmanship of every piece we send.",
        },
        {
          heading: "Pricing & Availability",
          body: "Prices are listed in the currency shown at checkout and are subject to change without prior notice. Availability is not guaranteed until an order has been confirmed, as fine jewelry pieces are limited and, in some cases, made to order.",
        },
        {
          heading: "Questions About These Terms",
          body: `For any questions about these terms, please contact our concierge team at ${CONTACT_EMAIL} or ${CONTACT_PHONE}.`,
        },
      ]}
    />
  );
}
