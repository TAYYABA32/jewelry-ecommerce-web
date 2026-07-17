import { SignIn } from "@clerk/nextjs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function LoginPage() {
  return <SignIn path="/login" routing="path" signUpUrl="/register" />;
}
