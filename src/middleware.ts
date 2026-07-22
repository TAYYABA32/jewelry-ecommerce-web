import { clerkMiddleware } from "@clerk/nextjs/server";

// Auth checks are otherwise resource-based (per Clerk's current guidance),
// not path-based — each protected page/layout/route/server action calls
// `await auth.protect()` itself, see e.g. src/app/(account)/profile.
//
// /admin is the one exception: it gets an early, path-based redirect here
// too, so signed-out visitors bounce to /login before the admin layout (and
// its data fetching) ever runs. This only checks "is someone signed in" —
// the actual admin allowlist check (ADMIN_EMAILS / Clerk publicMetadata,
// see src/lib/admin-access.ts) still happens in the layout via
// requireAdmin(), since that needs the full user record (email, metadata),
// which isn't reliably available from the edge session claims here without
// a custom Clerk session token configured in the dashboard.
export default clerkMiddleware(async (auth, req) => {
  if (req.nextUrl.pathname.startsWith("/admin")) {
    await auth.protect({
      unauthenticatedUrl: new URL(
        "/login?redirect_url=/admin",
        req.url,
      ).toString(),
    });
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
