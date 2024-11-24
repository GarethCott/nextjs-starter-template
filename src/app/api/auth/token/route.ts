import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest) {
  const headersList = headers();

  return NextResponse.json({
    token: headersList.get('x-auth-token'),
    role: headersList.get('x-user-role'),
    userId: headersList.get('x-user-id'),
  });
}
