import { Show, UserButton } from "@clerk/nextjs";
import { ChevronDown, Heart, Search } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CartButton } from "@/features/cart/components/cart-button";
import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MAIN_NAV } from "@/constants/nav";

// Wishlist count is still a visual-only placeholder until that
// feature (with real client-side state) is built in a later step.
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <MobileNav />
          <Logo />
        </div>

        <nav className="hidden items-center gap-8 lg:flex">
          {MAIN_NAV.map((item) =>
            "children" in item && item.children ? (
              <DropdownMenu key={item.href}>
                <DropdownMenuTrigger
                  render={
                    <button className="flex items-center gap-1 text-sm font-medium text-foreground/80 transition-colors hover:text-primary">
                      {item.label}
                      <ChevronDown className="size-3.5" />
                    </button>
                  }
                />
                <DropdownMenuContent align="start">
                  {item.children.map((child) => (
                    <DropdownMenuItem
                      key={child.href}
                      render={<Link href={child.href}>{child.label}</Link>}
                    />
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search"
            render={
              <Link href="/shop">
                <Search className="size-5" />
              </Link>
            }
          />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Wishlist"
            render={
              <Link href="/wishlist">
                <Heart className="size-5" />
              </Link>
            }
          />
          <CartButton />
          <ThemeToggle />
          <Show when="signed-in">
            <UserButton />
          </Show>
          <Show when="signed-out">
            <Link
              href="/login"
              className="text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              Sign In
            </Link>
          </Show>
        </div>
      </div>
    </header>
  );
}
