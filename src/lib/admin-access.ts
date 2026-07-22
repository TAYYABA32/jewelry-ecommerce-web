// Multiple people can administer the store without sharing one Clerk login.
// A user is an admin if either is true:
//   1. Their email is in the ADMIN_EMAILS env var (comma-separated).
//   2. Their Clerk publicMetadata.role is "admin".
export function getAdminEmailWhitelist(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return getAdminEmailWhitelist().includes(email.toLowerCase());
}

export function isAdminMetadata(publicMetadata: unknown): boolean {
  if (!publicMetadata || typeof publicMetadata !== "object") return false;
  return (publicMetadata as Record<string, unknown>).role === "admin";
}

export function isAdminUser(input: {
  email: string | null | undefined;
  publicMetadata?: unknown;
}): boolean {
  return isAdminEmail(input.email) || isAdminMetadata(input.publicMetadata);
}
