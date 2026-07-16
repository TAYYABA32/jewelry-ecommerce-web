"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MAIN_NAV } from "@/constants/nav";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </Button>
        }
      />
      <SheetContent side="left" className="w-72">
        <SheetHeader>
          <SheetTitle className="font-heading text-xl">Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4">
          {MAIN_NAV.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-2 py-2.5 text-sm font-medium text-foreground hover:bg-accent"
              >
                {item.label}
              </Link>
              {"children" in item && item.children ? (
                <div className="ml-3 flex flex-col border-l border-border pl-3">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className="rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>
        <Separator className="my-2" />
        <div className="flex flex-col gap-1 px-4">
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="rounded-md px-2 py-2.5 text-sm font-medium text-foreground hover:bg-accent"
          >
            Sign In
          </Link>
          <Link
            href="/wishlist"
            onClick={() => setOpen(false)}
            className="rounded-md px-2 py-2.5 text-sm font-medium text-foreground hover:bg-accent"
          >
            Wishlist
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
