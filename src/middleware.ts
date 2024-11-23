// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

import { fetchAuthSession } from 'aws-amplify/auth/server';
import { NextRequest, NextResponse } from 'next/server';

import { runWithAmplifyServerContext } from '@/utils/amplify-utils';

// !STARTERCONF Change this to false if you want to disable authentication
const ENABLE_AUTH = false;

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // If auth is disabled, allow all requests
  if (!ENABLE_AUTH) {
    return response;
  }

  const authenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec, {});
        return session.tokens !== undefined;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        return false;
      }
    },
  });

  // If not authenticated and trying to access protected routes, redirect to sign-in
  const isProtectedRoute = request.nextUrl.pathname.startsWith('/dashboard');
  if (!authenticated && isProtectedRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  // If authenticated and trying to access auth pages, redirect to dashboard
  const isAuthPage =
    request.nextUrl.pathname.startsWith('/sign-in') ||
    request.nextUrl.pathname.startsWith('/sign-up');
  if (authenticated && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return response;
}

// !STARTERCONF Configure the matcher to include routes that need authentication
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/dashboard/:path*',
    '/sign-in',
    '/sign-up',
  ],
};
