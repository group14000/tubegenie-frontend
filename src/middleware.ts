import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/$"]);

export default clerkMiddleware(async (auth, req) => {
  // If the request is for the root landing page, allow access without signing in
  const { pathname } = req.nextUrl || { pathname: undefined };
  if (pathname === "/") return;

  // Otherwise, use the public route matcher (e.g. sign-in pages). Protect all other routes.
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
