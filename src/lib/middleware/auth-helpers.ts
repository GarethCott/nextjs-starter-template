import { NextResponse } from 'next/server';

// Configuration
// !STARTERCONF Change this to true if you want to enable authentication
export const ENABLE_AUTH = false;
export const PUBLIC_PATHS = ['/server-error', '/sign-in', '/sign-up'] as const;

// Types
export interface AuthInfo {
  sub: string;
  email: string;
  customRole: string;
  familyName: string;
}

/**
 * Check if the requested path is in the public paths list
 */
export function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((path) => pathname.startsWith(path));
}

/**
 * Extract authentication information from the token payload
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractAuthInfo(payload: Record<string, any>): AuthInfo {
  const extractString = (key: string): string => {
    const value = payload[key];
    return value ? String(value) : '';
  };

  return {
    sub: payload.sub ?? '',
    email: extractString('email'),
    customRole: extractString('custom:role'),
    familyName: extractString('family_name'),
  };
}

/**
 * Set authentication headers for the response
 */
export function setAuthHeaders(
  response: NextResponse,
  authInfo: AuthInfo,
  idToken: string,
): void {
  response.headers.set('x-auth-token', idToken);
  response.headers.set('x-user-role', authInfo.customRole);
  response.headers.set('x-user-id', authInfo.sub);
}
