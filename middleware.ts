import { clerkMiddleware } from '@clerk/nextjs/server';

// Define public routes
export default clerkMiddleware({
  publicRoutes: [
    '/',
    '/api/templates',
    '/api/upload',
    '/sign-in(.*)',
    '/sign-up(.*)',
  ],
});

export const config = {
  matcher: [
    // Match all routes except static files and Next.js internals
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|png|svg|css|js|woff2?|ttf|eot|ico|pdf|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
