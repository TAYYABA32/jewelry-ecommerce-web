import type { Metadata } from "next";
import { MapPin, Phone } from "lucide-react";

import {
  ATELIER_ADDRESS,
  CONCIERGE_HOURS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
} from "@/constants/site";
import { ConsultationForm } from "@/features/contact/components/consultation-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a private bridal consultation with the House of Aurelia's concierge team.",
};

export default function ContactPage() {
  return (
    <div>
      <section className="relative flex h-[40vh] min-h-[300px] items-center justify-center overflow-hidden bg-secondary">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,162,39,0.15),transparent_60%)]" />
        <div className="relative text-center">
          <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
            By Appointment
          </p>
          <h1 className="mt-4 font-heading text-4xl font-semibold text-white sm:text-5xl">
            Connect With Us
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-heading text-2xl font-semibold text-foreground">
              Exquisite Consultations
            </h2>
            <p className="mt-2 max-w-lg text-muted-foreground">
              Whether you&apos;re planning for your forever day or
              commissioning a custom heirloom, our concierge team is here to
              guide you. Share a few details and we&apos;ll be in touch to
              schedule a private appointment at our atelier.
            </p>

            <div className="mt-8">
              <ConsultationForm />
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <h3 className="font-heading text-lg font-semibold text-foreground">
                The Atelier
              </h3>
              <div className="mt-3 flex gap-3 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <p>
                  {ATELIER_ADDRESS.map((line, i) => (
                    <span key={line}>
                      {line}
                      {i < ATELIER_ADDRESS.length - 1 ? <br /> : null}
                    </span>
                  ))}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-heading text-lg font-semibold text-foreground">
                Concierge Service
              </h3>
              <div className="mt-3 flex gap-3 text-sm text-muted-foreground">
                <Phone className="mt-0.5 size-4 shrink-0 text-primary" />
                <div>
                  <p>{CONTACT_PHONE}</p>
                  <p className="mt-1">
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="hover:text-primary"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </p>
                  <p className="mt-2 text-xs tracking-wide uppercase">
                    {CONCIERGE_HOURS}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
