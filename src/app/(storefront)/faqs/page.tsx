import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers to common questions about orders, shipping, and jewelry care at Aurelia.",
};

const FAQS = [
  {
    question: "CAN THE STONES BE CHANGED?",
    answer: "Yes, Stones can be changed on request.",
  },
  {
    question: "IS THERE ANY SPECIAL TIP FOR MAINTAINING THE JEWELRY?",
    answer:
      "To prolong the life of your jewelry, our customers are recommended to keep it wrapped in a piece of soft cloth or tissue. Avoiding jewelry contact with water and perfume spray will also help prolong its life.",
  },
  {
    question: "WHEN I PLACE AN ITEM IN MY CART, IS THE ITEM RESERVED FOR ME?",
    answer:
      "To ensure the item is added to your order, you must complete the order and make payment (Overseas Customers).",
  },
  {
    question: "What are the delivery charges?",
    answer:
      "It's PKR 180/- nation wide for international charges you can contact us it varies as per country.",
  },
  {
    question: "What is your delivery time?",
    answer:
      "Delivery time is between 3 to 6 working days for domestic orders (from within Pakistan). It is 7-15 working days for international orders.",
  },
  {
    question: "What are the shipping charges?",
    answer:
      "150PKR for nationwide delivery in Pakistan. Free delivery for orders over 1999 PKR. For international orders, customer bears the shipping and handling costs. The shipping charges, for international customers, are calculated at checkout according to the customer's location. We do not offer free shipping for international orders.",
  },
  {
    question: "Do you offer cash refunds?",
    answer:
      "No, we do not. In case of size (Bangle/Ring) issues or damaged product, we offer exchange.",
  },
  {
    question: "What is your whatsapp contact number?",
    answer:
      "Call and whatsapp: +92 423 5470621, +92 423 5470623, +92 315 4137647 (Whatsapp)",
  },
  {
    question: "Is there Cash on Delivery for International orders?",
    answer:
      "No, we do not offer COD services for international orders. International customers need to pay in advance either via bank transfer or Master/Visa card online. We use a very secure internet banking options.",
  },
  {
    question: "What are the terms and conditions for International orders?",
    answer:
      "All international orders are subject to our standard terms of sale, including any customs duties, import taxes, or handling fees payable by the customer on arrival. Please contact our concierge team before placing an international order if you have questions specific to your country.",
  },
] as const;

export default function FaqsPage() {
  return (
    <div className="mx-auto max-w-3xl bg-background px-4 py-16 sm:px-6 lg:px-8">
      <header className="border-b border-border pb-6">
        <h1 className="font-heading text-3xl font-bold text-foreground">
          FAQs
        </h1>
      </header>

      <dl className="mt-10 space-y-8">
        {FAQS.map((faq) => (
          <div key={faq.question}>
            <dt className="font-heading text-base font-bold text-foreground">
              {faq.question}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {faq.answer}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
