import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import {
  FacebookIcon,
  InstagramIcon,
} from "@/components/layout/social-icons";
import { FOOTER_NAV } from "@/constants/nav";
import { CONTACT_EMAIL, CONTACT_PHONE, SITE_DESCRIPTION } from "@/constants/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
          <div className="shrink-0 lg:max-w-xs">
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              {SITE_DESCRIPTION}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <Link
                href="https://instagram.com"
                aria-label="Instagram"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <InstagramIcon className="size-5" />
              </Link>
              <Link
                href="https://facebook.com"
                aria-label="Facebook"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <FacebookIcon className="size-5" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:flex lg:gap-16">
            {FOOTER_NAV.map((column) => (
              <div key={column.title}>
                <h3 className="font-heading text-sm font-semibold text-foreground">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} Aurelia. All rights reserved.
          </p>
          <p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-primary">
              {CONTACT_EMAIL}
            </a>{" "}
            &middot; {CONTACT_PHONE}
          </p>
        </div>
      </div>
    </footer>
  );
}
