import { Logo } from "@/components/layout/logo";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-muted px-4 py-16">
      <Logo />
      {children}
    </div>
  );
}
