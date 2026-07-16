import { clerkMiddleware } from "@clerk/nextjs/server";

// Auth checks are resource-based (per Clerk's current guidance), not
// path-based here. Each protected page/layout/route/server action calls
// `await auth.protect()` itself — see e.g. src/app/(account)/profile.
export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
