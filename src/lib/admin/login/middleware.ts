import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAuthentication } from './auth';

export function middleware(req: NextRequest) {
  const currentUser = verifyAuthentication();
  const adminPageUrl = `/admin/${process.env.ADMIN_LOGIN_SLUG}`;

  if (!currentUser && req.nextUrl.pathname.startsWith(adminPageUrl)) {
    return NextResponse.redirect(new URL(`${adminPageUrl}/login`, req.url));
  }
}