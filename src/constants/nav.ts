export const MAIN_NAV = [
  {
    label: "Shop",
    href: "/shop",
    children: [
      { label: "All Jewelry", href: "/shop" },
      { label: "Rings", href: "/shop?category=rings" },
      { label: "Necklaces", href: "/shop?category=necklaces" },
      { label: "Earrings", href: "/shop?category=earrings" },
      { label: "Bracelets", href: "/shop?category=bracelets" },
    ],
  },
  { label: "Categories", href: "/categories" },
  { label: "New Arrivals", href: "/shop?filter=new-arrivals" },
  { label: "Best Sellers", href: "/shop?filter=best-sellers" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const FOOTER_NAV = [
  {
    title: "Shop",
    links: [
      { label: "All Jewelry", href: "/shop" },
      { label: "Rings", href: "/shop?category=rings" },
      { label: "Necklaces", href: "/shop?category=necklaces" },
      { label: "Earrings", href: "/shop?category=earrings" },
      { label: "Bracelets", href: "/shop?category=bracelets" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faqs" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "My Orders", href: "/orders" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Addresses", href: "/addresses" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
] as const;
