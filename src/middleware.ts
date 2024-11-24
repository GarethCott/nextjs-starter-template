import { AmplifyServer } from 'aws-amplify/adapter-core';
import { fetchAuthSession } from 'aws-amplify/auth/server';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import logger from '@/lib/logger';
import {
  type AuthInfo,
  ENABLE_AUTH,
  extractAuthInfo,
  isPublicPath,
  setAuthHeaders,
} from '@/lib/middleware/auth-helpers';

import { runWithAmplifyServerContext } from '@/utils/amplify-utils';

// Middleware
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // If auth is disabled, allow all requests
  if (!ENABLE_AUTH) {
    return NextResponse.next();
  }

  // Allow public paths without authentication
  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  try {
    // Get auth session
    const authSession = await runWithAmplifyServerContext({
      nextServerContext: { request, response: NextResponse.next(), cookies },
      operation: async (contextSpec: AmplifyServer.ContextSpec) => {
        return await fetchAuthSession(contextSpec);
      },
    });

    // Check for valid token
    if (!authSession?.tokens?.idToken) {
      logger.warn('No auth token found', { pathname });
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    // Extract and validate auth info
    const authInfo: AuthInfo = extractAuthInfo(
      authSession.tokens.idToken.payload,
    );
    const response = NextResponse.next();

    // Set auth headers
    setAuthHeaders(response, authInfo, authSession.tokens.idToken.toString());

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      logger.info('Auth headers set', {
        path: pathname,
        userId: authInfo.sub,
        role: authInfo.customRole,
      });
    }

    return response;
  } catch (error) {
    logger.error('Middleware error', error);
    return NextResponse.redirect(new URL('/server-error', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
